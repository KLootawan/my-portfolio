# How to Stop Emails Going to Spam

Your emails are working! They're just going to spam. Here's how to fix it:

## Quick Fix (Immediate)

1. **Mark as "Not Spam"** in your email:
   - Find the email in your spam folder
   - Mark it as "Not Spam" or move it to Inbox
   - This trains your email provider to recognize these emails

2. **Add sender to contacts**:
   - Add the sender email to your contacts
   - This helps your email provider trust future emails

## Better Fix (Recommended)

### Option 1: Verify Your Domain in Resend (Best Solution)

This is the best long-term solution:

1. **Go to Resend Dashboard**:
   - Visit [https://resend.com/domains](https://resend.com/domains)
   - Click "Add Domain"
   - Enter your domain (e.g., `yourdomain.com`)

2. **Add DNS Records**:
   - Resend will give you DNS records to add
   - Add them to your domain's DNS settings
   - Wait for verification (usually a few minutes)

3. **Update Your .env.local**:
   ```env
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   CONTACT_EMAIL=your-email@example.com
   ```

4. **Restart your dev server**

This will significantly improve deliverability because:
- Emails come from your verified domain
- SPF, DKIM, and DMARC records are properly configured
- Email providers trust verified domains more

### Option 2: Use a Different "From" Email

If you have a Gmail or other email account:

1. **Verify your email in Resend**:
   - Go to [https://resend.com/emails](https://resend.com/emails)
   - Resend may allow you to verify your email address

2. **Update .env.local**:
   ```env
   RESEND_FROM_EMAIL=your-verified-email@gmail.com
   CONTACT_EMAIL=your-email@example.com
   ```

### Option 3: Improve Email Content

I've already updated the email template to:
- Include proper headers
- Add tracking tags
- Use professional formatting

## Why Emails Go to Spam

Common reasons:
1. **Unverified sender** - Using `onboarding@resend.dev` looks suspicious
2. **No SPF/DKIM records** - Email providers can't verify authenticity
3. **New sender reputation** - Your email address is new to the provider
4. **Content triggers** - Certain words or formatting can trigger spam filters

## Testing Deliverability

1. **Send a test email** from your contact form
2. **Check spam folder** - If it's there, mark as "Not Spam"
3. **Wait a few minutes** - Sometimes there's a delay
4. **Check Resend dashboard** - See if email was delivered

## Long-term Solution

**Verify your domain in Resend** - This is the best solution because:
- ✅ Emails come from your domain (looks professional)
- ✅ Proper authentication (SPF, DKIM, DMARC)
- ✅ Better deliverability rates
- ✅ More trustworthy to email providers

## Current Status

✅ **Emails are being sent successfully**
✅ **API is working correctly**
⚠️ **Emails going to spam** (common with unverified senders)

The good news: Your contact form is working! You just need to improve deliverability.

