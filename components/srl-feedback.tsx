"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Star } from "lucide-react"

export function SrlFeedback() {
  const [ratings, setRatings] = useState({
    usefulness: 0,
    satisfaction: 0,
    recommendation: 0,
  });
  const [feedback, setFeedback] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  useState(() => {
    const storedSessionId = localStorage.getItem("session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  });

  const handleRating = (question: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [question]: value }));
  };

  const handleFeedbackSubmit = async () => {
    if (!sessionId) return;

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
            ratings,
            feedback_text: feedback.trim(),
          },
        }),
      });
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  return (
    <div className="bg-slate-800/70 p-6 rounded-lg border border-indigo-500/30 mt-8">
      <h3 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
        <Star className="h-5 w-5" />
        Final Feedback
      </h3>
      
      {feedbackSubmitted ? (
        <div className="text-center text-emerald-400 font-medium py-4">
          Thank you for your feedback!
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-white/80">How useful were the learning strategies presented?</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(value => (
                <button key={value} onClick={() => handleRating('usefulness', value)} className={`p-2 rounded ${ratings.usefulness >= value ? 'bg-amber-500' : 'bg-slate-700'} hover:bg-amber-400`}>
                  <Star className="h-5 w-5 text-white" />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white/80">How satisfied are you with your overall experience?</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(value => (
                <button key={value} onClick={() => handleRating('satisfaction', value)} className={`p-2 rounded ${ratings.satisfaction >= value ? 'bg-amber-500' : 'bg-slate-700'} hover:bg-amber-400`}>
                  <Star className="h-5 w-5 text-white" />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white/80">How likely are you to recommend this training to others?</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(value => (
                <button key={value} onClick={() => handleRating('recommendation', value)} className={`p-2 rounded ${ratings.recommendation >= value ? 'bg-amber-500' : 'bg-slate-700'} hover:bg-amber-400`}>
                  <Star className="h-5 w-5 text-white" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/80 mb-2">Additional comments or feedback (optional):</p>
            <div className="flex items-center gap-2">
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Type your feedback here..."
                className="bg-slate-800 border-indigo-500/30 focus:border-indigo-400 text-white flex-grow"
                rows={3}
              />
            </div>
          </div>
          <div className="text-right">
            <Button onClick={handleFeedbackSubmit} disabled={Object.values(ratings).some(r => r === 0)}>
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 