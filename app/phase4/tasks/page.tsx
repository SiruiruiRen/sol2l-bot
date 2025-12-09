"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, ListTodo, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button" 
import ModuleBar from "@/components/module-bar"

export default function Phase4TasksPage() {
  const router = useRouter()
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    // On component mount, load completed tasks from localStorage
    const savedProgress = localStorage.getItem("solbot_phase4_completed_tasks");
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    }
  }, []);

  const tasks = [
    { id: 'long_term_goals', title: 'Long-Term Learning Goals', description: 'Define your big-picture learning objectives.', icon: Target, href: '/phase4/long_term_goals' },
    { id: 'short_term_goals', title: 'Short-Term SMART Objectives', description: 'Create specific, measurable steps.', icon: ListTodo, href: '/phase4/short_term_goals' },
    { id: 'contingency_strategies', title: 'Contingency Strategies', description: 'Develop "if-then" plans for obstacles.', icon: ShieldCheck, href: '/phase4/contingency_strategies' },
  ];

  const getNextTask = () => {
    return tasks.find(task => !completedTasks.includes(task.id));
  };

  const nextTask = getNextTask();

  const allTasksCompleted = completedTasks.length === tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <ModuleBar currentPhase={4} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-orange-400">Phase 4: Strategic Learning Plan</h2>
          <p className="mt-4 text-lg text-white/80">
            Let's build your strategic plan. Complete the following tasks in order to create a roadmap for your success.
          </p>

          <div className="mt-8 space-y-4 text-left">
            {tasks.map((task, index) => {
              const isCompleted = completedTasks.includes(task.id);
              const isNext = nextTask?.id === task.id;
              const isLocked = !isCompleted && !isNext;

              return (
                <Card key={task.id} className={`bg-slate-800/50 border-slate-700 transition-all ${isLocked ? 'opacity-50' : ''}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <task.icon className={`w-8 h-8 ${isCompleted ? 'text-green-500' : 'text-orange-400'}`} />
                      <div>
                        <h3 className={`font-semibold ${isCompleted ? 'text-white' : 'text-orange-300'}`}>{task.title}</h3>
                        <p className="text-sm text-white/70">{task.description}</p>
                      </div>
                    </div>
                    {isCompleted ? (
                      <div className="text-green-500 flex items-center gap-2">
                        <CheckCircle size={20} />
                        <span>Completed</span>
                      </div>
                    ) : isNext ? (
                      <Button onClick={() => router.push(task.href)} className="bg-orange-600 hover:bg-orange-700">
                        Start Task {index + 1}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
            
          {allTasksCompleted && (
             <div className="mt-8">
                <Button onClick={() => router.push('/phase5')} className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
                    Proceed to Phase 5
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
             </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}

