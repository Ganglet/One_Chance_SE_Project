"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });
      if (!res.ok) {
        setError("Invalid username or password.");
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        if (data.id) {
          localStorage.setItem("userId", data.id.toString());
        }
        // Persist username and role for later use
        localStorage.setItem("username", username.trim());
        if (data.role) {
          localStorage.setItem("role", data.role);
        }
        // Redirect based on role
        if (data.role === "participant") {
          router.push(`/participant/dashboard`);
        } else {
          router.push(`/dashboard`);
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/85 to-red-50/80 backdrop-blur-sm"></div>
        <div className={`relative z-10 w-full max-w-md mx-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="w-full border-0 shadow-2xl bg-white/95 backdrop-blur-md animate-fade-in-up">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse-glow">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                One Chance
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Sign in to access your Quiz Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username
                  </Label>
                  <div className="relative group">
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="pl-10 h-12 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-200 group-hover:border-red-300"
                      autoFocus
                      required
                      disabled={isLoading}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-200 group-hover:border-red-300"
                      required
                      disabled={isLoading}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-red-500"
                      disabled={isLoading}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-fade-in-up">
                    <div className="text-red-600 text-sm text-center flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4" />
                      {error}
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white font-medium text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  Secure login powered by advanced authentication
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedBackground>
  );
}
