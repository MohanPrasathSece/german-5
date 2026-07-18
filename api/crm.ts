import type { VercelRequest, VercelResponse } from "@vercel/node";

// Validate environment variables are present
const CRM_TOKEN = process.env.CRM_TOKEN;
const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";

function sanitize(str: string): string {
  return String(str).trim().replace(/[<>"'&]/g, "");
}

function splitName(fullName: string): { first_name: string; last_name: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first_name: parts[0], last_name: "" };
  const last = parts.pop()!;
  return { first_name: parts.join(" "), last_name: last };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // SSL Bypass
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  if (!CRM_TOKEN) {
    console.error("CRM_TOKEN environment variable is not set");
    return res.status(500).json({ error: "CRM configuration error" });
  }

  const { name, email, phone, message } = req.body ?? {};
  
  console.log(`[CONTACT] Incoming request - Name: ${name}, Email: ${email}, Phone: ${phone}, Message: ${message}`);

  // Validate required fields
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email, and phone are required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Phone validation (allow digits, spaces, +, -, parentheses)
  const phoneRegex = /^[+\d\s\-().]{6,20}$/;
  if (!phoneRegex.test(String(phone))) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  const { first_name, last_name } = splitName(sanitize(name));
  const cleanPhone = sanitize(String(phone));
  const cleanMessage = message ? sanitize(String(message)) : "";

  const payload = {
    country_name: "cy",
    description: cleanMessage,
    phone: cleanPhone,
    email: sanitize(String(email)),
    first_name,
    last_name,
    custom_fields: {
      Source_ID: "Website",
      Outline_Your_Case: cleanMessage,
    },
  };

  console.log('[CONTACT] CRM Payload:', JSON.stringify(payload));

  try {
    const crmResponse = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Token": CRM_TOKEN,
        "Authorization": `Bearer ${CRM_TOKEN}`,
        "X-Affiliate-Token": CRM_TOKEN,
        "x-token": CRM_TOKEN
      },
      body: JSON.stringify(payload),
    });

    const bodyStr = await crmResponse.text();
    console.log('[CONTACT] CRM Response status:', crmResponse.status);
    console.log('[CONTACT] CRM raw body:', bodyStr);

    const isDuplicateError = bodyStr.includes('already') || bodyStr.includes('exist') || (bodyStr.includes('duplicate') && !bodyStr.includes('"duplicate":false'));

    if (!crmResponse.ok && !isDuplicateError) {
      console.error("[CONTACT ERROR] CRM error:", crmResponse.status, bodyStr);
      return res.status(502).json({ error: "Failed to submit to CRM. Please try again." });
    }

    // Increment Lead Dashboard
    try {
      const dashboardPayload = { website: "Aegis Crypto", type: "contact", name, email };
      console.log('[CONTACT] Lead Dashboard payload:', dashboardPayload);
      const dashResp = await fetch("https://lead-dashboard-orcin.vercel.app/api/increment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dashboardPayload)
      });
      console.log('[CONTACT] Lead Dashboard response status:', dashResp.status);
    } catch (dashErr) {
      console.error("[CONTACT ERROR] Dashboard tracking failed", dashErr);
    }

    return res.status(200).json({ success: true, isDuplicate: isDuplicateError });
  } catch (err) {
    console.error("[CONTACT FATAL ERROR] CRM submission error:", err);
    return res.status(500).json({ error: "Internal server error. Please try again." });
  }
}
