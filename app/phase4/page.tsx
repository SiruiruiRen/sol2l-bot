"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, ArrowRight, CheckCircle, Map, Video, Edit, Bot, ChevronRight as ChevronRightIcon } from "lucide-react"
import ModuleBar from "@/components/module-bar"
import VideoPlayer from "@/components/video-player"

export default function Phase4IntroPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [mc_answer, setMcAnswer] = useState("");
  const [ii_answer, setIiAnswer] = useState("");

  useEffect(() => {
    try {
      const storedName = localStorage.getItem("solbot_user_name");
      if (storedName) setUserName(storedName);
      
      // We still check for session_id to maintain flow integrity
      const storedSessionId = localStorage.getItem("session_id");
      if (!storedSessionId) {
        console.warn("No session_id found, redirecting to intro.");
        router.push('/intro');
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      router.push('/intro');
    }
  }, [router]);

  const handleComplete = () => {
    router.push("/phase4/tasks")
  }

  const handleVideoComplete = () => {
    setVideoCompleted(true);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

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

      <ModuleBar currentPhase={4} />

      <div className="fixed top-0 left-0 right-0 z-20 bg-[rgba(28,20,35,0.9)] backdrop-blur-md border-b border-[rgba(217,199,255,0.35)] py-3 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <Target className="h-6 w-6 mr-2" style={{ color: phaseColor.accent }} />
            <h2 className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-[rgba(217,199,255,1)] to-[rgba(239,228,255,1)] bg-clip-text">
              Phase 4: Strategic Learning Plan
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card className="bg-[rgba(24,17,28,0.78)] backdrop-blur-md border" style={{ borderColor: phaseColor.cardBorder }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-center">
                <Target className="h-8 w-8" style={{ color: phaseColor.accent }} />
                <span className="bg-gradient-to-r from-[rgba(217,199,255,1)] to-[rgba(239,228,255,1)] bg-clip-text text-transparent">
                  Introduction to Strategic Planning
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div className="text-white/80 space-y-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-orange-500/20 mb-6 text-left">
                    <h3 className="text-lg font-medium text-orange-300 mb-3 flex items-center gap-2">
                      <Map className="h-5 w-5" />
                      Phase 4 Workflow
                    </h3>
                    <div className="flex items-center justify-center space-x-4 text-white/80">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 rounded-full bg-orange-500/20 mb-1">
                          <Video className="h-6 w-6 text-orange-300" />
                        </div>
                        <span className="text-xs font-medium">Watch Video</span>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-slate-600" />
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 rounded-full bg-orange-500/20 mb-1">
                          <Edit className="h-6 w-6 text-orange-300" />
                        </div>
                        <span className="text-xs font-medium">Build Plan</span>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-slate-600" />
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 rounded-full bg-orange-500/20 mb-1">
                          <Bot className="h-6 w-6 text-orange-300" />
                        </div>
                        <span className="text-xs font-medium">AI Coaching</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center">
                    Welcome {userName}! In this phase, we'll turn your learning intentions into a concrete strategic plan.
                  </p>

                  <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/20">
                    <h3 className="text-lg font-medium text-orange-300 mb-3">📋 What's in This Phase:</h3>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="text-orange-400 mt-0.5">🎥</div>
                        <p className="text-white/80"><span className="text-orange-300 font-medium">Video:</span> Learn the MCII technique (Mental Contrasting with Implementation Intentions)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="text-orange-400 mt-0.5">📝</div>
                        <p className="text-white/80"><span className="text-orange-300 font-medium">3 Strategic Tasks:</span> Long-term goals, SMART objectives, and contingency plans</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="text-orange-400 mt-0.5">🤖</div>
                        <p className="text-white/80"><span className="text-orange-300 font-medium">AI Coaching:</span> Personalized feedback to refine each task</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-white/80">
                    Set effective goals and plan for challenges using the MCII technique.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-center text-white/80">
                    Learn the MCII framework (Mental Contrasting with Implementation Intentions) to build an effective study plan.
                  </p>
                  <VideoPlayer
                    src="/video/SoL_phase4.mp4"
                    onComplete={handleVideoComplete}
                    phase="phase4"
                    videoTitle="MCII Framework for Strategic Planning"
                  />
                  <div className="mt-4 p-3 bg-slate-800/60 rounded-lg border border-cyan-500/30 text-center">
                    <p className="font-semibold text-cyan-300">After the video:</p>
                    <p className="text-white/80 text-sm">You will proceed to interactive tasks to build your strategic plan.</p>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-emerald-400 font-medium pt-2"
                >
                  <p>Great! Now you're ready to complete the 3 strategic planning tasks.</p>
                </motion.div>

                <div className="flex justify-end mt-8">
                  <Button 
                    className="bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white px-8 py-3 rounded-lg text-lg"
                    onClick={handleComplete}
                  >
                    Continue to Tasks <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 