"use client"

import { useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, PlayCircle, VideoIcon, MoveRight, CheckCircle, Bot, Sparkles, MessageSquare, User, ArrowRight, Send, Youtube, FileQuestion, CheckCircle2, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Map, Video } from "lucide-react"
import { motion } from "framer-motion"
import ModuleBar from "@/components/module-bar"
import VideoPlayer from "@/components/video-player"
import SolBotChat from "@/components/solbot-chat"
import { Textarea } from "@/components/ui/textarea"
import { v4 as uuidv4 } from 'uuid'
import React from "react"
import { useSessionManager } from "@/lib/session-manager"

export default function Phase1Content() {
  const router = useRouter()
  const { getOrCreateSession, isFallbackSession } = useSessionManager()
  const [videoWatched, setVideoWatched] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const [quizStarted, setQuizStarted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userName, setUserName] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [stageAnswers, setStageAnswers] = useState(["", "", "", ""])
  const [answersSubmitted, setAnswersSubmitted] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [sessionReady, setSessionReady] = useState(false)

  // Define the cards for easy reference
  const cards = [
    { id: "video", title: "Understanding Self-Regulated Learning" },
    { id: "quiz", title: "Knowledge Check" },
  ]

  // Function to navigate to the next card
  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else {
      // If we're on the last card, complete the phase
      handleComplete()
    }
  }

  // Function to navigate to the previous card
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }
  
  // Function to handle video completion
  const handleVideoComplete = () => {
    setVideoWatched(true)
    // Save to localStorage that user has watched the video
    try {
      const stateToSave = {
        ...JSON.parse(localStorage.getItem(`solbot_phase1_state`) || '{}'),
        videoWatched: true
      }
      localStorage.setItem(`solbot_phase1_state`, JSON.stringify(stateToSave))
    } catch (error) {
      console.error(`Error saving video watched state:`, error)
    }
  }

  // Load user name from localStorage
  useEffect(() => {
    try {
      const storedName = localStorage.getItem("solbot_user_name")
      if (storedName) {
        setUserName(storedName)
      }
      
      // Scroll to the top when component mounts
      window.scrollTo(0, 0)
      
      // Reset video watched state to ensure proper minimum watch time tracking
      // Previous localStorage state is ignored to enforce new watch time requirements
      setVideoWatched(false)
    } catch (error) {
      console.error("Error loading user name:", error)
    }
  }, [])

  // Initialize session with robust fallback
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const sessionData = await getOrCreateSession()
        setUserId(sessionData.user_id)
        setSessionId(sessionData.session_id)
        setUserName(sessionData.user_name)
        setSessionReady(true)

        // Show info message if this is a fallback session
        if (isFallbackSession()) {
          console.log('Using fallback session - user accessed app directly without onboarding')
        }
      } catch (error) {
        console.error('Session initialization failed:', error)
        // Even if session fails, allow app usage with temporary session
        setSessionReady(true)
      }
    }

    initializeSession()
  }, [])

  const handleWatchVideo = () => {
    setQuizStarted(true)
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    
    if (option === "Planning, Monitoring, Controlling, Reflecting") {
      setFeedback("🎉 Correct! These four stages form the complete self-regulated learning cycle that expert learners use to master complex material.")
      setQuizCompleted(true)
    } else {
      setFeedback("Not quite. Review the stages of the self-regulated learning cycle and try again.")
    }
  }

  const handleStageAnswerChange = (index: number, value: string) => {
    const newAnswers = [...stageAnswers];
    newAnswers[index] = value;
    setStageAnswers(newAnswers);
  }
  
  const handleAnswersSubmit = () => {
    setAnswersSubmitted(true);
    setQuizCompleted(true);
    setFeedback("Great job identifying the four stages of self-regulated learning! These stages will help you become a more effective learner.");
  }

  const handleComplete = () => {
    // Save completion to localStorage
    try {
      localStorage.setItem("solbot_phase1_completed", "true")
    } catch (error) {
      console.error("Error saving completion status:", error)
    }
    
    // Navigate to the next phase
    router.push("/phase2")
  }

  const QuizComponent = () => {
    // Move state inside the component to prevent parent re-renders
    const [localAnswers, setLocalAnswers] = useState(stageAnswers);
    
    // Only update parent state when submitting
    const handleLocalChange = (index: number, value: string) => {
      const newAnswers = [...localAnswers];
      newAnswers[index] = value;
      setLocalAnswers(newAnswers);
    };
    
    const handleSubmit = () => {
      // Update parent state
      setStageAnswers(localAnswers);
      setAnswersSubmitted(true);
      setQuizCompleted(true);
      setFeedback("Great job identifying the four stages of self-regulated learning! These stages will help you become a more effective learner.");
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-lg border border-indigo-500/30 mt-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <FileQuestion className="h-6 w-6 text-indigo-400" />
          <h3 className="text-xl font-medium text-white">Knowledge Check</h3>
        </div>
        
        <div className="mb-6">
          <p className="text-white/90 mb-3">List all stages of the four-stage model of self-regulated learning:</p>
          <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/20 mb-4">
            <div className="flex items-start gap-2 mb-2">
              <div className="text-indigo-400 mt-0.5">💡</div>
              <p className="text-white/80"><span className="text-indigo-300 font-medium">Remember:</span> Self-testing helps you remember information longer, find gaps in your knowledge, and improves future studying.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="text-indigo-400 mt-0.5">🧠</div>
              <p className="text-white/80">Actively recalling information now creates stronger neural connections that make it easier to retrieve later!</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 border border-indigo-500/30 bg-indigo-900/20 text-left w-24"></th>
                <th className="p-3 border border-indigo-500/30 bg-indigo-900/20 text-left">{answersSubmitted ? "Your Answers:" : "Your Response:"}</th>
                {answersSubmitted && (
                  <th className="p-3 border border-indigo-500/30 bg-indigo-900/20 text-left">Sample Answers:</th>
                )}
              </tr>
            </thead>
            <tbody>
              {["Stage 1:", "Stage 2:", "Stage 3:", "Stage 4:"].map((stage, index) => (
                <tr key={stage} className="border-b border-indigo-500/20">
                  <td className="p-3 border-r border-indigo-500/30 font-medium">{stage}</td>
                  <td className="p-3 border-r border-indigo-500/30">
                    {answersSubmitted ? (
                      <div className="text-white">{stageAnswers[index]}</div>
                    ) : (
                      <input
                        type="text"
                        value={localAnswers[index]}
                        onChange={(e) => handleLocalChange(index, e.target.value)}
                        placeholder={`Enter ${stage.replace(':', '')} here`}
                        className="w-full bg-slate-700/50 border border-indigo-500/30 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    )}
                  </td>
                  {answersSubmitted && (
                    <td className="p-3 text-indigo-300">
                      {index === 0 && "Define the task"}
                      {index === 1 && "Set goals and develop a plan"}
                      {index === 2 && "Execute the plan"}
                      {index === 3 && "Monitor your learning (and adapt if needed)"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {!answersSubmitted && (
          <Button
            onClick={handleSubmit}
            disabled={localAnswers.some(answer => !answer.trim())}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md flex items-center gap-2"
          >
            Submit Answers
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
        
        {feedback && answersSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 rounded-md bg-green-800/20 border border-green-600/40"
          >
            <p className="text-white">{feedback}</p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div
      className="min-h-screen text-white/95 py-8"
      style={{ background: "linear-gradient(180deg, #111827 0%, #2c3e59 100%)" }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_10%,rgba(148,163,184,0.08),transparent),radial-gradient(120%_120%_at_85%_15%,rgba(168,85,247,0.08),transparent),radial-gradient(140%_120%_at_50%_80%,rgba(251,211,141,0.08),transparent)]"></div>
      </div>

      <div className="container mx-auto px-4">
        <ModuleBar currentPhase={1} />

        {/* Show loading while session initializes */}
        {!sessionReady ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-white/80">Initializing session...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Fixed Title Header */}
            <div className="fixed top-0 left-0 right-0 z-20 bg-[rgba(23,35,52,0.9)] backdrop-blur-md border-b border-[rgba(159,197,255,0.25)] py-3 px-4">
              <div className="container mx-auto">
                <div className="flex items-center justify-center">
                  <BrainCircuit className="h-6 w-6 mr-2" style={{ color: "#9fc5ff" }} />
                  <h2 className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-[#9fc5ff] to-[#b7d6ff] bg-clip-text">
                    Phase 1: What's SRL
                  </h2>
                </div>
              </div>
            </div>

            {/* Card navigation indicators */}
            <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-2">
              <button 
                onClick={prevCard}
                disabled={currentCardIndex === 0}
                className={`rounded-full p-2 transition-all ${currentCardIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100 bg-slate-700/50 hover:bg-slate-700/80'}`}
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              
              {/* Card indicators */}
              <div className="flex flex-col items-center gap-1.5">
                {cards.map((_, i) => (
                  <div 
                    key={i}
                    className={`rounded-full transition-all ${i === currentCardIndex ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`}
                    onClick={() => setCurrentCardIndex(i)}
                  ></div>
                ))}
              </div>
              
              <button 
                onClick={nextCard}
                disabled={currentCardIndex === cards.length - 1}
                className={`rounded-full p-2 transition-all ${currentCardIndex === cards.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100 bg-slate-700/50 hover:bg-slate-700/80'}`}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto mt-16"
            >
              <Card className="border border-white/10 bg-[rgba(23,30,40,0.82)] shadow-[0_14px_36px_rgba(0,0,0,0.35)]">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-center">
                    <BrainCircuit className="h-8 w-8 text-indigo-500" />
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                      {cards[currentCardIndex].title}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {/* Video Component */}
                  {currentCardIndex === 0 && (
                    <div className="space-y-4 text-center">
                      <div className="bg-[rgba(20,26,36,0.8)] p-4 rounded-2xl border border-white/10 mb-6 text-left shadow-[0_10px_26px_rgba(0,0,0,0.3)]">
                        <h3 className="text-lg font-medium text-indigo-300 mb-3 flex items-center gap-2">
                          <Map className="h-5 w-5" />
                          Phase 1 Workflow
                        </h3>
                        <div className="flex items-center justify-center space-x-4 text-white/80">
                          <div className="flex flex-col items-center text-center">
                            <div className="p-2 rounded-full bg-indigo-500/20 mb-1">
                              <Video className="h-6 w-6 text-indigo-300" />
                            </div>
                            <span className="text-xs font-medium">Watch Video</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-600" />
                          <div className="flex flex-col items-center text-center">
                            <div className="p-2 rounded-full bg-indigo-500/20 mb-1">
                              <FileQuestion className="h-6 w-6 text-indigo-300" />
                            </div>
                            <span className="text-xs font-medium">Knowledge Check</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-white/80">
                        Learn the Self-Regulated Learning (SRL) cycle - a powerful framework for mastering any subject.
                      </p>
                      
                      <VideoPlayer
                        src="/video/SoL_phase1.mp4"
                        onComplete={handleVideoComplete}
                        startTime={0}
                        phase="phase1"
                        videoTitle="Self-Regulated Learning Introduction"
                      />

                      <div className="mt-4 p-3 bg-[rgba(20,26,36,0.8)] rounded-2xl border border-white/10 text-center shadow-[0_10px_26px_rgba(0,0,0,0.3)]">
                        <p className="font-semibold text-indigo-300">After the video:</p>
                        <p className="text-white/80 text-sm">You will proceed to a Knowledge Check.</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Quiz Component */}
                  {currentCardIndex === 1 && (
                    <div>
                      <div className="text-white/80 mb-4">
                        <p>Let's check your understanding of the Self-Regulated Learning framework.</p>
                      </div>
                      {quizStarted ? <QuizComponent /> : (
                        <div className="text-center py-6">
                          <Button
                            onClick={handleStartQuiz}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md"
                          >
                            Start Knowledge Check
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between pt-2">
                  {currentCardIndex > 0 ? (
                    <Button 
                      onClick={prevCard}
                      variant="outline" 
                      className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-950/50"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" /> Back
                    </Button>
                  ) : <div></div>} {/* Empty div for spacing */}
                  
                  <Button 
                    onClick={nextCard}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                    disabled={currentCardIndex === 1 && !quizCompleted}
                  >
                    {currentCardIndex < cards.length - 1 ? 'Next' : 'Complete Phase'} <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

