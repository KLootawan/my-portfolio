'use client'

import { useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const { isDarkMode } = useDarkMode()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { ref: contactRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true)
    }
  }, [isIntersecting])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newErrors = { ...errors }

    // Validate individual field on blur
    if (name === 'name') {
      if (!value.trim()) {
        newErrors.name = 'Name is required'
      } else if (value.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      } else {
        delete newErrors.name
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value.trim()) {
        newErrors.email = 'Email is required'
      } else if (!emailRegex.test(value)) {
        newErrors.email = 'Please enter a valid email address'
      } else {
        delete newErrors.email
      }
    } else if (name === 'subject') {
      if (!value.trim()) {
        newErrors.subject = 'Subject is required'
      } else if (value.trim().length < 5) {
        newErrors.subject = 'Subject must be at least 5 characters'
      } else {
        delete newErrors.subject
      }
    } else if (name === 'message') {
      if (!value.trim()) {
        newErrors.message = 'Message is required'
      } else if (value.trim().length < 10) {
        newErrors.message = 'Message must be at least 10 characters'
      } else if (value.trim().length > 1000) {
        newErrors.message = 'Message must be less than 1000 characters'
      } else {
        delete newErrors.message
      }
    }

    setErrors(newErrors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Send form data to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('API Response:', data)

      if (!response.ok) {
        const errorMessage = data.details 
          ? `${data.error}: ${data.details}` 
          : data.error || 'Failed to send message'
        console.error('API Error:', data)
        throw new Error(errorMessage)
      }

      // Success - reset form
      console.log('Email sent successfully! ID:', data.id)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setErrors({})
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'john.doe@example.com',
      href: 'mailto:john.doe@example.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'San Francisco, CA',
      href: '#'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/kamile-lootawan',
      href: 'https://www.linkedin.com/in/kamile-lootawan-599696336'
    }
  ]

  return (
    <section ref={contactRef} id="contact" className={`pt-24 pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Get In <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Let's Connect
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question, want to work together, or just want to say hi, 
                  feel free to reach out!
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className={`group flex items-center p-3 sm:p-4 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-emerald-50'}`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-xl sm:text-2xl mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className={`font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {info.title}
                      </h4>
                      <p className={`group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors duration-300 text-xs sm:text-sm truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

            </div>

            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-emerald-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                        Message sent successfully! I'll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-red-700 dark:text-red-300 font-medium mb-1">
                          Something went wrong. Please try again later.
                        </p>
                        <p className="text-red-600 dark:text-red-400 text-sm">
                          Check the browser console (F12) for more details.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 ${
                        errors.name 
                          ? 'border-red-300 dark:border-red-600 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500'
                      }`}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-300 dark:border-red-600 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 ${
                      errors.subject 
                        ? 'border-red-300 dark:border-red-600 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500'
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message * <span className="text-gray-500 text-sm">({formData.message.length}/1000)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    rows={6}
                    maxLength={1000}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-300 dark:border-red-600 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500'
                    }`}
                    placeholder="Tell me about your project or just say hello!"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:bg-gray-400"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  
                  {/* Form Status Indicator */}
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {Object.keys(errors).length > 0 ? (
                      <span className="text-red-500">Please fix the errors above to continue</span>
                    ) : isSubmitting ? (
                      <span>Please wait while we send your message...</span>
                    ) : (
                      <span>All fields are required</span>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
