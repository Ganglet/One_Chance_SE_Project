"use client"

import { useEffect } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
  className?: string
}

export function SmoothScroll({ children, className }: SmoothScrollProps) {
  useEffect(() => {
    // Enhanced smooth scrolling for the entire page
    const style = document.createElement('style')
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
        transition: background 0.2s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }
      
      /* Dark mode scrollbar */
      @media (prefers-color-scheme: dark) {
        ::-webkit-scrollbar-track {
          background: #2a2a2a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #555;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return <div className={className}>{children}</div>
}

// Utility function for smooth scrolling to element
export function scrollToElement(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Utility function for smooth scrolling to top
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
