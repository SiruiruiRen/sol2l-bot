"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle, CheckCircle, Brain, BookMarked, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, HelpCircle, AlertCircle, ArrowRight, Map, FileQuestion, Video, MessageCircle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import VideoPlayer from "@/components/video-player"
import ModuleBar from "@/components/module-bar"
import { VerticalNav } from "@/components/vertical-nav"

// --- Helper function to log events ---
const logEvent = (sessionId: string, eventType: string, metadata: any) => {
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId,
      event_type: eventType,
      phase: '5',
      component: 'monitoring_adaptation',
      metadata: metadata,
    }),
  }).catch(error => console.error(`Failed to log event ${eventType}:`, error));
};

const KnowledgeCheckQuestion = ({ 
  question, 
  questionIndex, 
  totalQuestions, 
  onNextQuestion,
  sessionId,
}: { 
  question: any, 
  questionIndex: number, 
  totalQuestions: number, 
  onNextQuestion: () => void,
  sessionId: string | null,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const explanation = isCorrect ? question.explanation : (question.explanations && selectedOption ? question.explanations[selectedOption] : question.explanation);

  const handleSubmit = () => {
    if (!selectedOption) return;
    const correct = selectedOption === question.correctAnswer;
    setSubmitted(true);
    setIsCorrect(correct);
    if (correct && questionIndex === totalQuestions - 1) {
      onNextQuestion();
    }
    if (sessionId) {
      logEvent(sessionId, 'quiz_submission', {
        question_title: question.title,
        selected_answer: selectedOption,
        is_correct: correct,
        attempt_number: 1
      });
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <Card className="bg-slate-800/70 border-purple-500/20">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Knowledge Check {questionIndex + 1}</h3>
          </div>
          <span className="text-sm text-white/60">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
        </div>

        <p className="text-white/90 mb-6">{question.question}</p>

        <RadioGroup
          value={selectedOption || ""}
          onValueChange={setSelectedOption}
          className="space-y-3"
          disabled={submitted}
        >
          {question.options.map((option: string, index: number) => (
            <div
              key={index}
              className={`flex items-start space-x-2 rounded-lg border p-3 transition-colors ${
                submitted && option === question.correctAnswer
                  ? "border-emerald-500/50 bg-emerald-500/10"
                  : submitted && option === selectedOption
                    ? "border-red-500/50 bg-red-500/10"
                    : "border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/10"
              }`}
            >
              <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
              <div className="flex-1">
                <Label
                  htmlFor={`option-${index}`}
                  className={`text-sm font-medium ${
                    submitted && option === question.correctAnswer
                      ? "text-emerald-400"
                      : submitted && option === selectedOption
                        ? "text-red-400"
                        : "text-white/80"
                  }`}
                >
                  {option}
                </Label>
              </div>
              {submitted && option === question.correctAnswer && (
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
              )}
              {submitted && option === selectedOption && option !== question.correctAnswer && (
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
            </div>
          ))}
        </RadioGroup>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 p-4 rounded-lg ${
              isCorrect ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-red-500/20 border border-red-500/30"
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <h4 className={`font-bold ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                  {isCorrect ? "Correct!" : "Not quite right"}
                </h4>
                <p className="text-white/80 mt-1">{explanation}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <div>
            {!submitted ? (
              <Button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 disabled:opacity-50"
              >
                Submit Answer
              </Button>
            ) : !isCorrect ? (
              <Button
                onClick={handleTryAgain}
                variant="outline"
                className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300"
              >
                Try Again
              </Button>
            ) : null}
          </div>
          
          {submitted && isCorrect && (
            questionIndex < totalQuestions - 1 ? (
              <Button
                onClick={onNextQuestion}
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 shadow-lg"
              >
                Next Question <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="text-emerald-400 font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Quiz Completed!
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const KnowledgeCheckQuiz = ({ onComplete, knowledgeChecks, sessionId }: { onComplete: () => void, knowledgeChecks: any[], sessionId: string | null }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < knowledgeChecks.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete();
    }
  };

  const currentQuestion = knowledgeChecks[currentQuestionIndex];

  return (
    <KnowledgeCheckQuestion
      key={`question-${currentQuestionIndex}`}
      question={currentQuestion}
      questionIndex={currentQuestionIndex}
      totalQuestions={knowledgeChecks.length}
      onNextQuestion={handleNextQuestion}
      sessionId={sessionId}
    />
  );
};

export default function Phase5Content() {
  const router = useRouter()
  const [videoCompleted, setVideoCompleted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userName, setUserName] = useState("")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Define the cards for easy reference
  const cards = [
    { id: "intro", title: "Introduction to Monitoring" },
    { id: "knowledge-check", title: "Knowledge Check" },
    { id: "video", title: "Monitoring Your Learning Video" },
  ]

  // Function to navigate to the next card
  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  // Function to navigate to the previous card
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  // Load user name and session ID from localStorage
  useEffect(() => {
    try {
      const storedName = localStorage.getItem("solbot_user_name");
      if (storedName) setUserName(storedName);

      const storedSessionId = localStorage.getItem("session_id");
      if (storedSessionId) {
        setSessionId(storedSessionId);
      } else {
        // If there's no session ID, the user hasn't gone through onboarding.
        // For development, we'll allow access but log a warning.
        console.warn("No session_id found. Proceeding for development.");
        // router.push('/intro'); // This was causing the redirect
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      // In case of error, we'll still allow access for development.
      // router.push('/intro');
    }
  }, [router]);

  // Knowledge check questions
  const knowledgeChecks = [
    {
      id: 1,
      title: "Effective Learning Monitoring",
      question: "What does monitoring your learning effectively mean?",
      options: [
        "Adapt your learning to accommodate what you don't know",
        "Watching other students perform their learning task and following them",
        "Rereading textbook passages on all of the important topics",
        "Reread missed questions and their answer choices until you memorize the correct answer",
      ],
      correctAnswer: "Adapt your learning to accommodate what you don't know",
      explanation: "Effective monitoring is about self-assessment and adapting your strategies based on what you find is not working for you. It's an active process of checking your understanding and changing your approach accordingly.",
    },
    {
      id: 2,
      title: "Best Monitoring Strategy",
      question: "Which student monitors their learning the best?",
      options: [
        "Anish monitors what his friends are doing and tries to copy their learning strategies",
        "Bria rereads the textbook until the information is well memorized and understood",
        "Carrie continues to test herself with flashcards repetitively",
        "After Denise completes one self-test, she asks herself if she is retaining the information with this strategy.",
      ],
      correctAnswer: "After Denise completes one self-test, she asks herself if she is retaining the information with this strategy.",
      explanation: "Denise monitors her learning by asking herself if the self-testing she is completing is helping her learn the information or not. If it isn't she can choose a new strategy, but if it is, she can continue utilizing the same strategy.",
      explanations: {
        "Anish monitors what his friends are doing and tries to copy their learning strategies": "Anish should be monitoring himself rather than his friends as strategies that work for them might not work for him.",
        "Bria rereads the textbook until the information is well memorized and understood": "As we know, rereading the textbook is incredibly ineffective, but this strategy also does not help with monitoring your learning.",
        "Carrie continues to test herself with flashcards repetitively": "Using flashcards for memorization can be a helpful tool but with no sort of \"check-in\" involved, Carrie won't be able to see if flashcards is helping her study the most effectively, and adapt her ways if not."
      }
    },
  ]

  const handleCompleteVideo = () => {
    setVideoCompleted(true)
    if (sessionId) {
      logEvent(sessionId, 'video_watch_completed', { video_title: "Monitoring Your Learning" });
    }
  }

  const handleComplete = () => {
    router.push("/phase5/chat")
  }

  const phaseColor = {
    bg1: "#171108",
    bg2: "#4a422c",
    accent: "#f7e3a5",
    cardBorder: "rgba(247,227,165,0.35)",
    surface: "rgba(24,18,12,0.8)",
    pill: "rgba(247,227,165,0.15)",
  }

  return (
    <div
      className="min-h-screen text-white py-8"
      style={{ background: `linear-gradient(180deg, ${phaseColor.bg1} 0%, ${phaseColor.bg2} 100%)` }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_10%,rgba(247,227,165,0.08),transparent),radial-gradient(140%_120%_at_80%_20%,rgba(122,106,60,0.08),transparent),radial-gradient(160%_140%_at_50%_80%,rgba(247,227,165,0.05),transparent)]"></div>
      </div>

        <ModuleBar currentPhase={5} />

      <div className="fixed top-0 left-0 right-0 z-20 bg-[rgba(24,18,12,0.9)] backdrop-blur-md border-b border-[rgba(247,227,165,0.35)] py-3 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <Brain className="h-6 w-6 mr-2" style={{ color: phaseColor.accent }} />
            <h2 className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-[rgba(247,227,165,1)] to-[rgba(255,240,200,1)] bg-clip-text">
              Phase 5: Monitor & Adaptation
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <VerticalNav
          currentCardIndex={currentCardIndex}
          totalCards={cards.length}
          onPrev={prevCard}
          onNext={nextCard}
          isNextDisabled={(currentCardIndex === 1 && !quizCompleted) || (currentCardIndex === 2 && !videoCompleted)}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card className="bg-[rgba(24,18,12,0.8)] backdrop-blur-md border" style={{ borderColor: phaseColor.cardBorder }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-center">
                <Brain className="h-8 w-8" style={{ color: phaseColor.accent }} />
                <span className="bg-gradient-to-r from-[rgba(247,227,165,1)] to-[rgba(255,240,200,1)] bg-clip-text text-transparent">
                  {cards[currentCardIndex].title}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Introduction Card */}
              {currentCardIndex === 0 && (
                <div className="space-y-6">
                  <div
                    className="p-4 rounded-lg border mb-6 text-left"
                    style={{ backgroundColor: phaseColor.surface, borderColor: phaseColor.cardBorder }}
                  >
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2" style={{ color: phaseColor.accent }}>
                      <Map className="h-5 w-5" />
                      Phase 5 Workflow
                    </h3>
                    <div className="flex items-center justify-center space-x-4 text-white/85">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 rounded-full mb-1" style={{ backgroundColor: phaseColor.pill }}>
                          <FileQuestion className="h-6 w-6" style={{ color: phaseColor.accent }} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: phaseColor.accent }}>Pre-Assessment</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-500" />
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 rounded-full mb-1" style={{ backgroundColor: phaseColor.pill }}>
                          <Video className="h-6 w-6" style={{ color: phaseColor.accent }} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: phaseColor.accent }}>Watch Video</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-500" />
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 rounded-full mb-1" style={{ backgroundColor: phaseColor.pill }}>
                          <MessageCircle className="h-6 w-6" style={{ color: phaseColor.accent }} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: phaseColor.accent }}>Chat w/ SoL2LBot</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-white/80 space-y-4">
                    <p>
                      {userName ? `Welcome, ${userName}!` : "Welcome!"} This phase is about monitoring your learning and adapting your strategies.
                    </p>
                    <p>
                      Let's first check what you already know about this topic.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Knowledge Check Card */}
              {currentCardIndex === 1 && (
                <div>
                  <div className="text-white/80 mb-4">
                    <p>Let's check the knowledge you already have about this topic. Please read and respond to the following question(s):</p>
                  </div>
                  <KnowledgeCheckQuiz onComplete={() => setQuizCompleted(true)} knowledgeChecks={knowledgeChecks} sessionId={sessionId} />
                </div>
              )}

              {/* Video Card */}
              {currentCardIndex === 2 && (
                <div className="space-y-4 text-center">
                  <p className="text-white/80">
                    Learn effective strategies for monitoring your learning progress and adapting when needed.
                  </p>
                  
                  <VideoPlayer
                    src="/video/SoL_phase5.mp4"
                    onComplete={handleCompleteVideo}
                    phase="phase5"
                    videoTitle="Monitoring Your Learning"
                  />
                  <div className="mt-4 p-3 bg-slate-800/60 rounded-lg border border-amber-500/30 text-center">
                    <p className="font-semibold text-amber-300">After the video:</p>
                    <p className="text-white/80 text-sm">You will proceed to an interactive chat with SoL2LBot.</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {currentCardIndex > 0 ? (
                  <Button 
                    variant="outline"
                    className="text-purple-400 border-purple-500/30 hover:bg-purple-900/20"
                    onClick={prevCard}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                  </Button>
                ) : <div></div>}
                
                {currentCardIndex < cards.length - 1 ? (
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                    onClick={nextCard}
                    disabled={currentCardIndex === 1 && !quizCompleted}
                  >
                    {currentCardIndex < cards.length - 1 ? 'Next' : 'Complete Phase'} <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white px-6 py-2 rounded-lg"
                    onClick={handleComplete}
                  >
                    Continue to Chat <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 