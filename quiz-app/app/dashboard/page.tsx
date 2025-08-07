"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Trophy, BarChart3, Zap, Clock, UserCheck } from "lucide-react";

export default function DashboardRoute() {
  const [joinCode, setJoinCode] = useState("");
  const router = useRouter();
  const tiltRef = useRef<HTMLDivElement>(null);

  // Get role from query (?role=host or ?role=participant)
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "host";

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

  return (
    <div className="min-h-screen fade-in-up bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Title & Description */}
        <div className="text-center mb-12 slide-in-left">
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

        {/* Cards Grid */}
        <div className={`grid gap-8 max-w-4xl mx-auto ${role === "host" ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
          {/* Host Card - only for hosts */}
          {role === "host" && (
            <Card
              className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 card-hover slide-in-left"
              style={{ animationDelay: "0.1s" }}
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
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>Manage Sessions</span>
                  </div>
                </div>
                <Button onClick={handleHostLogin} className="w-full transition-element" size="lg">
                  Start as Host
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Participant Card - always shown */}
          <Card
            className="border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 card-hover slide-in-right"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="text-center">
              <div
                className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 scale-in"
                style={{ animationDelay: "0.3s" }}
              >
                <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Participant</CardTitle>
              <CardDescription>Join a quiz session with a code and compete with others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="joinCode">Enter Quiz Code</Label>
                <Input
                  id="joinCode"
                  placeholder="e.g., ABC123"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono transition-element"
                  maxLength={6}
                />
              </div>
              <Button onClick={handleJoinQuiz} className="w-full transition-element" size="lg" disabled={!joinCode.trim()}>
                Join Quiz
              </Button>
            </CardContent>
          </Card>
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
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-in">
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
