"use client"

import { Brain, Target, BookMarked, ListTodo, TrendingUp, Medal } from 'lucide-react';

const srlSteps = [
  {
    phase: 1,
    title: "Plan & Analyze",
    icon: Target,
    description: "Understand the task and make a plan.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    phase: 2,
    title: "Implement Strategies",
    icon: BookMarked,
    description: "Use evidence-based methods to learn.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    phase: 3,
    title: "Monitor Progress",
    icon: TrendingUp,
    description: "Check your understanding as you go.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    phase: 4,
    title: "Reflect & Adapt",
    icon: Brain,
    description: "Adjust your approach based on what's working.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
];

export function SrlSummary() {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-center text-indigo-300">Your Self-Regulated Learning Blueprint</h3>
      <p className="text-center text-white/80 max-w-3xl mx-auto">
        Effective learning is a cycle you can control. Here is a summary of the core principles you've learned. Use this blueprint to approach any learning task more effectively.
      </p>
      <div className="bg-slate-800/50 p-6 rounded-lg border border-indigo-500/20">
        <div className="relative">
          {/* Circular path */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-64 h-64 border-2 border-dashed border-slate-600 rounded-full animate-spin-slow"></div>
          </div>
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-32 h-32 bg-slate-900 rounded-full border-2 border-indigo-500/50">
             <Medal className="h-8 w-8 text-indigo-400" />
            <p className="text-xs text-center text-white/80 mt-1">Your Learning System</p>
          </div>
          
          {/* Steps on the circle */}
          <div className="relative w-full h-96">
            {srlSteps.map((step, index) => {
              const angle = (index / srlSteps.length) * 2 * Math.PI - (Math.PI / 2); // Start from top
              const x = 50 + 40 * Math.cos(angle);
              const y = 50 + 40 * Math.sin(angle);
              return (
                <div 
                  key={step.phase} 
                  className="absolute"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`w-32 h-32 p-3 rounded-lg flex flex-col items-center justify-center text-center ${step.bg} border border-slate-700`}>
                    <step.icon className={`h-6 w-6 mb-1 ${step.color}`} />
                    <h4 className="font-semibold text-sm text-white">{step.title}</h4>
                    <p className="text-xs text-white/60">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 