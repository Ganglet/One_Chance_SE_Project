"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Trophy, BarChart3, Zap, Clock, UserCheck, X, User, ShieldCheck, Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// Note: Avoid useSearchParams here to prevent Suspense requirement during prerender

export default function ParticipantDashboard() {
  const [joinCode, setJoinCode] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any | null>(null);
  const router = useRouter();
  const tiltRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef<boolean>(false);

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

  const handleJoinQuiz = () => {
    if (joinCode.trim()) {
      router.push(`/participant/lobby/${joinCode.toUpperCase()}`);
    }
  };

  // Fetch quiz history for the logged-in participant
  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoadingHistory(true);
        const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
        if (!userId) {
          setQuizHistory([]);
          setLoadingHistory(false);
          return;
        }
        const res = await fetch(`/api/participants/history?userId=${userId}`);
        if (!res.ok) {
          setQuizHistory([]);
          setLoadingHistory(false);
          return;
        }
        const data = await res.json();
        setQuizHistory(Array.isArray(data.history) ? data.history : []);
      } catch (e) {
        setQuizHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    }
    if (showProfile) fetchHistory();
  }, [showProfile]);

  // Also load history on initial mount to power dynamic cards
  useEffect(() => {
    if (hasMountedRef.current) return;
    hasMountedRef.current = true;
    (async () => {
      try {
        setLoadingHistory(true);
        const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
        if (!userId) {
          setQuizHistory([]);
          return;
        }
        const res = await fetch(`/api/participants/history?userId=${userId}`);
        if (!res.ok) {
          setQuizHistory([]);
          return;
        }
        const data = await res.json();
        setQuizHistory(Array.isArray(data.history) ? data.history : []);
      } catch (e) {
        setQuizHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    })();
  }, []);

  // Derived stats for dynamic cards
  const totalJoined = quizHistory.length;
  const teamJoined = quizHistory.filter((q: any) => q.teamMode).length;
  const soloJoined = Math.max(0, totalJoined - teamJoined);
  const latestQuiz = quizHistory.reduce((latest: any | null, q: any) => {
    const qDate = new Date(q.date).getTime();
    if (!latest) return q;
    const lDate = new Date(latest.date).getTime();
    return qDate > lDate ? q : latest;
  }, null as any | null);
  const latestPlayedLabel = latestQuiz ? new Date(latestQuiz.date).toLocaleString() : "—";
  const [showPowerups, setShowPowerups] = useState(false);

  const focusJoinInput = () => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById('joinCode') as HTMLInputElement | null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      requestAnimationFrame(() => el.focus());
    }
  };

  // Listen for header-triggered open event
  useEffect(() => {
    const open = () => setShowProfile(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('open-profile', open as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('open-profile', open as EventListener);
      }
    };
  }, []);

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
            Join quizzes with real-time participation, advanced scoring, and comprehensive analytics
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          <Card className="border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Quizzes Joined</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalJoined}</div>
              <Users className="w-6 h-6 text-blue-500" />
            </CardContent>
          </Card>
          <Card className="border border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Solo Sessions</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-bold">{soloJoined}</div>
              <Users className="w-6 h-6 text-purple-500" />
            </CardContent>
          </Card>
          <Card className="border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Last Played</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-lg font-semibold truncate max-w-[70%]" title={latestPlayedLabel}>{latestPlayedLabel}</div>
              <Clock className="w-6 h-6 text-emerald-500" />
            </CardContent>
          </Card>
        </div>

        {/* Profile Dropdown/Modal */}
        {showProfile && (
          <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center" onClick={() => setShowProfile(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={() => {
                  setShowProfile(false);
                  // Remove the query param when closing
                  router.replace("/participant/dashboard");
                }}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <User className="w-10 h-10 text-gray-700 dark:text-gray-200" />
                <div className="font-bold text-lg">My Quizzes</div>
              </div>
              <div className="mb-2 font-bold text-sm text-gray-500">Quiz History</div>
              {loadingHistory ? (
                <div className="text-center py-6 text-gray-400">Loading...</div>
              ) : quizHistory.length === 0 ? (
                <div className="text-center py-6 text-gray-400">No quiz history found.</div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
                  {quizHistory.map((quiz: any) => (
                    <li key={`${quiz.id}-${quiz.code}`} className="py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded transition" onClick={() => { setShowProfile(false); router.push(`${quiz.teamMode ? '/participant/team-quiz-review' : '/participant/review'}/${quiz.code}`); }}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{quiz.title}</span>
                        <span className="text-xs text-gray-500">{new Date(quiz.date).toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-gray-400">Code: {quiz.code}</div>
                    </li>
                  ))}
                </ul>
              )}
              {selectedQuiz && (
                <div className="mt-4 p-3 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <div className="font-semibold mb-1">{selectedQuiz.title}</div>
                  <div className="text-xs text-gray-500 mb-2">Code: {selectedQuiz.code} | Date: {selectedQuiz.date}</div>
                  <Button size="sm" className="w-full" onClick={() => { setShowProfile(false); router.push(`/participant/review/${selectedQuiz.code}`); }}>View Details</Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Participant Card */}
        <div className="grid gap-8 max-w-4xl mx-auto md:grid-cols-1">
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

        {/* USP Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">What makes this platform stand out</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Secure, collaborative, and insight-driven experience</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle>Proctoring System</CardTitle>
                    <CardDescription>Fullscreen enforcement, tab switch and focus detection</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push('/participant/test-proctoring')} className="gap-2">
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
                    <CardTitle>Team Quiz</CardTitle>
                    <CardDescription>Seamless team-mode sessions with live coordination</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={focusJoinInput} variant="secondary" className="gap-2">
                  <Users className="w-4 h-4" /> Join Team Quiz with Code
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>Unique Powerups</CardTitle>
                    <CardDescription>Boost your performance with strategic powerups</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowPowerups(true)} className="gap-2">
                  <Zap className="w-4 h-4" /> View Powerups
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
                    <CardDescription>Hosts can export complete analytics as CSV</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button disabled variant="outline" className="gap-2 opacity-70 cursor-not-allowed" aria-disabled>
                  <Download className="w-4 h-4" /> Host-only
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
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

      {/* Powerups Modal */}
      {showPowerups && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center" onClick={() => setShowPowerups(false)}>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Powerups</h3>
              <button onClick={() => setShowPowerups(false)} aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <div className="font-medium">50/50</div>
                <div className="text-gray-600 dark:text-gray-400">Removes two incorrect options for the current question.</div>
              </li>
              <li>
                <div className="font-medium">Extra Time</div>
                <div className="text-gray-600 dark:text-gray-400">Adds extra time to the current question's timer.</div>
              </li>
              <li>
                <div className="font-medium">2x Points</div>
                <div className="text-gray-600 dark:text-gray-400">Doubles the points if the answer is correct.</div>
              </li>
              <li>
                <div className="font-medium">Double or Negative</div>
                <div className="text-gray-600 dark:text-gray-400">High risk, high reward: double points for correct, negative for wrong.</div>
              </li>
              <li>
                <div className="font-medium">Streak Saver</div>
                <div className="text-gray-600 dark:text-gray-400">Protects your current streak from being reset once.</div>
              </li>
            </ul>
            <div className="mt-6 text-right">
              <Button onClick={() => setShowPowerups(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 