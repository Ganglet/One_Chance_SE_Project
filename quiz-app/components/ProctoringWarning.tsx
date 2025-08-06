"use client"

import { useEffect, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProctoringWarningProps {
  message: string
  isVisible: boolean
  onDismiss?: () => void
  warningCount: number
  maxWarnings: number
}

export function ProctoringWarning({ 
  message, 
  isVisible, 
  onDismiss, 
  warningCount, 
  maxWarnings 
}: ProctoringWarningProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      // Add a small delay to ensure the animation plays
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!isVisible) return null

  const warningLevel = warningCount >= maxWarnings - 1 ? 'critical' : 
                      warningCount >= maxWarnings / 2 ? 'warning' : 'info'

  const getWarningStyles = () => {
    switch (warningLevel) {
      case 'critical':
        return {
          bg: 'bg-red-500',
          border: 'border-red-600',
          text: 'text-white',
          icon: 'text-red-100'
        }
      case 'warning':
        return {
          bg: 'bg-orange-500',
          border: 'border-orange-600',
          text: 'text-white',
          icon: 'text-orange-100'
        }
      default:
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-600',
          text: 'text-white',
          icon: 'text-yellow-100'
        }
    }
  }

  const styles = getWarningStyles()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className={`
          relative max-w-md w-full mx-4 p-6 rounded-lg shadow-2xl border-2
          ${styles.bg} ${styles.border} ${styles.text}
          transform transition-all duration-300 ease-out
          ${isAnimating ? 'scale-110' : 'scale-100'}
        `}
      >
        {/* Warning Icon */}
        <div className="flex items-center justify-center mb-4">
          <div className={`w-16 h-16 rounded-full bg-white/20 flex items-center justify-center ${styles.icon}`}>
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>

        {/* Warning Count */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold mb-2">
            WARNING {warningCount}/{maxWarnings}
          </div>
          <div className="text-sm opacity-90">
            {warningLevel === 'critical' && 'FINAL WARNING - Next violation will result in disqualification!'}
            {warningLevel === 'warning' && 'Multiple violations detected'}
            {warningLevel === 'info' && 'Proctoring violation detected'}
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium leading-relaxed">
            {message}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                warningLevel === 'critical' ? 'bg-red-200' :
                warningLevel === 'warning' ? 'bg-orange-200' : 'bg-yellow-200'
              }`}
              style={{ width: `${(warningCount / maxWarnings) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onDismiss}
            variant="outline"
            className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Acknowledge
          </Button>
        </div>

        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Pulsing Animation for Critical Warnings */}
        {warningLevel === 'critical' && (
          <div className="absolute inset-0 rounded-lg border-2 border-red-300 animate-pulse pointer-events-none" />
        )}
      </div>
    </div>
  )
} 