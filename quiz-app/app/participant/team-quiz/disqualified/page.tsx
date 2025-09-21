"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TeamDisqualifiedPage() {
  const router = useRouter()

  useEffect(() => {
    // Prevent going back to the quiz
    window.history.pushState(null, '', window.location.href)
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href)
    }
    
    // Disable back button and navigation
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <Card className="text-center bg-white">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-gray-700" />
            </div>
            <CardTitle className="text-2xl text-gray-700">Disqualified</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">Team Quiz Violation Detected</h3>
              <p className="text-gray-600">
                You have been disqualified from the team quiz due to multiple proctoring violations.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Proctoring Violations:</span>
              </div>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>• Exiting fullscreen mode</li>
                <li>• Switching tabs or windows</li>
                <li>• Losing focus from the quiz window</li>
              </ul>
            </div>
            <div className="pt-4">
              <Button 
                onClick={() => router.push("/dashboard")}
                className="w-full"
              >
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 