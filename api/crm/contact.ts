import { VercelRequest, VercelResponse } from '@vercel/node';

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

  console.log(`[CONTACT] Incoming request for ${email}`);

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

  console.log('[CONTACT] CRM Payload:', JSON.stringify(payload));

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
    console.log('[CONTACT] CRM Response status:', crmResponse.status);
    console.log('[CONTACT] CRM Response body:', JSON.stringify(crmData));

    // Proper Duplicate Detection (don't treat "duplicate: false" as error)
    const isSuccess = crmResponse.ok || crmData.success === true;
    const isAlreadyExists = (crmData.message && crmData.message.toLowerCase().includes('already exists')) || crmData.duplicate === true;
    const isInvalid = crmResponse.status === 400 || (crmData.message && crmData.message.toLowerCase().includes('invalid'));

    if (isInvalid && !isAlreadyExists) {
      return res.status(400).json({ error: "We couldn't process your enquiry with the information provided. Please review your details and try again." });
    }

    if (!isSuccess && !isAlreadyExists) {
      console.error('[CONTACT ERROR] CRM rejected lead without already exists');
      return res.status(502).json({ error: "Failed to submit to CRM. Please try again." });
    }

    // Increment Lead Dashboard for contact ONLY if new lead
    if (isSuccess && !isAlreadyExists) {
      try {
        const dashboardPayload = { website: "Aegis Crypto", type: "contact", name, email };
        console.log('[CONTACT] Dashboard Payload:', dashboardPayload);
        const dashResp = await fetch('https://lead-dashboard-orcin.vercel.app/api/increment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dashboardPayload)
        });
        console.log('[CONTACT] Dashboard Response status:', dashResp.status);
      } catch (dashErr) {
        console.error('[CONTACT ERROR] Dashboard tracking failed', dashErr);
      }
    } else {
      console.log('[CONTACT] CRM did not accept as a new lead. Skipping Dashboard increment.');
    }

    return res.status(200).json({
      success: true,
      isDuplicate: isAlreadyExists,
      message: isAlreadyExists ? "It looks like you've already contacted us. We've recognized your details and will continue with your request." : "Your message has been sent successfully."
    });
    
  } catch (error: any) {
    console.error('[CONTACT FATAL ERROR]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
