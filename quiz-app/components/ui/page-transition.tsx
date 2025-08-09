"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [currentPath, setCurrentPath] = useState(pathname)

  useEffect(() => {
    if (pathname !== currentPath) {
      // Start exit animation
      setIsVisible(false)
      
      // Wait for exit animation to complete, then change path and start enter animation
      const timer = setTimeout(() => {
        setCurrentPath(pathname)
        setIsVisible(true)
      }, 150) // Half of the transition duration

      return () => clearTimeout(timer)
    }
  }, [pathname, currentPath])

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-4'
      }`}
    >
      {children}
    </div>
  )
}

// Higher-order component for page transitions
export function withPageTransition<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WrappedComponent(props: P) {
    return (
      <PageTransition>
        <Component {...props} />
      </PageTransition>
    )
  }
} 