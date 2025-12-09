"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ModuleBar from "@/components/module-bar"
import GuidedMonitoring from "@/components/guided-monitoring"

export default function Phase5ChatContent() {
  const router = useRouter()
  const [userId, setUserId] = useState<string>("")
  const [isComplete, setIsComplete] = useState(false)
  
  // Load user data on component mount
  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem("user_id")
      const storedSessionId = localStorage.getItem("session_id")
      
      if (storedUserId && storedSessionId) {
        setUserId(storedUserId)
      } else {
        // If there's no session, redirect to intro
        console.warn("No session found, redirecting to intro.")
        router.push('/intro')
        return
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      // Handle cases where localStorage might be blocked or unavailable.
      router.push('/intro')
    }
  }, [router])

  const handlePhaseComplete = (nextPhase?: string) => {
    setIsComplete(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white py-8">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>

        {/* Nebula effect with amber tone */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent opacity-30"></div>
      </div>

      {/* Add Module Bar */}
      <ModuleBar currentPhase={5} />

      {/* Fixed Title Header */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-gray-900/95 backdrop-blur-md border-b border-amber-500/20 py-3 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <LineChart className="h-7 w-7 text-amber-500 mr-2" />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Monitor Progress & Adapt Strategies
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gray-900/60 backdrop-blur-md border border-amber-500/30 shadow-xl mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-center">
                <LineChart className="h-8 w-8 text-amber-500" />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Create Your Monitoring System
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="min-h-[700px] p-2">
              {userId ? (
                <GuidedMonitoring
                  userId={userId}
                  phase="phase5"
                  component="progress_monitoring"
                  onComplete={handlePhaseComplete}
                  height="100%"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>Loading session...</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-between mt-4">
             <Button
              variant="outline"
              className="text-amber-400 border-amber-500/30 hover:bg-amber-900/20"
              onClick={() => router.push('/phase5')}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Instructions
            </Button>
          </div>
          
          {/* Centered Continue Button */}
          {isComplete && (
            <div className="flex justify-center mt-6">
              <Button
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-medium"
                onClick={() => router.push('/summary')}
              >
                Complete Learning Journey <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Add subtle animated gradient background */}
      <div className="fixed inset-0 -z-20 opacity-25 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-yellow-900/20 animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>
    </div>
  )
} 