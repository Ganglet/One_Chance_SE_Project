"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, RefreshCcw, Search, Users } from "lucide-react";

interface HistoryItem {
  id: number;
  title: string;
  code: string;
  date: string; // ISO string
  teamMode: boolean;
}

export default function ParticipantQuizHistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [query, setQuery] = useState<string>("");
  const intervalRef = useRef<number | null>(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
      if (!userId) {
        setHistory([]);
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/participants/history?userId=${userId}`);
      if (!res.ok) {
        setError("Failed to load history");
        setHistory([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      const items: HistoryItem[] = Array.isArray(data.history) ? data.history : [];
      // Sort newest first just in case
      items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setHistory(items);
    } catch (e) {
      setError("Failed to load history");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();

    // Refresh when tab regains focus
    const onFocus = () => fetchHistory();
    if (typeof window !== "undefined") {
      window.addEventListener("focus", onFocus);
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) fetchHistory();
      });
    }

    // Background polling for robustness (every 20s)
    intervalRef.current = window.setInterval(fetchHistory, 20000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (typeof window !== "undefined") {
        window.removeEventListener("focus", onFocus);
      }
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return history;
    return history.filter((h) =>
      h.title.toLowerCase().includes(q) ||
      h.code.toLowerCase().includes(q)
    );
  }, [history, query]);

  const handleView = (item: HistoryItem) => {
    const path = item.teamMode ? "/participant/team-quiz-review/" : "/participant/review/";
    router.push(path + item.code);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Quiz History</h1>
          <p className="text-gray-600 dark:text-gray-300">All quizzes you have attempted, with quick access to details and reviews.</p>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Search and Filter</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3 items-center flex-wrap">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by title or code"
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button onClick={fetchHistory} variant="outline" className="gap-2">
              <RefreshCcw className="w-4 h-4" /> Refresh
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Attempted Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-10 text-center text-gray-500">Loading...</div>
            ) : error ? (
              <div className="py-10 text-center text-red-500">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="py-10 text-center text-gray-500">No quizzes found. Join a quiz to get started!</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Title</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead className="min-w-[180px]">Last Played</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((item) => (
                      <TableRow key={`${item.id}-${item.code}`} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell className="font-mono text-sm">{item.code}</TableCell>
                        <TableCell>
                          {item.teamMode ? (
                            <Badge variant="secondary" className="gap-1"><Users className="w-3 h-3" /> Team</Badge>
                          ) : (
                            <Badge className="gap-1">Solo</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(item.date).toLocaleString()}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => handleView(item)}>View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 