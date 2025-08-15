"use client"

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useProctoring } from '@/hooks/useProctoring'
import { ProctoringWarning } from '@/components/ProctoringWarning'
import { usePathname, useRouter } from 'next/navigation'

export default function TestProctoring() {
  const pathname = usePathname()
  const router = useRouter()
  const isParticipant = pathname.startsWith('/participant')
  const isHost = pathname.startsWith('/host')
  const [isActive, setIsActive] = useState(false)

  const disqRoute = useMemo(() => (
    isParticipant ? '/participant/test-proctoring/disqualified' : '/host/test-proctoring/disqualified'
  ), [isParticipant])

  const proctoringConfig = {
    maxWarnings: 3,
    warningDuration: 5000,
    enableFullscreen: true,
    enableTabSwitchDetection: true,
    enableFocusDetection: true,
    disqualificationRoute: disqRoute
  }

  const {
    warnings,
    isFullscreen,
    isDisqualified,
    showWarning,
    warningMessage,
    enterFullscreen,
    exitFullscreen,
    isFullscreenSupported
  } = useProctoring(isActive ? proctoringConfig : {
    maxWarnings: 0,
    warningDuration: 0,
    enableFullscreen: false,
    enableTabSwitchDetection: false,
    enableFocusDetection: false,
    disqualificationRoute: ""
  })

  const handleActivate = () => {
    setIsActive(true)
    setTimeout(() => {
      enterFullscreen().catch(() => {})
    }, 600)
  }

  const handleDeactivate = () => {
    setIsActive(false)
    exitFullscreen().catch(() => {})
  }

  const handleManualFullscreen = () => {
    enterFullscreen().catch(() => {})
  }

  const handleManualExitFullscreen = () => {
    exitFullscreen().catch(() => {})
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">{isParticipant ? 'Participant' : 'Host'} Proctoring Test</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 -mt-2">Verify fullscreen, focus, and tab switch detection</p>

        {/* Proctoring Warning Modal */}
        {showWarning && (
          <ProctoringWarning
            message={warningMessage}
            isVisible={showWarning}
            onDismiss={() => {}}
            warningCount={warnings}
            maxWarnings={proctoringConfig.maxWarnings}
          />
        )}

        {/* Status Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Proctoring Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Active:</span>
                <span className={`ml-2 font-medium ${isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isActive ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Fullscreen:</span>
                <span className={`ml-2 font-medium ${isFullscreen ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                  {isFullscreen ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Supported:</span>
                <span className={`ml-2 font-medium ${isFullscreenSupported ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isFullscreenSupported ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Warnings:</span>
                <span className={`ml-2 font-medium ${warnings > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                  {warnings}/{proctoringConfig.maxWarnings}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Buttons */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={handleActivate}
                disabled={isActive}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white"
              >
                Activate Proctoring
              </Button>
              <Button
                onClick={handleDeactivate}
                disabled={!isActive}
                className="bg-gray-300 text-gray-900 hover:bg-gray-400 disabled:bg-gray-200"
              >
                Deactivate Proctoring
              </Button>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={handleManualFullscreen}
                disabled={!isActive || isFullscreen}
                variant="outline"
                className="border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                Enter Fullscreen
              </Button>
              <Button
                onClick={handleManualExitFullscreen}
                disabled={!isActive || !isFullscreen}
                variant="outline"
                className="border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950"
              >
                Exit Fullscreen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Test Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>1. Click "Activate Proctoring" to start the system</p>
            <p>2. Try switching tabs or windows to test tab switch detection</p>
            <p>3. Try exiting fullscreen to test fullscreen exit detection</p>
            <p>4. Watch for warning messages and violation tracking</p>
            <p>5. After 3 warnings, you'll be redirected to disqualification page</p>
            <p className="text-amber-600 dark:text-amber-400 font-medium">
              Note: Fullscreen requires user interaction. Click "Enter Fullscreen" manually if auto-entry fails.
            </p>
          </CardContent>
        </Card>

        {/* Debug Info */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            {typeof document === 'undefined' ? (
              <p>Debug info available in browser only.</p>
            ) : (
              <>
                <p><span className="text-gray-500 dark:text-gray-400">Document Focus:</span> {document.hasFocus() ? 'Yes' : 'No'}</p>
                <p><span className="text-gray-500 dark:text-gray-400">Fullscreen Element:</span> {document.fullscreenElement ? 'Yes' : 'No'}</p>
                <p><span className="text-gray-500 dark:text-gray-400">Fullscreen Enabled:</span> {document.fullscreenEnabled ? 'Yes' : 'No'}</p>
                <p><span className="text-gray-500 dark:text-gray-400">Document Hidden:</span> {document.hidden ? 'Yes' : 'No'}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 