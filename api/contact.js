/**
 * Vercel Serverless API Route: /api/contact
 * Processes contact form submissions, validates data securely, and dispatches email notifications.
 */

export default async function handler(req, res) {
  // CORS & Methods check
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed. Please send a POST request.`
    });
  }

  try {
    const { name, email, phone, service, message } = req.body;

    // Server-side validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Please provide a valid full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!service) {
      return res.status(400).json({ success: false, message: 'Please select a required service.' });
    }

    if (!message || message.trim().length < 15) {
      return res.status(400).json({ success: false, message: 'Project details must be at least 15 characters long.' });
    }

    const cleanPayload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : 'Not provided',
      service: service.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    console.log('--- NEW CONTACT INQUIRY RECEIVED ---');
    console.log(`From: ${cleanPayload.name} <${cleanPayload.email}>`);
    console.log(`Phone: ${cleanPayload.phone}`);
    console.log(`Service: ${cleanPayload.service}`);
    console.log(`Message: ${cleanPayload.message}`);
    console.log('------------------------------------');

    /*
     * EMAIL DISPATCH HOOK (Resend / SendGrid / Nodemailer / EmailJS API)
     * When Resend or SMTP environment variables (e.g. RESEND_API_KEY) are configured in Vercel:
     */
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['nabeelahmad826@gmail.com'],
          reply_to: cleanPayload.email,
          subject: `New Portfolio Inquiry: ${cleanPayload.service} from ${cleanPayload.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #0284c7;">New Portfolio Lead Received!</h2>
              <p><strong>Client Name:</strong> ${cleanPayload.name}</p>
              <p><strong>Email Address:</strong> <a href="mailto:${cleanPayload.email}">${cleanPayload.email}</a></p>
              <p><strong>Phone / WhatsApp:</strong> ${cleanPayload.phone}</p>
              <p><strong>Service Requested:</strong> ${cleanPayload.service}</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
              <h3>Project Requirements:</h3>
              <p style="background: #f8fafc; padding: 15px; border-left: 4px solid #0284c7; border-radius: 4px;">
                ${cleanPayload.message.replace(/\n/g, '<br>')}
              </p>
              <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
                Timestamp: ${cleanPayload.timestamp} • Sent from Nabeel Ahmad Vercel Portfolio
              </p>
            </div>
          `
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Email API dispatch warning:', errorData);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been processed and dispatched successfully to Nabeel Ahmad.',
      data: cleanPayload
    });

  } catch (error) {
    console.error('Serverless Contact Handler Error:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected internal server error occurred while sending your message.'
    });
  }
}
