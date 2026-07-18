import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, list } from "@vercel/blob";
import { randomUUID } from "crypto";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function sanitize(str: string): string {
  return String(str).trim().replace(/[<>"'&]/g, "");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!BLOB_TOKEN) {
    // In development without blob token, return a dev session
    const { email } = req.body ?? {};
    if (!email) return res.status(400).json({ error: "Email is required" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    const devToken = `dev_${randomUUID()}`;
    return res.status(200).json({ success: true, token: devToken, email: sanitize(email) });
  }

  const { email } = req.body ?? {};

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const cleanEmail = sanitize(String(email));
  const sessionToken = randomUUID();
  const sessionData = {
    email: cleanEmail,
    token: sessionToken,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
  };

  try {
    // Check if user exists in Blob Storage
    try {
      await list({ prefix: `users/${cleanEmail}.json`, token: BLOB_TOKEN });
      // To strictly verify existence, we should fetch head, but `list` is also an option if it returns the file.
      // A better way is using `head` directly since @vercel/blob provides it, but let's use list and check if length > 0
      const userFiles = await list({ prefix: `users/${cleanEmail}.json`, token: BLOB_TOKEN });
      if (userFiles.blobs.length === 0) {
        return res.status(404).json({ error: "Account not found. Please sign up." });
      }
    } catch (err: any) {
      return res.status(404).json({ error: "Account not found. Please sign up." });
    }

    // Store session in Vercel Blob
    await put(
      `sessions/${sessionToken}.json`,
      JSON.stringify(sessionData),
      {
        access: "private",
        token: BLOB_TOKEN,
        contentType: "application/json",
      }
    );

    console.log(`[LOGIN SUCCESS] Session created for ${cleanEmail}`);

    return res.status(200).json({
      success: true,
      token: sessionToken,
      email: cleanEmail,
      message: 'Login successful'
    });
  } catch (err) {
    console.error("[LOGIN ERROR] Blob auth error:", err);
    return res.status(500).json({ error: "Authentication failed. Please try again." });
  }
}
