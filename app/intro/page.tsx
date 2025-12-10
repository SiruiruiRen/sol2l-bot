"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BrainCircuit, 
  Target, 
  LineChart, 
  BookMarked, 
  Medal, 
  Sparkles, 
  Compass, 
  Flag, 
  ListTodo, 
  TrendingUp, 
  Bot, 
  ArrowRight 
} from "lucide-react"
import ModuleBar from "@/components/module-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const phaseInfo = [
  {
    id: 1,
    title: "Phase 1: What's SRL",
    description: "Understand the self-regulated learning framework.",
    icon: BrainCircuit,
    path: "/phase1",
    colors: { bg: "#243147", bg2: "#2c3e59", accent: "#7DB3FF", icon: "#3c5376" },
  },
  {
    id: 2,
    title: "Phase 2: Understand Your Tasks",
    description: "Define learning objectives and identify resources.",
    icon: Target,
    path: "/phase2",
    colors: { bg: "#2f4a44", bg2: "#386254", accent: "#6ED3A0", icon: "#3f6b5a" },
  },
  {
    id: 3,
    title: "Phase 3: Effective Learning Strategies",
    description: "Discover evidence-based learning techniques.",
    icon: BookMarked,
    path: "/phase3",
    colors: { bg: "#4f3a36", bg2: "#5c433d", accent: "#F5A97A", icon: "#80523e" },
  },
  {
    id: 4,
    title: "Phase 4: Achieve Your Goals",
    description: "Create a structured plan with specific goals.",
    icon: ListTodo,
    path: "/phase4",
    colors: { bg: "#46385c", bg2: "#554470", accent: "#C6B0F5", icon: "#6f568c" },
  },
  {
    id: 5,
    title: "Phase 5: Monitor Your Learning",
    description: "Build a system to track your progress and adjust.",
    icon: TrendingUp,
    path: "/phase5",
    colors: { bg: "#4a422c", bg2: "#5c5035", accent: "#F0D17B", icon: "#7a6a3c" },
  },
  {
    id: 6,
    title: "Phase 6: Learning Journey Summary",
    description: "Review your complete learning system.",
    icon: Medal,
    path: "/phase6",
    colors: { bg: "#24464a", bg2: "#2f6d73", accent: "#74D1CC", icon: "#2f6d73" },
  },
]

export default function IntroPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userYear, setUserYear] = useState("")
  const [userMajor, setUserMajor] = useState("")
  const [challengingCourse, setChallengingCourse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Clear previous session data for a clean start
    try {
      localStorage.removeItem("solbot_phase4_completed_tasks")
      localStorage.removeItem("solbot_long_term_goal")
      // Add any other keys that should be cleared for a new user
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
    // Try to retrieve user info from localStorage to pre-fill the form
    try {
      const storedName = localStorage.getItem("solbot_user_name")
      if (storedName) setUserName(storedName)
      const storedEmail = localStorage.getItem("solbot_user_email")
      if (storedEmail) setUserEmail(storedEmail)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  const handleSubmit = async () => {
    if (!userName || !userEmail) {
      alert("Please enter your name and email to begin.")
      return
    }
    setIsSubmitting(true)

    // 1. Collect all profile data
    const profile_data = {
      year: userYear,
      major: userMajor,
      challenging_course: challengingCourse,
    };

    try {
      // 2. Send data to the new onboarding endpoint
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          profile_data: profile_data,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.detail || "Failed to start session.");
      }
      
      // 3. Save the new session_id and user_id to localStorage
      localStorage.setItem("session_id", result.data.session_id);
      localStorage.setItem("user_id", result.data.user_id);
      
      // Also save name for easy display on other pages
      localStorage.setItem("solbot_user_name", userName);

      // 4. Navigate to the next phase
      router.push("/phase1");

    } catch (error) {
      console.error("Onboarding failed:", error);
      alert(`There was an error starting your session: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsSubmitting(false);
    }
  }

  const handleStart = () => {
    router.push("/phase1")
  }

  const handlePhaseClick = (path: string, phaseIndex: number) => {
    // For now, allow navigation to any phase.
    // In production, you might want to lock future phases.
    router.push(path)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-indigo-900 text-white py-8">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>

          {/* Nebula effect with indigo tone */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-30"></div>
        </div>

        {/* Add Module Bar */}
        <ModuleBar currentPhase={0} />

        {/* Fixed Title Header */}
        <div className="fixed top-0 left-0 right-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-indigo-500/20 py-3 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
              <Compass className="h-7 w-7 text-indigo-500 mr-2" />
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                Welcome to SoL2LBot
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
            <Card className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 shadow-xl mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-center">
                  <Compass className="h-8 w-8 text-indigo-500" />
                  <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                    Welcome to SoL2LBot
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                {/* Academic Header */}
                <div className="text-center space-y-4 mb-8">
                  <h2 className="text-2xl font-semibold text-white">
                    Science of Learning to Learn Training Program
                  </h2>
                  <p className="text-lg text-white/90 max-w-3xl mx-auto">
                    This research-based intervention teaches evidence-backed learning strategies to improve academic performance and study efficiency.
                  </p>
                </div>

                {/* Research Background */}
                <div className="bg-slate-800/50 p-5 rounded-lg border border-indigo-500/20 mb-6">
                  <h3 className="text-lg font-semibold text-indigo-300 mb-3">Research Background</h3>
                  <p className="text-white/80 mb-4">
                    Many students struggle with ineffective study methods, leading to poor grades despite significant time investment. 
                    This intervention addresses these challenges through scientifically-validated learning techniques.
                  </p>
                  
                  {/* Problem Questions */}
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-red-500/20 mb-4">
                    <h4 className="text-red-300 font-medium mb-3">Common Learning Challenges:</h4>
                    <div className="space-y-2">
                      <p className="text-white/80 text-sm">• Are you getting lower grades than you'd like, even when you study hard?</p>
                      <p className="text-white/80 text-sm">• Do you spend too much time studying without seeing the results you want?</p>
                      <p className="text-white/80 text-sm">• Do you forget what you've learned shortly after studying it?</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                      <h4 className="text-blue-300 font-medium mb-1">Evidence Base</h4>
                      <p className="text-sm text-white/80">Grounded in educational psychology and cognitive science research</p>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded border border-green-500/20">
                      <h4 className="text-green-300 font-medium mb-1">Proven Outcomes</h4>
                      <p className="text-sm text-white/80">Demonstrated improvements in academic performance and learning efficiency</p>
                    </div>
                  </div>
                </div>

                {/* Intervention Structure */}
                <div className="bg-[rgba(19,26,38,0.85)] p-5 rounded-2xl border border-white/10 mb-6 shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Intervention Structure</h3>
                    <div className="text-sm text-white/70">One color = one phase</div>
                  </div>
                  <p className="text-white/80 mb-5">
                    Six sequential phases with videos, knowledge checks, and AI-guided reflection. Click any phase to jump in.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {phaseInfo.map((phase, index) => (
                      <motion.div
                        key={phase.path}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        onClick={() => router.push(phase.path)}
                        className="group relative rounded-2xl border border-white/10 p-4 cursor-pointer overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${phase.colors.bg}, ${phase.colors.bg2})`,
                          boxShadow: "0 18px 36px rgba(0,0,0,0.35)",
                        }}
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: `radial-gradient(circle at 20% 20%, ${phase.colors.accent}, transparent 45%)` }}></div>
                        <div className="flex items-start gap-3">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_10px_22px_rgba(0,0,0,0.35)]"
                            style={{ backgroundColor: phase.colors.icon }}
                          >
                            <phase.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white">{phase.title}</h4>
                            <p className="text-sm text-white/80">{phase.description}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button
                            size="sm"
                            className="px-4 py-2 text-sm font-semibold"
                            style={{
                              backgroundColor: phase.colors.accent,
                              color: "#102033",
                              boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                            }}
                          >
                            Start
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Coaching System */}
                <div className="bg-slate-800/50 p-5 rounded-lg border border-indigo-500/20 mb-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">AI-Guided Learning Support</h3>
                  <p className="text-white/80 mb-4">
                    SoL2LBot provides adaptive feedback and personalized guidance throughout the intervention. 
                    The system uses natural language processing to assess responses and provide targeted support.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-purple-900/20 p-3 rounded border border-purple-500/20">
                      <h4 className="text-purple-300 font-medium mb-1">Adaptive Assessment</h4>
                      <p className="text-sm text-white/80">Iterative feedback system allowing multiple revision attempts until mastery</p>
                    </div>
                    <div className="bg-indigo-900/20 p-3 rounded border border-indigo-500/20">
                      <h4 className="text-indigo-300 font-medium mb-1">Self-Paced Progression</h4>
                      <p className="text-sm text-white/80">Flexible advancement allowing participants to proceed when ready</p>
                    </div>
                  </div>
                </div>

                {/* Participant Information */}
                <div className="bg-slate-800/70 p-6 rounded-lg border border-indigo-500/30">
                  <h3 className="text-xl font-medium text-indigo-300 mb-4">Participant Information</h3>
                  <p className="text-white/80 mb-6">
                    Please provide the following information to begin the intervention. This data will be used for research purposes 
                    and will be kept confidential in accordance with research ethics protocols.
                  </p>
                  
                  {isClient ? (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
                        <Input
                          id="name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                        <Input
                          id="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year" className="text-white font-medium">Academic Level</Label>
                        <Select value={userYear} onValueChange={setUserYear}>
                          <SelectTrigger className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white">
                            <SelectValue placeholder="Select academic level" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 text-white border-indigo-500/30">
                            <SelectItem value="Freshman">Undergraduate - Freshman</SelectItem>
                            <SelectItem value="Sophomore">Undergraduate - Sophomore</SelectItem>
                            <SelectItem value="Junior">Undergraduate - Junior</SelectItem>
                            <SelectItem value="Senior">Undergraduate - Senior</SelectItem>
                            <SelectItem value="Master">Graduate - Master's</SelectItem>
                            <SelectItem value="PhD">Graduate - Doctoral</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="major" className="text-white font-medium">Field of Study</Label>
                        <Input
                          id="major"
                          value={userMajor}
                          onChange={(e) => setUserMajor(e.target.value)}
                          className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white"
                          placeholder="Enter your major or field"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="course" className="text-white font-medium">Current Course or Research Project</Label>
                      <Input
                        id="course"
                        value={challengingCourse}
                        onChange={(e) => setChallengingCourse(e.target.value)}
                        className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white"
                        placeholder="Enter your current course or research project"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting || !userName || !userEmail || !challengingCourse}
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Initializing intervention session...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          Begin Learning Intervention
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </div>
                  ) : (
                    <div className="flex items-center justify-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Add subtle animated gradient background */}
        <div className="fixed inset-0 -z-20 opacity-25 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-blue-900/20 animate-pulse" style={{ animationDuration: '8s' }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-indigo-900 text-white py-8">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>

        {/* Nebula effect with indigo tone */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-30"></div>
      </div>

      {/* Add Module Bar */}
      <ModuleBar currentPhase={0} />

      {/* Fixed Title Header */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-indigo-500/20 py-3 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <Compass className="h-7 w-7 text-indigo-500 mr-2" />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                    Welcome to SoL2LBot
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
          <Card className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 shadow-xl mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-center">
                <Compass className="h-8 w-8 text-indigo-500" />
                <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                  Welcome to SoL2LBot
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Academic Header */}
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-2xl font-semibold text-white">
                  Science of Learning to Learn Training Program
                </h2>
                <p className="text-lg text-white/90 max-w-3xl mx-auto">
                  This research-based intervention teaches evidence-backed learning strategies to improve academic performance and study efficiency.
                </p>
              </div>

              {/* Research Background */}
              <div className="bg-slate-800/50 p-5 rounded-lg border border-indigo-500/20 mb-6">
                <h3 className="text-lg font-semibold text-indigo-300 mb-3">Research Background</h3>
                <p className="text-white/80 mb-4">
                  Many students struggle with ineffective study methods, leading to poor grades despite significant time investment. 
                  This intervention addresses these challenges through scientifically-validated learning techniques.
                </p>
                
                {/* Problem Questions */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-red-500/20 mb-4">
                  <h4 className="text-red-300 font-medium mb-3">Common Learning Challenges:</h4>
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm">• Are you getting lower grades than you'd like, even when you study hard?</p>
                    <p className="text-white/80 text-sm">• Do you spend too much time studying without seeing the results you want?</p>
                    <p className="text-white/80 text-sm">• Do you forget what you've learned shortly after studying it?</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                    <h4 className="text-blue-300 font-medium mb-1">Evidence Base</h4>
                    <p className="text-sm text-white/80">Grounded in educational psychology and cognitive science research</p>
                  </div>
                  <div className="bg-green-900/20 p-3 rounded border border-green-500/20">
                    <h4 className="text-green-300 font-medium mb-1">Proven Outcomes</h4>
                    <p className="text-sm text-white/80">Demonstrated improvements in academic performance and learning efficiency</p>
                  </div>
                </div>
              </div>

              {/* Intervention Structure */}
              <div className="bg-[rgba(19,26,38,0.85)] p-5 rounded-2xl border border-white/10 mb-6 shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Intervention Structure</h3>
                  <div className="text-sm text-white/70">One color = one phase</div>
                </div>
                <p className="text-white/80 mb-5">
                  Six sequential phases with videos, knowledge checks, and AI-guided reflection. Click any phase to jump in.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {phaseInfo.map((phase, index) => (
                    <motion.div
                      key={phase.path}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      onClick={() => router.push(phase.path)}
                      className="group relative rounded-2xl border border-white/10 p-4 cursor-pointer overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${phase.colors.bg}, ${phase.colors.bg2})`,
                        boxShadow: "0 18px 36px rgba(0,0,0,0.35)",
                      }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: `radial-gradient(circle at 20% 20%, ${phase.colors.accent}, transparent 45%)` }}></div>
                      <div className="flex items-start gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_10px_22px_rgba(0,0,0,0.35)]"
                          style={{ backgroundColor: phase.colors.icon }}
                        >
                          <phase.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white">{phase.title}</h4>
                          <p className="text-sm text-white/80">{phase.description}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button
                          size="sm"
                          className="px-4 py-2 text-sm font-semibold"
                          style={{
                            backgroundColor: phase.colors.accent,
                            color: "#102033",
                            boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                          }}
                        >
                          Start
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Coaching System */}
              <div className="bg-slate-800/50 p-5 rounded-lg border border-indigo-500/20 mb-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">AI-Guided Learning Support</h3>
                <p className="text-white/80 mb-4">
                  SoLBot provides adaptive feedback and personalized guidance throughout the intervention. 
                  The system uses natural language processing to assess responses and provide targeted support.
                </p>
                <div className="space-y-4">
                  <div className="bg-purple-900/20 p-3 rounded border border-purple-500/20">
                    <h4 className="text-purple-300 font-medium mb-1">Adaptive Assessment</h4>
                    <p className="text-sm text-white/80">Iterative feedback system allowing multiple revision attempts until mastery</p>
                  </div>
                  <div className="bg-indigo-900/20 p-3 rounded border border-indigo-500/20">
                    <h4 className="text-indigo-300 font-medium mb-1">Self-Paced Progression</h4>
                    <p className="text-sm text-white/80">Flexible advancement allowing participants to proceed when ready</p>
                  </div>
                </div>
              </div>

              {/* Participant Information */}
              <div className="bg-slate-800/70 p-6 rounded-lg border border-indigo-500/30">
                <h3 className="text-xl font-medium text-indigo-300 mb-4">Participant Information</h3>
                <p className="text-white/80 mb-6">
                  Please provide the following information to begin the intervention. This data will be used for research purposes 
                  and will be kept confidential in accordance with research ethics protocols.
                </p>
                
                {isClient ? (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
                      <Input
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                      <Input
                        id="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-white font-medium">Academic Level</Label>
                      <Select value={userYear} onValueChange={setUserYear}>
                        <SelectTrigger className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white">
                          <SelectValue placeholder="Select academic level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 text-white border-indigo-500/30">
                          <SelectItem value="Freshman">Undergraduate - Freshman</SelectItem>
                          <SelectItem value="Sophomore">Undergraduate - Sophomore</SelectItem>
                          <SelectItem value="Junior">Undergraduate - Junior</SelectItem>
                          <SelectItem value="Senior">Undergraduate - Senior</SelectItem>
                          <SelectItem value="Master">Graduate - Master's</SelectItem>
                          <SelectItem value="PhD">Graduate - Doctoral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="major" className="text-white font-medium">Field of Study</Label>
                      <Input
                        id="major"
                        value={userMajor}
                        onChange={(e) => setUserMajor(e.target.value)}
                        className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white"
                        placeholder="Enter your major or field"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="course" className="text-white font-medium">Current Course or Research Project</Label>
                    <Input
                      id="course"
                      value={challengingCourse}
                      onChange={(e) => setChallengingCourse(e.target.value)}
                      className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white"
                      placeholder="Enter your current course or research project"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting || !userName || !userEmail || !challengingCourse}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Initializing intervention session...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Begin Learning Intervention
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
                ) : (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Add subtle animated gradient background */}
      <div className="fixed inset-0 -z-20 opacity-25 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-blue-900/20 animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>
    </div>
  )
}

