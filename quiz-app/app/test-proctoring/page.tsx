"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useProctoring } from '@/hooks/useProctoring'
import { ProctoringWarning } from '@/components/ProctoringWarning'

export default function TestProctoring() {
  const [isActive, setIsActive] = useState(false)

  const proctoringConfig = {
    maxWarnings: 3,
    warningDuration: 5000,
    enableFullscreen: true,
    enableTabSwitchDetection: true,
    enableFocusDetection: true,
    disqualificationRoute: "/test-proctoring/disqualified"
  }

  const {
    warnings,
    isFullscreen,
    isDisqualified,
    showWarning,
    warningMessage,
    enterFullscreen,
    exitFullscreen,
    checkFullscreen,
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
    // Try to enter fullscreen after activation
    setTimeout(() => {
      enterFullscreen().catch(() => {
        console.log('Failed to enter fullscreen on activation')
      })
    }, 1000)
  }

  const handleDeactivate = () => {
    setIsActive(false)
    exitFullscreen().catch(() => {
      console.log('Failed to exit fullscreen on deactivation')
    })
  }

  const handleManualFullscreen = () => {
    enterFullscreen().catch(() => {
      console.log('Manual fullscreen request failed')
    })
  }

  const handleManualExitFullscreen = () => {
    exitFullscreen().catch(() => {
      console.log('Manual exit fullscreen failed')
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Proctoring System Test</h1>

        {/* Proctoring Warning Modal */}
        {showWarning && (
          <ProctoringWarning
            message={warningMessage}
            isVisible={showWarning}
            onDismiss={() => {
              // Warning will auto-dismiss after duration
            }}
            warningCount={warnings}
            maxWarnings={proctoringConfig.maxWarnings}
          />
        )}

        {/* Status Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Proctoring Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Active:</span>
                <span className={`ml-2 font-medium ${isActive ? 'text-green-400' : 'text-red-400'}`}>
                  {isActive ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Fullscreen:</span>
                <span className={`ml-2 font-medium ${isFullscreen ? 'text-green-400' : 'text-yellow-400'}`}>
                  {isFullscreen ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Supported:</span>
                <span className={`ml-2 font-medium ${isFullscreenSupported ? 'text-green-400' : 'text-red-400'}`}>
                  {isFullscreenSupported ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Warnings:</span>
                <span className={`ml-2 font-medium ${warnings > 0 ? 'text-orange-400' : 'text-green-400'}`}>
                  {warnings}/{proctoringConfig.maxWarnings}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Buttons */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                onClick={handleActivate}
                disabled={isActive}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
              >
                Activate Proctoring
              </Button>
              <Button
                onClick={handleDeactivate}
                disabled={!isActive}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600"
              >
                Deactivate Proctoring
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleManualFullscreen}
                disabled={!isActive || isFullscreen}
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-600"
              >
                Enter Fullscreen
              </Button>
              <Button
                onClick={handleManualExitFullscreen}
                disabled={!isActive || !isFullscreen}
                variant="outline"
                className="border-orange-500 text-orange-400 hover:bg-orange-600"
              >
                Exit Fullscreen
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={checkFullscreen}
                variant="outline"
                className="border-gray-500 text-gray-400 hover:bg-gray-600"
              >
                Check Fullscreen Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Test Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>1. Click "Activate Proctoring" to start the system</p>
            <p>2. Try switching tabs or windows to test tab switch detection</p>
            <p>3. Try exiting fullscreen to test fullscreen exit detection</p>
            <p>4. Watch for warning messages and violation tracking</p>
            <p>5. After 3 warnings, you'll be redirected to disqualification page</p>
            <p className="text-yellow-400 font-medium">
              Note: Fullscreen requires user interaction. Click "Enter Fullscreen" manually if auto-entry fails.
            </p>
          </CardContent>
        </Card>

        {/* Debug Info */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><span className="text-gray-400">Document Focus:</span> {document.hasFocus() ? 'Yes' : 'No'}</p>
            <p><span className="text-gray-400">Fullscreen Element:</span> {document.fullscreenElement ? 'Yes' : 'No'}</p>
            <p><span className="text-gray-400">Fullscreen Enabled:</span> {document.fullscreenEnabled ? 'Yes' : 'No'}</p>
            <p><span className="text-gray-400">Document Hidden:</span> {document.hidden ? 'Yes' : 'No'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 