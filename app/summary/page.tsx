"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Download,
  Printer,
  Share2,
  Target,
  LineChart,
  RefreshCw,
  Lightbulb,
  BookOpen,
  Brain,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Home,
  Medal,
  Zap,
  RotateCw,
  MessageSquare,
  ChevronRight,
  BarChart2,
  Map,
  Send,
  Star,
  FileText,
  Bot,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ModuleBar from "@/components/module-bar"
import { Input } from "@/components/ui/input"
import { SrlSummary } from "@/components/srl-summary"
import { SrlFeedback } from "@/components/srl-feedback"

// Add interface definitions at the top to fix type errors

interface LearningGoal {
  goal: string;
  timeframe: string;
  actions: string[];
  strategies: Strategy[];
}

interface Strategy {
  name: string;
  description: string;
}

interface IfThenStrategy {
  challenge: string;
  response: string;
}

interface ProgressIndicator {
  indicator: string;
  measurementMethod: string;
  frequency: string;
}

interface CheckIn {
  timing: string;
  purpose: string;
}

interface SuccessCriteria {
  goal: string;
  criteria: string;
  evidence: string;
}

interface AdaptationTrigger {
  trigger: string;
  response: string;
}

interface SummaryData {
  total_time_seconds: number;
  phases_completed: number;
  score_improvement: number;
}

export default function SummaryPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("plan")
  const [learningPlan, setLearningPlan] = useState<{
    longTermGoal: string;
    shortTermGoals: LearningGoal[];
    ifThenStrategies: IfThenStrategy[];
  }>({
    longTermGoal: "",
    shortTermGoals: [],
    ifThenStrategies: [],
  })
  const [monitoringSystem, setMonitoringSystem] = useState<{
    progressIndicators: ProgressIndicator[];
    checkIns: CheckIn[];
    successCriteria: SuccessCriteria[];
    adaptationTriggers: AdaptationTrigger[];
    reflectionPrompts: string[];
  }>({
    progressIndicators: [],
    checkIns: [],
    successCriteria: [],
    adaptationTriggers: [],
    reflectionPrompts: [],
  })
  const [userName, setUserName] = useState("")
  const [summaryData, setSummaryData] = useState({
    total_time_seconds: 0,
    phases_completed: 0,
    score_improvement: 0,
  })
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // Load strategic plan
        const savedPlan = localStorage.getItem("solbot_strategic_plan")
        if (savedPlan) {
          setLearningPlan(JSON.parse(savedPlan))
        }

        // Load monitoring system
        const savedMonitoring = localStorage.getItem("solbot_monitoring_system")
        if (savedMonitoring) {
          setMonitoringSystem(JSON.parse(savedMonitoring))
        }

        const storedName = localStorage.getItem("solbot_user_name")
        if (storedName) {
          setUserName(storedName)
        }

        const storedSessionId = localStorage.getItem("session_id")
        if (storedSessionId) setSessionId(storedSessionId)

        setLoading(false)
      } catch (error) {
        console.error("Error loading saved data:", error)
        setLoading(false)
      }
    }

    loadSavedData()
  }, [])

  // Fix the handleTabChange function with proper type
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleDownloadSummary = () => {
    try {
      // Create a text summary of the entire learning system
      let summaryText = "SELF-REGULATED LEARNING SYSTEM SUMMARY\n\n"

      // Long-term goal
      summaryText += "LONG-TERM GOAL:\n"
      summaryText += `${learningPlan.longTermGoal || "Not specified"}\n\n`

      // Short-term goals
      summaryText += "SHORT-TERM OBJECTIVES:\n"
      if (learningPlan.shortTermGoals && learningPlan.shortTermGoals.length > 0) {
        learningPlan.shortTermGoals.forEach((goal, index) => {
          summaryText += `${index + 1}. ${goal.goal}\n`
          summaryText += `   Timeframe: ${goal.timeframe}\n`

          if (goal.actions && goal.actions.length > 0) {
            summaryText += "   Actions:\n"
            goal.actions.forEach((action) => {
              summaryText += `   - ${action}\n`
            })
          }

          if (goal.strategies && goal.strategies.length > 0) {
            summaryText += "   Learning Strategies:\n"
            goal.strategies.forEach((strategy) => {
              if (strategy) {
                summaryText += `   - ${strategy.name}: ${strategy.description}\n`
              }
            })
          }
          summaryText += "\n"
        })
      } else {
        summaryText += "No short-term goals specified.\n\n"
      }

      // Contingency plans
      summaryText += "CONTINGENCY PLANS:\n"
      if (learningPlan.ifThenStrategies && learningPlan.ifThenStrategies.length > 0) {
        learningPlan.ifThenStrategies.forEach((strategy, index) => {
          summaryText += `${index + 1}. IF ${strategy.challenge}\n   THEN ${strategy.response}\n\n`
        })
      } else {
        summaryText += "No contingency plans specified.\n\n"
      }

      // Monitoring system
      summaryText += "MONITORING SYSTEM:\n\n"

      // Progress indicators
      summaryText += "Progress Indicators:\n"
      if (monitoringSystem.progressIndicators && monitoringSystem.progressIndicators.length > 0) {
        monitoringSystem.progressIndicators.forEach((item, index) => {
          if (item.indicator) {
            summaryText += `${index + 1}. ${item.indicator}\n`
            summaryText += `   Measurement: ${item.measurementMethod}\n`
            summaryText += `   Frequency: ${item.frequency}\n`
          }
        })
      } else {
        summaryText += "No progress indicators specified.\n"
      }
      summaryText += "\n"

      // Check-in schedule
      summaryText += "Check-in Schedule:\n"
      if (monitoringSystem.checkIns && monitoringSystem.checkIns.length > 0) {
        monitoringSystem.checkIns.forEach((item, index) => {
          if (item.timing) {
            summaryText += `${index + 1}. ${item.timing}\n`
            summaryText += `   Purpose: ${item.purpose}\n`
          }
        })
      } else {
        summaryText += "No check-in schedule specified.\n"
      }
      summaryText += "\n"

      // Success criteria
      summaryText += "Success Criteria:\n"
      if (monitoringSystem.successCriteria && monitoringSystem.successCriteria.length > 0) {
        monitoringSystem.successCriteria.forEach((item, index) => {
          if (item.goal) {
            summaryText += `${index + 1}. Goal: ${item.goal}\n`
            summaryText += `   Criteria: ${item.criteria}\n`
            summaryText += `   Evidence: ${item.evidence}\n`
          }
        })
      } else {
        summaryText += "No success criteria specified.\n"
      }
      summaryText += "\n"

      // Adaptation triggers
      summaryText += "Adaptation Framework:\n"
      if (monitoringSystem.adaptationTriggers && monitoringSystem.adaptationTriggers.length > 0) {
        monitoringSystem.adaptationTriggers.forEach((item, index) => {
          if (item.trigger) {
            summaryText += `${index + 1}. IF ${item.trigger}\n   THEN ${item.response}\n`
          }
        })
      } else {
        summaryText += "No adaptation framework specified.\n"
      }
      summaryText += "\n"

      // Reflection prompts
      summaryText += "Reflection Prompts:\n"
      if (monitoringSystem.reflectionPrompts && monitoringSystem.reflectionPrompts.length > 0) {
        monitoringSystem.reflectionPrompts.forEach((prompt, index) => {
          if (prompt) {
            summaryText += `${index + 1}. ${prompt}\n`
          }
        })
      } else {
        summaryText += "No reflection prompts specified.\n"
      }

      // Create a blob and download it
      const blob = new Blob([summaryText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "self_regulated_learning_system.txt"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error creating summary:", error)
    }
  }

  const handleGoHome = () => {
    router.push("/")
  }

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim() || !sessionId) return;

    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          event_type: 'final_feedback',
          phase: '6',
          component: 'reflection',
          metadata: {
            feedback_text: feedback.trim(),
          },
        }),
      });
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen text-white py-8 flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #0f1719 0%, #24464a 100%)" }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-indigo-400">Loading your learning system summary...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen text-white py-8"
      style={{ background: "linear-gradient(180deg, #0f1719 0%, #2f6d73 100%)" }}
    >
      <div className="container mx-auto px-4">
        <ModuleBar currentPhase={6} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card className="bg-[rgba(20,30,36,0.8)] backdrop-blur-md border border-[rgba(159,226,222,0.35)] shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-3xl font-bold">
                <Medal className="mr-3 h-8 w-8 text-[#9fe2de]" />
                <span className="bg-gradient-to-r from-[#9fe2de] to-[#7fd9d3] bg-clip-text text-transparent">
                  Learning Journey Summary
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <SrlSummary />
              <SrlFeedback />
            </CardContent>
          </Card>
          <div className="text-center mt-6">
            <Button
              variant="outline"
              className="text-white/80 border-white/30 hover:bg-white/10"
              onClick={handleGoHome}
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

