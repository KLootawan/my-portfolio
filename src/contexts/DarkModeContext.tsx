'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface DarkModeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
  isLoading: boolean
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    // Get the initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('darkMode')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    let initialDarkMode = false
    if (savedTheme !== null) {
      initialDarkMode = savedTheme === 'true'
    } else {
      initialDarkMode = systemPrefersDark
    }
    
    // Apply the theme immediately
    if (initialDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    setIsDarkMode(initialDarkMode)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      // Update the DOM and localStorage when theme changes
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
    }
  }, [isDarkMode, mounted])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, isLoading: !mounted }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}
