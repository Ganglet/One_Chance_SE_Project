import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface ProctoringConfig {
  maxWarnings: number
  warningDuration: number
  enableFullscreen: boolean
  enableTabSwitchDetection: boolean
  enableFocusDetection: boolean
  disqualificationRoute: string
}

interface ProctoringState {
  warnings: number
  isFullscreen: boolean
  isDisqualified: boolean
  showWarning: boolean
  warningMessage: string
}

export const useProctoring = (config: ProctoringConfig) => {
  const router = useRouter()
  const [state, setState] = useState<ProctoringState>({
    warnings: 0,
    isFullscreen: false,
    isDisqualified: false,
    showWarning: false,
    warningMessage: ''
  })

  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

  // Check if fullscreen is supported
  const isFullscreenSupported = useCallback(() => {
    if (!isBrowser) return false
    return !!(document.fullscreenEnabled || 
             (document as any).webkitFullscreenEnabled || 
             (document as any).mozFullScreenEnabled ||
             (document as any).msFullscreenEnabled)
  }, [isBrowser])

  // Check if currently in fullscreen
  const checkFullscreen = useCallback(() => {
    if (!isBrowser) return false
    
    const isFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    )
    
    setState(prev => ({ ...prev, isFullscreen }))
    return isFullscreen
  }, [isBrowser])

  // Show warning
  const showWarning = useCallback((message: string) => {
    setState(prev => ({
      ...prev,
      showWarning: true,
      warningMessage: message,
      warnings: prev.warnings + 1
    }))

    // Hide warning after duration
    setTimeout(() => {
      setState(prev => ({ ...prev, showWarning: false }))
    }, config.warningDuration)
  }, [config.warningDuration])

  // Enter fullscreen
  const enterFullscreen = useCallback(async () => {
    if (!isBrowser || !config.enableFullscreen || !isFullscreenSupported()) return

    try {
      // Check if document has focus (user interaction required)
      if (!document.hasFocus()) {
        console.log('Document not focused, cannot enter fullscreen')
        return
      }

      const element = document.documentElement
      
      // Check if already in fullscreen
      if (checkFullscreen()) {
        console.log('Already in fullscreen')
        return
      }

      if (element.requestFullscreen) {
        await element.requestFullscreen()
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen()
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen()
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen()
      }
    } catch (error) {
      console.log('Failed to enter fullscreen:', error)
      // Don't throw error, just log it and continue
    }
  }, [config.enableFullscreen, isBrowser, isFullscreenSupported, checkFullscreen])

  // Exit fullscreen
  const exitFullscreen = useCallback(async () => {
    if (!isBrowser) return
    
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen()
      }
    } catch (error) {
      console.error('Failed to exit fullscreen:', error)
    }
  }, [isBrowser])

  // Handle violation
  const handleViolation = useCallback((violationType: string) => {
    setState(prev => {
      const newWarnings = prev.warnings + 1
      
      if (newWarnings >= config.maxWarnings) {
        // Disqualify user
        setTimeout(() => {
          router.push(config.disqualificationRoute)
        }, 1000)
        
        return { ...prev, isDisqualified: true, warnings: newWarnings }
      }

      // Show warning
      let message = ''
      switch (violationType) {
        case 'fullscreen_exit':
          message = `⚠️ WARNING ${newWarnings}/${config.maxWarnings}: You exited fullscreen mode. Please return to fullscreen immediately.`
          // Auto-re-enter fullscreen after a short delay
          setTimeout(() => {
            if (config.enableFullscreen && isBrowser) {
              enterFullscreen().catch(() => {
                console.log('Failed to re-enter fullscreen after violation')
              })
            }
          }, 1000)
          break
        case 'tab_switch':
          message = `⚠️ WARNING ${newWarnings}/${config.maxWarnings}: You switched tabs. Please return to the quiz immediately.`
          break
        case 'window_focus':
          message = `⚠️ WARNING ${newWarnings}/${config.maxWarnings}: You lost focus from the quiz window. Please return to the quiz immediately.`
          break
        default:
          message = `⚠️ WARNING ${newWarnings}/${config.maxWarnings}: Proctoring violation detected.`
      }

      // Show warning
      setTimeout(() => {
        setState(current => ({
          ...current,
          showWarning: true,
          warningMessage: message
        }))

        // Hide warning after duration
        setTimeout(() => {
          setState(current => ({ ...current, showWarning: false }))
        }, config.warningDuration)
      }, 0)

      return { ...prev, warnings: newWarnings }
    })
  }, [config.maxWarnings, config.warningDuration, config.disqualificationRoute, config.enableFullscreen, router, isBrowser, enterFullscreen])

  // Setup event listeners
  useEffect(() => {
    if (!isBrowser) return

    const handleFullscreenChange = () => {
      const isFullscreen = checkFullscreen()
      // Only trigger violation if we're supposed to be in fullscreen and we're not
      if (config.enableFullscreen && !isFullscreen && state.warnings < config.maxWarnings && document.hasFocus()) {
        // Add a small delay to avoid false triggers
        setTimeout(() => {
          if (!checkFullscreen() && state.warnings < config.maxWarnings) {
            handleViolation('fullscreen_exit')
          }
        }, 100)
      }
    }

    const handleVisibilityChange = () => {
      if (config.enableTabSwitchDetection && document.hidden && state.warnings < config.maxWarnings) {
        handleViolation('tab_switch')
      }
    }

    const handleWindowFocus = () => {
      if (config.enableFocusDetection) {
        setTimeout(() => {
          if (!document.hasFocus() && state.warnings < config.maxWarnings) {
            handleViolation('window_focus')
          }
        }, 100)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const preventedKeys = ['F11', 'F5', 'Ctrl+R', 'Ctrl+Shift+R', 'Alt+Tab', 'Alt+F4', 'Ctrl+W', 'Ctrl+Shift+T', 'Ctrl+T', 'Ctrl+N']
      const keyCombo = [e.ctrlKey && 'Ctrl', e.shiftKey && 'Shift', e.altKey && 'Alt', e.metaKey && 'Meta', e.key].filter(Boolean).join('+')
      
      if (preventedKeys.includes(keyCombo)) {
        e.preventDefault()
        e.stopPropagation()
        handleViolation('keyboard_shortcut')
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      handleViolation('context_menu')
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }

    // Add event listeners
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleWindowFocus)
    window.addEventListener('focus', handleWindowFocus)
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Prevent going back
    window.history.pushState(null, '', window.location.href)
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href)
    }

    // Initial fullscreen check
    checkFullscreen()

    return () => {
      // Cleanup event listeners
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleWindowFocus)
      window.removeEventListener('focus', handleWindowFocus)
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isBrowser, config.enableFullscreen, config.enableTabSwitchDetection, config.enableFocusDetection, config.maxWarnings, state.warnings, checkFullscreen, handleViolation])

  // Auto-enter fullscreen when component mounts
  useEffect(() => {
    if (!isBrowser || !config.enableFullscreen) return
    
    const timer = setTimeout(() => {
      // Only try to enter fullscreen if user has interacted with the page
      if (!state.isFullscreen && document.hasFocus()) {
        // Add a small delay to ensure user interaction
        setTimeout(() => {
          enterFullscreen().catch(() => {
            console.log('Failed to auto-enter fullscreen, continuing without it')
          })
        }, 500)
      }
    }, 2000) // Increased delay to 2 seconds

    return () => clearTimeout(timer)
  }, [config.enableFullscreen, state.isFullscreen, isBrowser, enterFullscreen])

  return {
    ...state,
    enterFullscreen,
    exitFullscreen,
    checkFullscreen,
    isFullscreenSupported: isFullscreenSupported()
  }
} 