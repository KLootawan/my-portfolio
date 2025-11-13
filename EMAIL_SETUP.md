# Email Setup Guide

This guide will help you set up email functionality for your contact form so you can receive both CV requests and general inquiries.

## Step 1: Install Resend Package

Run this command in your terminal:

```bash
npm install resend
```

## Step 2: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (free tier includes 3,000 emails/month)
3. Verify your email address

## Step 3: Get Your API Key

1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Portfolio Contact Form")
4. Copy the API key (starts with `re_`)

## Step 4: Set Up Environment Variables

Create a `.env.local` file in your project root (same level as `package.json`) with the following:

```env
# Your Resend API Key
RESEND_API_KEY=re_your_actual_api_key_here

# Your email address where you want to receive contact form submissions
CONTACT_EMAIL=your-email@example.com

# Email address to send from (must be verified in Resend)
# For testing, you can use: onboarding@resend.dev
# For production, verify your own domain in Resend
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Important:** 
- Replace `your-email@example.com` with your actual email address
- Replace `re_your_actual_api_key_here` with your actual Resend API key
- The `RESEND_FROM_EMAIL` can be `onboarding@resend.dev` for testing, but for production you should verify your own domain in Resend

## Step 5: Verify Your Domain (Optional but Recommended)

For production use:

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click "Add Domain"
3. Follow the DNS verification steps
4. Once verified, update `RESEND_FROM_EMAIL` to use your domain (e.g., `noreply@yourdomain.com`)

## Step 6: Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to your contact form
3. Fill out and submit the form
4. Check your email inbox for the message!

## How It Works

- When someone submits the contact form, it sends a POST request to `/api/contact`
- The API route validates the data and sends an email using Resend
- The email includes:
  - Sender's name and email
  - Subject line
  - Message content
  - Reply-to is set to the sender's email, so you can reply directly

## Troubleshooting

**Email not sending?**
- Check that your `.env.local` file exists and has the correct values
- Verify your Resend API key is correct
- Check the browser console and server logs for errors
- Make sure you've restarted your dev server after adding environment variables

**Getting rate limit errors?**
- Resend free tier allows 3,000 emails/month
- Upgrade to a paid plan if you need more

**Want to use a different email service?**
- You can modify `src/app/api/contact/route.ts` to use:
  - SendGrid
  - Mailgun
  - AWS SES
  - Nodemailer with SMTP

## Security Notes

- Never commit your `.env.local` file to git (it's already in `.gitignore`)
- Keep your API keys secret
- Consider adding rate limiting for production use
- Add CAPTCHA if you're getting spam

