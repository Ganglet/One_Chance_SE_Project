"use client";


import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Users, Trophy, BarChart3, Zap, Clock, UserCheck, ShieldCheck, Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, User } from "lucide-react";

export default function DashboardRoute() {
  const [joinCode, setJoinCode] = useState("");
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const tiltRef = useRef<HTMLDivElement>(null);

  // Dashboard is host-only in this app. Keep role constant to avoid search params.
  const role = "host";


  // 3D tilt effect handlers (same as before)
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const tiltX = (py - 0.5) * 18;
    const tiltY = (px - 0.5) * -18;
    const h1 = el.querySelector<HTMLElement>(".pro-title");
    if (h1) {
      h1.style.setProperty("--tilt-x", `${tiltX}deg`);
      h1.style.setProperty("--tilt-y", `${tiltY}deg`);
    }
  };

  const resetTilt = () => {
    const el = tiltRef.current;
    if (!el) return;
    const h1 = el.querySelector<HTMLElement>(".pro-title");
    if (h1) {
      h1.style.setProperty("--tilt-x", `0deg`);
      h1.style.setProperty("--tilt-y", `0deg`);
    }
  };

  const handleHostLogin = () => {
    router.push("/host/dashboard");
  };

  const handleJoinQuiz = () => {
    if (joinCode.trim()) {
      router.push(`/participant/lobby/${joinCode.toUpperCase()}`);
    }
  };


  // Load host quizzes to power quick stats
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
        if (!userId) {
          setQuizzes([]);
          return;
        }
        const res = await fetch(`/api/quizzes?userId=${userId}`);
        if (!res.ok) {
          setQuizzes([]);
          return;
        }
        const data = await res.json();
        setQuizzes(Array.isArray(data.quizzes) ? data.quizzes : []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);


  const totalQuizzes = quizzes.length;
  const teamQuizzes = quizzes.filter((q: any) => q.team_mode || q.teamMode).length;
  const latestQuiz = quizzes[0] || null;
  const latestCreatedLabel = latestQuiz?.created_at ? new Date(latestQuiz.created_at).toLocaleString() : (latestQuiz?.createdAt ? latestQuiz.createdAt : "—");

  // Remove role param and participant logic
  // Only render host dashboard content here
  return (
    <div className="min-h-screen fade-in-up bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Title & Description */}

        <div className="text-center mb-12 slide-in-left relative">

          <div
            className="relative inline-block group"
            id="one-chance-tilt"
            ref={tiltRef}
            style={{ perspective: "600px" }}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            <h1
              className="app-title pro-title text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl mb-2"
              tabIndex={0}
            >
              <span className="pro-title-text">One Chance</span>
            </h1>
            <svg
              className="pro-underline absolute left-1/2 -translate-x-1/2 w-[90%] h-6 pointer-events-none"
              viewBox="0 0 300 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "hsl(var(--accent))" }}
            >
              <path
                className="pro-underline-path"
                d="M20 18 Q 150 28 280 18"
                stroke="currentColor"
                strokeWidth="3.5"
                fill="transparent"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create engaging quizzes with real-time participation, advanced scoring, and comprehensive analytics
          </p>
        </div>


        {/* Quick Stats for Hosts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          <Card className="border border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Quizzes Created</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-bold">{loading ? '…' : totalQuizzes}</div>
              <Trophy className="w-6 h-6 text-purple-500" />
            </CardContent>
          </Card>
          <Card className="border border-cyan-200 dark:border-cyan-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Team Quizzes</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-bold">{loading ? '…' : teamQuizzes}</div>
              <Users className="w-6 h-6 text-cyan-500" />
            </CardContent>
          </Card>
          <Card className="border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Last Created</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-lg font-semibold truncate max-w-[70%]" title={latestCreatedLabel}>{latestCreatedLabel}</div>
              <Clock className="w-6 h-6 text-emerald-500" />
            </CardContent>
          </Card>
        </div>

        {/* Host Dashboard Cards Grid */}
        <div className="flex justify-center items-center max-w-4xl mx-auto" style={{ minHeight: '340px' }}>
          {/* Host Card - only for hosts */}
          <Card
            className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 card-hover slide-in-left"
            style={{ animationDelay: "0.1s", minWidth: 340, maxWidth: 400 }}
          >
            <CardHeader className="text-center">
              <div
                className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4 scale-in"
                style={{ animationDelay: "0.2s" }}
              >
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-2xl">Quiz Host</CardTitle>
              <CardDescription>
                Create and manage quizzes, control sessions, and view detailed analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>Create Quizzes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                  <span>View Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>Real-time Control</span>

                </div>
                <CardTitle className="text-2xl">Quiz Host</CardTitle>
                <CardDescription>
                  Create and manage quizzes, control sessions, and view detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>Create Quizzes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span>View Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-500" />
                    <span>Real-time Control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>Manage Sessions</span>
                  </div>
                </div>

              </div>
              <Button onClick={handleHostLogin} className="w-full transition-element" size="lg">
                Start as Host
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* USP Section for Hosts */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Why hosts love this platform</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Security, collaboration, and rich analytics</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle>Built-in Proctoring</CardTitle>
                    <CardDescription>Fullscreen, tab-switch, and focus safeguards</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push('/test-proctoring')} className="gap-2">
                  <ShieldCheck className="w-4 h-4" /> Try Proctoring Demo
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                    <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle>Team Quiz Mode</CardTitle>
                    <CardDescription>Create, manage, and run team-based sessions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push('/host/create-quiz')} variant="secondary" className="gap-2">
                  <Users className="w-4 h-4" /> Create Team Quiz
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>Rich Data Visuals</CardTitle>
                    <CardDescription>Session analytics, trends and breakdowns</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push(latestQuiz ? `/host/quiz/${latestQuiz.id}/statistics` : '/host/dashboard')} className="gap-2">
                  <BarChart3 className="w-4 h-4" /> View Analytics
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                    <Download className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <CardTitle>CSV Exports</CardTitle>
                    <CardDescription>Download complete analytics and reports</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push('/host/dashboard')} variant="outline" className="gap-2">
                  <Download className="w-4 h-4" /> Export from Host Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Features Section (as above, unchanged) */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz App Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Experience our comprehensive quiz platform with powerful hosting and participation tools
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-in">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Host & Participate</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create custom quizzes as a host or join existing sessions as a participant with unique join codes
              </p>
            </div>

            <div className="text-center fade-in-up" style={{ animationDelay: "0.6s" }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-in">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Lobby System</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time participant management with live lobby where hosts can see who joined and start/terminate sessions
              </p>
            </div>

            <div className="text-center fade-in-up" style={{ animationDelay: "0.7s" }}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-in">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Question Types</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Support for multiple choice and true/false questions with customizable time limits and scoring
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center fade-in-up" style={{ animationDelay: "0.8s" }}>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-in">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Session Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Full control over quiz sessions with waiting, active, and completed states for organized gameplay
              </p>
            </div>

            <div className="text-center fade-in-up" style={{ animationDelay: "0.9s" }}>
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items.center justify-center mx-auto mb-4 scale-in">

                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                View quiz results, participant scores, and performance analytics after session completion
              </p>
            </div>

            <div className="text-center fade-in-up" style={{ animationDelay: "1.0s" }}>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-in">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Separate host and participant roles with secure authentication and session tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
