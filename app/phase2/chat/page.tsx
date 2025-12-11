"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, ChevronLeft, ChevronRight } from "lucide-react"
import ModuleBar from "@/components/module-bar"
import GuidedLearningObjective from "@/components/guided-learning-objective"

export default function Phase2ChatPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id")
    const storedSessionId = localStorage.getItem("session_id")
    
    if (storedUserId && storedSessionId) {
      setUserId(storedUserId)
    } else {
      console.warn("No session found, redirecting to intro.")
      router.push('/intro')
    }
  }, [router])

  const handlePhaseComplete = () => {
    router.push("/phase3")
  }

  const phaseColor = {
    bg1: "#0f1418",
    bg2: "#1c2b2b",
    accent: "#9be7c0",
    cardBorder: "rgba(155,231,192,0.35)",
  }

  return (
    <div
      className="min-h-screen text-white py-8"
      style={{ background: `linear-gradient(180deg, ${phaseColor.bg1} 0%, ${phaseColor.bg2} 100%)` }}
    >
      <div className="container mx-auto px-4">
        <ModuleBar currentPhase={2} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card className="bg-[rgba(20,26,28,0.8)] backdrop-blur-md border shadow-xl mb-6" style={{ borderColor: phaseColor.cardBorder }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-center">
                <Target className="h-8 w-8" style={{ color: phaseColor.accent }} />
                <span className="bg-gradient-to-r from-[rgba(155,231,192,1)] to-[rgba(174,242,210,1)] bg-clip-text text-transparent">
                  Define Your Learning Objective
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[700px] p-2">
              {userId ? (
                <GuidedLearningObjective
                  userId={userId}
                  phase="2"
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
              className="text-teal-400 border-teal-500/30 hover:bg-teal-900/20"
              onClick={() => router.push('/phase2')}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Instructions
            </Button>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white"
              onClick={handlePhaseComplete}
            >
              Next to Phase 3
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 