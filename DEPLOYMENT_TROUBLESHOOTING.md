# Deployment Troubleshooting Guide

If your email function stopped working after deployment, follow these steps:

## Step 1: Check Environment Variables in Production

**This is the #1 most common issue!** Your `.env.local` file is NOT automatically deployed (and shouldn't be for security reasons).

### For Vercel:
1. Go to your project dashboard on [vercel.com](https://vercel.com)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   - `RESEND_API_KEY` = `re_your_api_key_here`
   - `CONTACT_EMAIL` = `your-email@example.com`
   - `RESEND_FROM_EMAIL` = `onboarding@resend.dev` (or your verified domain)

5. **IMPORTANT:** After adding variables, **redeploy** your site:
   - Go to **Deployments** tab
   - Click the 3 dots on the latest deployment
   - Click **Redeploy**

### For Netlify:
1. Go to your site dashboard on [netlify.com](https://netlify.com)
2. Go to **Site configuration** → **Environment variables**
3. Add the same variables as above
4. Trigger a new deployment

### For Other Platforms:
Check your platform's documentation for how to add environment variables.

## Step 2: Verify Package Installation

Make sure `resend` is in your `package.json` dependencies (it should be already). Check that it's installed:

```bash
npm install
```

## Step 3: Check Build Logs

1. Check your deployment logs for errors
2. Look for messages about missing environment variables
3. Check for any build errors related to the API route

## Step 4: Test the API Route Directly

After deploying, test the API route:

```bash
curl -X POST https://your-site.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

Or use a tool like Postman or Thunder Client.

## Step 5: Check Browser Console

1. Open your deployed site
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Submit the contact form
5. Look for error messages

## Step 6: Check Server Logs

- **Vercel**: Go to your deployment → **Functions** tab → Click on `/api/contact` → Check logs
- **Netlify**: Go to **Functions** → Check logs

## Common Issues

### Issue: "Email service is not configured"
**Solution:** Environment variables are not set in production. Add them to your hosting platform.

### Issue: Build fails with Resend error
**Solution:** 
- Make sure `resend` is in `package.json` dependencies
- Run `npm install` locally and commit `package-lock.json`
- Redeploy

### Issue: API route returns 500 error
**Solution:**
- Check server logs for detailed error messages
- Verify `RESEND_API_KEY` is set correctly (starts with `re_`)
- Verify `CONTACT_EMAIL` is set correctly
- Make sure you've redeployed after adding environment variables

### Issue: Emails not sending
**Solution:**
- Check Resend dashboard at [resend.com/emails](https://resend.com/emails)
- Verify your API key is valid
- Check if you've hit the free tier limit (3,000 emails/month)

## Quick Checklist

- [ ] Environment variables added to hosting platform
- [ ] Site redeployed after adding environment variables
- [ ] `resend` package is in `package.json`
- [ ] Build completed successfully
- [ ] API route is accessible (test with curl)
- [ ] Resend API key is valid
- [ ] CONTACT_EMAIL is correct

## Still Not Working?

1. Check the exact error message in:
   - Browser console (F12)
   - Deployment logs
   - Server function logs

2. Share the error message and we can troubleshoot further!

