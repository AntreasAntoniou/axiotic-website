# Email Form Setup Guide

This guide will help you set up email functionality for the contact form using EmailJS.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month on free tier)
3. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.) or use **Custom Service**
4. Follow the setup instructions for your provider
5. Note your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template:

```
Subject: New Consultation Request from {{from_name}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This email was sent from the Axiotic.ai contact form.
```

4. Save the template and note your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcdefghijklmnop`)

## Step 5: Update form-handler.js

Open `docs/form-handler.js` and replace these placeholders:

1. Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
2. Replace `YOUR_SERVICE_ID` with your Service ID
3. Replace `YOUR_TEMPLATE_ID` with your Template ID
4. Update `contact@axiotic.ai` to your actual receiving email address

Example:
```javascript
emailjs.init('abcdefghijklmnop'); // Your Public Key

const response = await emailjs.send(
  'service_abc123',  // Your Service ID
  'template_xyz789', // Your Template ID
  {
    from_name: name,
    from_email: email,
    message: notes,
    to_email: 'contact@axiotic.ai', // Your receiving email
  }
);
```

## Step 6: Test the Form

1. Open your website locally or after deployment
2. Fill out the contact form
3. Submit and check your email inbox
4. Verify the email was received correctly

## Alternative: Using Netlify Forms (If Deploying to Netlify)

If you're deploying to Netlify, you can use their built-in form handling instead:

1. Add `netlify` attribute to your form:
```html
<form class="space-y-4" netlify name="consultation">
```

2. Add a hidden input for Netlify:
```html
<input type="hidden" name="form-name" value="consultation">
```

3. Netlify will automatically handle form submissions
4. View submissions in Netlify dashboard → Forms

## Alternative: Using Formspree

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for free account (50 submissions/month)
3. Create a new form
4. Get your form endpoint URL
5. Update the form action:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Troubleshooting

- **Emails not sending**: Check browser console for errors
- **EmailJS errors**: Verify all IDs are correct in form-handler.js
- **Rate limits**: Free tier has limits; upgrade if needed
- **Spam folder**: Check spam/junk folder for test emails

## Security Notes

- EmailJS Public Key is safe to expose in client-side code
- Never expose your Private Key or API secrets
- Consider adding rate limiting or CAPTCHA for production use

