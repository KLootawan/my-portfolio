'use client'

import { useState, useEffect } from 'react'
import DarkModeToggle from './DarkModeToggle'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      // Add offset to account for fixed header height
      const headerHeight = 64 // 16 * 4 = 64px (h-16)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`sticky top-0 left-0 right-0 z-[60] transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl shadow-gray-900/10' 
        : 'bg-gray-900/20 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#home')}
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              KL
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-gray-800 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400' 
                      : 'text-white hover:text-emerald-400'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Dark Mode Toggle */}
              <DarkModeToggle />
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-800 hover:text-emerald-600 hover:bg-gray-100' 
                  : 'text-white hover:text-emerald-400 hover:bg-white/10'
              }`}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50' 
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Let's Talk
                </button>
                <div className="ml-4">
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
