# Testing Email Functionality Locally

Follow these steps to test your contact form locally:

## Step 1: Start the Development Server

Make sure your dev server is running:

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.2.33
- Local:        http://localhost:3000
```

## Step 2: Open Your Portfolio

1. Open your browser
2. Go to: http://localhost:3000
3. Navigate to the Contact section (or click "Request CV" button)

## Step 3: Fill Out the Contact Form

1. Fill in all required fields:
   - **Name**: Your name (or test name)
   - **Email**: A valid email address
   - **Subject**: Test message
   - **Message**: This is a test message to verify email functionality

2. Click "Send Message"

## Step 4: Check Results

### Success Indicators:
- ✅ Green success message appears: "Message sent successfully! I'll get back to you soon."
- ✅ Form fields are cleared
- ✅ No error messages

### Check Browser Console:
1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Look for:
   - `API Response: { message: 'Email sent successfully', id: '...' }`
   - `Email sent successfully! ID: ...`

### Check Server Terminal:
In your terminal where `npm run dev` is running, you should see:
- `Attempting to send email to: kamilelootawan2@gmail.com`
- `Email sent successfully. ID: ...`

### Check Your Email:
1. Go to **kamilelootawan2@gmail.com** inbox
2. Check **inbox** (might take a few seconds)
3. Check **spam/junk** folder (common with `onboarding@resend.dev`)
4. You should see an email with subject: "Portfolio Contact: [your subject]"

## Step 5: Troubleshooting

### If you see an error message:
1. **Check browser console** (F12 → Console tab)
2. **Check server terminal** for error messages
3. **Check Network tab**:
   - F12 → Network tab
   - Submit form
   - Look for `contact` request
   - Click it → Check Response tab

### Common Issues:

**"Email service is not configured"**
- Check `.env.local` file exists
- Verify variables are set correctly
- **Restart your dev server** after adding/updating `.env.local`

**Form shows success but no email received**
- Check spam folder
- Check Resend dashboard: https://resend.com/emails
- Wait a few minutes (sometimes delayed)

**API error 500**
- Check server terminal for detailed error
- Verify your Resend API key is correct
- Check Resend dashboard for account status

## Quick Test Command

You can also test the API directly with curl:

```bash
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Test\",\"message\":\"This is a test message\"}"
```

## Expected Results

✅ Form submits successfully
✅ Success message appears
✅ Email received in kamilelootawan2@gmail.com
✅ Email contains all form data

## Next Steps After Testing

Once local testing works:
1. Add environment variables to your hosting platform (Vercel/Netlify)
2. Redeploy your site
3. Test in production

