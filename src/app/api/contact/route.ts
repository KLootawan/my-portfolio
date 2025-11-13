import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend only if API key is available
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }
  return new Resend(apiKey)
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if Resend API key is set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set')
      return NextResponse.json(
        { error: 'Email service is not configured. Please check your RESEND_API_KEY environment variable.' },
        { status: 500 }
      )
    }

    // Get recipient email from environment variable (your email)
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.RESEND_FROM_EMAIL

    if (!recipientEmail) {
      console.error('CONTACT_EMAIL or RESEND_FROM_EMAIL environment variable is not set')
      return NextResponse.json(
        { error: 'Email service is not configured. Please set CONTACT_EMAIL environment variable.' },
        { status: 500 }
      )
    }

    // Initialize Resend client
    const resend = getResendClient()
    if (!resend) {
      console.error('Failed to initialize Resend client')
      return NextResponse.json(
        { error: 'Email service is not configured. Please check your RESEND_API_KEY environment variable.' },
        { status: 500 }
      )
    }

    console.log('Attempting to send email to:', recipientEmail)

    // Escape user input to prevent XSS
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: [recipientEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      // Add headers to improve deliverability
      headers: {
        'X-Entity-Ref-ID': `contact-${Date.now()}`,
      },
      // Add tags for better tracking
      tags: [
        { name: 'category', value: 'contact-form' },
        { name: 'source', value: 'portfolio' },
      ],
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${safeSubject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6;">${safeMessage}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>You can reply directly to this email to respond to ${safeName}.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from your portfolio contact form.
You can reply directly to this email to respond to ${name}.
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: error.message || 'Unknown error. Check your Resend API key and configuration.'
        },
        { status: 500 }
      )
    }

    console.log('Email sent successfully. ID:', data?.id)
    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error?.message || 'An unexpected error occurred'
      },
      { status: 500 }
    )
  }
}

