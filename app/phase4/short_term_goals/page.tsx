"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListTodo, ChevronLeft, ChevronRight } from "lucide-react"
import ModuleBar from "@/components/module-bar"
import GuidedShortTermGoal from "@/components/guided-short-term-goal"

export default function ShortTermGoalPage() {
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
    if (!completedTasks.includes('short_term_goals')) {
      completedTasks.push('short_term_goals');
      localStorage.setItem("solbot_phase4_completed_tasks", JSON.stringify(completedTasks));
    }
    setIsComplete(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white py-8">
      <div className="container mx-auto px-4">
        <ModuleBar currentPhase={4} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card className="bg-slate-900/60 backdrop-blur-md border border-purple-500/30 shadow-xl mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-center">
                <ListTodo className="h-8 w-8 text-purple-500" />
                <span className="bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
                  Set Your SMART Objectives
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[700px] p-2">
              {userId ? (
                <GuidedShortTermGoal
                  userId={userId}
                  phase="4"
                  component="short_term_goals"
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
              className="text-purple-400 border-purple-500/30 hover:bg-purple-900/20"
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
                className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white px-8 py-3 rounded-lg font-medium"
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