import { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Disable strict TLS checking for dev environment as requested
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const { name, email, phone, country, message } = req.body;
  const firstName = name ? name.split(' ')[0] : '';
  const lastName = name && name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : '';

  const CRM_URL = process.env.CRM_URL || 'https://inwo.crmcore.me/api/lead_management/api/affiliates';
  const CRM_TOKEN = process.env.CRM_TOKEN || '';
  const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

  console.log(`[SIGNUP] Incoming request for ${email}`);

  const payload = {
    country_name: country || 'ch',
    description: message || '',
    phone: phone, // Already formatted to 00...
    email: email,
    first_name: firstName,
    last_name: lastName,
    custom_fields: {
      Source_ID: 'Website',
      Outline_Your_Case: message || ''
    }
  };

  console.log('[SIGNUP] CRM Payload:', JSON.stringify(payload));

  try {
    const crmResponse = await fetch(CRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': CRM_TOKEN,
        'Authorization': `Bearer ${CRM_TOKEN}`,
        'X-Affiliate-Token': CRM_TOKEN,
        'x-token': CRM_TOKEN
      },
      body: JSON.stringify(payload)
    });

    const crmData = await crmResponse.json();
    console.log('[SIGNUP] CRM Response status:', crmResponse.status);
    console.log('[SIGNUP] CRM Response body:', JSON.stringify(crmData));

    // Proper Duplicate Detection (don't treat "duplicate: false" as error)
    const isSuccess = crmResponse.ok || crmData.success === true;
    const isAlreadyExists = (crmData.message && crmData.message.toLowerCase().includes('already exists')) || crmData.duplicate === true;
    const isInvalid = crmResponse.status === 400 || (crmData.message && crmData.message.toLowerCase().includes('invalid'));

    if (isInvalid && !isAlreadyExists) {
      return res.status(400).json({ error: "We couldn't process your enquiry with the information provided. Please review your details and try again." });
    }

    if (!isSuccess && !isAlreadyExists) {
      console.error('[SIGNUP ERROR] CRM rejected lead without already exists');
      return res.status(500).json({ error: "Unexpected failure processing your request. Please try again later." });
    }

    // Now proceed to Blob Storage to register / login
    if (BLOB_TOKEN) {
      const cleanEmail = String(email).trim().replace(/[<>"'&]/g, "");
      
      // Store user
      const userData = { email: cleanEmail, name, phone, country, createdAt: new Date().toISOString() };
      await put(`users/${cleanEmail}.json`, JSON.stringify(userData), {
        access: 'private',
        token: BLOB_TOKEN,
        contentType: 'application/json',
      });

      // Generate Session
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const sessionData = { email: cleanEmail, createdAt: new Date().toISOString() };
      
      await put(`sessions/${sessionToken}.json`, JSON.stringify(sessionData), {
        access: 'private',
        token: BLOB_TOKEN,
        contentType: 'application/json',
      });

      // Increment Lead Dashboard
      try {
        const dashboardPayload = { website: "VertexIQ", type: "signup", name, email };
        console.log('[SIGNUP] Dashboard Payload:', dashboardPayload);
        const dashResp = await fetch('https://lead-dashboard-orcin.vercel.app/api/increment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dashboardPayload)
        });
        console.log('[SIGNUP] Dashboard Response status:', dashResp.status);
      } catch (dashErr) {
        console.error('[SIGNUP ERROR] Dashboard tracking failed', dashErr);
      }

      return res.status(200).json({
        success: true,
        token: sessionToken,
        email: cleanEmail,
        isDuplicate: isAlreadyExists,
        message: isAlreadyExists ? "It looks like you've already contacted us. We've recognized your details and will continue with your request." : "Signup successful."
      });
    }

    return res.status(200).json({ success: true, message: 'Success' });
    
  } catch (error: any) {
    console.error('[SIGNUP FATAL ERROR]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
