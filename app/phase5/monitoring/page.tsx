"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, ArrowLeft, BarChart } from "lucide-react"
import ModuleBar from "@/components/module-bar"
import GuidedMonitoringAdaptation from "@/components/guided-monitoring-adaptation"

export default function MonitoringAdaptationPage() {
  const router = useRouter()
  const phaseId = 5
  const [userName, setUserName] = useState("")
  const [userId, setUserId] = useState("")
  
  // Load user data on component mount
  useEffect(() => {
    // Load user name from localStorage
    const storedName = localStorage.getItem("solbot_user_name")
    if (storedName) {
      setUserName(storedName)
    }
    
    // Load userId from localStorage
    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])

  const handlePhaseComplete = (nextPhase?: string) => {
    // If no nextPhase provided, default to summary page
    if (!nextPhase) {
      router.push("/summary");
      return;
    }
    
    // If it's an absolute path (starts with /), use it directly
    if (nextPhase.startsWith("/")) {
      router.push(nextPhase);
      return;
    }
    
    // Otherwise, handle relative paths
    if (nextPhase.startsWith("phase")) {
      router.push(`/${nextPhase}`);
    } else {
      router.push(`/phase${nextPhase}`);
    }
  }

  const phaseColor = {
    bg1: "#171108",
    bg2: "#4a422c",
    accent: "#f7e3a5",
    cardBorder: "rgba(247,227,165,0.35)",
  }

  return (
    <div
      className="min-h-screen text-white py-8"
      style={{ background: `linear-gradient(180deg, ${phaseColor.bg1} 0%, ${phaseColor.bg2} 100%)` }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_10%,rgba(247,227,165,0.08),transparent),radial-gradient(140%_120%_at_80%_20%,rgba(122,106,60,0.08),transparent),radial-gradient(160%_140%_at_50%_80%,rgba(247,227,165,0.05),transparent)]"></div>
      </div>

      <div className="container mx-auto px-4">
        <ModuleBar currentPhase={phaseId} />
        
        {/* Fixed Phase Title that stays visible when scrolling */}
        <div className="fixed top-0 left-0 right-0 z-20 bg-[rgba(24,18,12,0.9)] backdrop-blur-md border-b border-[rgba(247,227,165,0.35)] py-3 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
              <BarChart className="h-6 w-6 mr-2" style={{ color: phaseColor.accent }} />
              <h2 className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-[rgba(247,227,165,1)] to-[rgba(255,240,200,1)] bg-clip-text">
                Monitoring & Adaptation
              </h2>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="flex justify-between mb-4">
            <Button
              variant="ghost"
              className="text-indigo-400 hover:text-indigo-300 hover:bg-slate-800/50"
              onClick={() => router.push("/phase5")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Phase 5
            </Button>
          </div>
          
          <Card className="bg-[rgba(24,18,12,0.8)] backdrop-blur-md border shadow-xl mb-6 max-w-4xl mx-auto w-full" style={{ borderColor: phaseColor.cardBorder }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-bold">
                <BarChart className="h-7 w-7" style={{ color: phaseColor.accent }} />
                <span className="bg-gradient-to-r from-[rgba(247,227,165,1)] to-[rgba(255,240,200,1)] bg-clip-text text-transparent">
                  Monitoring & Adaptation
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-white/80 mb-6">
                <p>
                  {userName ? `Excellent job, ${userName}!` : "Excellent job!"} In this final phase, we'll create a system for monitoring your progress and adapting your strategy as needed. This will help you stay on track with your learning goals and make adjustments when necessary.
                </p>
              </div>

              <GuidedMonitoringAdaptation 
                userId={userId}
                phase="phase5" 
                height="750px"
                onComplete={handlePhaseComplete}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 