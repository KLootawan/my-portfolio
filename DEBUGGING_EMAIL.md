# Debugging Email Issues

If you're not receiving emails, follow these steps:

## Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Submit the contact form
4. Look for any error messages in red

## Step 2: Check Server Logs

1. Look at your terminal where `npm run dev` is running
2. Submit the contact form
3. Check for error messages or logs

You should see messages like:
- `Attempting to send email to: your-email@example.com`
- `Email sent successfully. ID: ...`
- Or error messages if something is wrong

## Step 3: Verify Environment Variables

Make sure your `.env.local` file exists and has the correct values:

```env
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Important:**
- The API key should start with `re_`
- No quotes around the values
- No spaces around the `=` sign
- Make sure the file is named exactly `.env.local` (not `.env.local.txt`)

## Step 4: Restart Your Dev Server

After creating or updating `.env.local`:
1. Stop your dev server (Ctrl+C)
2. Start it again: `npm run dev`
3. Try submitting the form again

**Environment variables are only loaded when the server starts!**

## Step 5: Verify Your Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Log in to your account
3. Check your API keys at [https://resend.com/api-keys](https://resend.com/api-keys)
4. Make sure the API key is active and correct

## Step 6: Check Resend Dashboard

1. Go to [https://resend.com/emails](https://resend.com/emails)
2. Check if emails are being sent
3. Look for any error messages or delivery issues

## Step 7: Check Your Email

1. Check your **spam/junk folder**
2. Check if the email address in `CONTACT_EMAIL` is correct
3. Try a different email address to test

## Common Issues

### Issue: "Email service is not configured"
**Solution:** Your `.env.local` file is missing or the variables aren't set correctly. Make sure:
- The file exists in the project root
- Variables are spelled correctly
- You restarted the dev server

### Issue: "Failed to send email"
**Solution:** 
- Check your Resend API key is correct
- Make sure your Resend account is active
- Check the Resend dashboard for error details

### Issue: Form shows success but no email received
**Solution:**
- Check spam folder
- Verify the email address in `CONTACT_EMAIL` is correct
- Check Resend dashboard to see if email was actually sent
- Some email providers may delay delivery

### Issue: API key error
**Solution:**
- Make sure the API key starts with `re_`
- Copy the full key (no spaces or line breaks)
- Regenerate the key in Resend if needed

## Testing the API Directly

You can test the API route directly using curl or Postman:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## Still Not Working?

1. Check the exact error message in the browser console
2. Check the server logs for detailed error messages
3. Verify all environment variables are set correctly
4. Make sure you've restarted the dev server after adding/changing `.env.local`
5. Try regenerating your Resend API key

