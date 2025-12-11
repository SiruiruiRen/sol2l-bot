"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, ChevronLeft, ChevronRight } from "lucide-react"
import ModuleBar from "@/components/module-bar"
import GuidedLongTermGoal from "@/components/guided-long-term-goal"

export default function LongTermGoalPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id")
    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      console.warn("No user_id found, redirecting to intro.")
      router.push('/intro')
    }
  }, [router])

  const handleComplete = () => {
    const savedProgress = localStorage.getItem("solbot_phase4_completed_tasks");
    const completedTasks = savedProgress ? JSON.parse(savedProgress) : [];
    if (!completedTasks.includes('long_term_goals')) {
      completedTasks.push('long_term_goals');
      localStorage.setItem("solbot_phase4_completed_tasks", JSON.stringify(completedTasks));
    }
    setIsComplete(true);
  }

  const phaseColor = {
    bg1: "#161019",
    bg2: "#46385c",
    accent: "#d9c7ff",
    cardBorder: "rgba(217,199,255,0.35)",
  }

  return (
    <div
      className="min-h-screen text-white py-8"
      style={{ background: `linear-gradient(180deg, ${phaseColor.bg1} 0%, ${phaseColor.bg2} 100%)` }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_10%,rgba(217,199,255,0.08),transparent),radial-gradient(140%_120%_at_80%_20%,rgba(111,86,140,0.08),transparent),radial-gradient(160%_140%_at_50%_80%,rgba(217,199,255,0.05),transparent)]"></div>
      </div>
      <div className="container mx-auto px-4">
        <ModuleBar currentPhase={4} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card className="bg-[rgba(24,17,28,0.78)] backdrop-blur-md border shadow-xl mb-6" style={{ borderColor: phaseColor.cardBorder }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-center">
                <Target className="h-8 w-8" style={{ color: phaseColor.accent }} />
                <span className="bg-gradient-to-r from-[rgba(217,199,255,1)] to-[rgba(239,228,255,1)] bg-clip-text text-transparent">
                  Set Your Long-Term Goal
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[700px] p-2">
              {userId ? (
                <GuidedLongTermGoal
                  userId={userId}
                  phase="4"
                  component="long_term_goals"
                  onComplete={handleComplete}
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
              className="text-white/90 border-[rgba(217,199,255,0.35)] hover:bg-white/10"
              onClick={() => router.push('/phase4/tasks')}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Tasks
            </Button>
          </div>
          
          {/* Centered Continue Button */}
          {isComplete && (
            <div className="flex justify-center mt-6">
              <Button
                className="bg-gradient-to-r from-[rgba(217,199,255,1)] to-[rgba(239,228,255,1)] text-[#1a1524] px-8 py-3 rounded-lg font-medium hover:opacity-90"
                onClick={() => router.push('/phase4/tasks')}
              >
                Continue to Next Task <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 