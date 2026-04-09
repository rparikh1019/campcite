"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { isDemoMode } from "@/lib/demo-auth";
import {
  History,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Download,
  ExternalLink,
} from "lucide-react";

const DEMO_SYNC_HISTORY = [
  {
    id: "1",
    directory: "google_business",
    status: "success",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000).toISOString(),
    error: null,
    result: { updated_fields: ["hours", "description"] },
    attempts: 1,
    max_attempts: 3,
    screenshots: [],
  },
  {
    id: "2",
    directory: "facebook",
    status: "success",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 2 * 60 * 60 * 1000 + 45000).toISOString(),
    error: null,
    result: { updated_fields: ["hours", "phone"] },
    attempts: 1,
    max_attempts: 3,
    screenshots: [],
  },
  {
    id: "3",
    directory: "the_dyrt",
    status: "success",
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 24 * 60 * 60 * 1000 + 60000).toISOString(),
    error: null,
    result: { updated_fields: ["amenities", "description"] },
    attempts: 1,
    max_attempts: 3,
    screenshots: [],
  },
  {
    id: "4",
    directory: "campendium",
    status: "failed",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 120000).toISOString(),
    error: "Authentication expired. Please reconnect your account.",
    result: null,
    attempts: 3,
    max_attempts: 3,
    screenshots: [],
  },
  {
    id: "5",
    directory: "bing_places",
    status: "success",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 25000).toISOString(),
    error: null,
    result: { updated_fields: ["address", "hours"] },
    attempts: 1,
    max_attempts: 3,
    screenshots: [],
  },
];

const DIRECTORY_INFO: Record<string, { name: string; icon: string; color: string }> = {
  google_business: { name: "Google Business", icon: "🔍", color: "bg-blue-500" },
  facebook: { name: "Facebook", icon: "📘", color: "bg-blue-600" },
  campendium: { name: "Campendium", icon: "🏕️", color: "bg-emerald-500" },
  the_dyrt: { name: "The Dyrt", icon: "⛺", color: "bg-orange-500" },
  hipcamp: { name: "Hipcamp", icon: "🌲", color: "bg-green-600" },
  rvlife: { name: "RV LIFE", icon: "🚐", color: "bg-purple-500" },
  bing_places: { name: "Bing Places", icon: "🔎", color: "bg-teal-500" },
};

function DemoHistoryPage() {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "running":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-emerald-100 text-emerald-700 font-semibold">Success</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700 font-semibold">Failed</Badge>;
      case "running":
        return <Badge className="bg-blue-100 text-blue-700 font-semibold">Running</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 font-semibold">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Demo Banner */}
      <motion.div
        className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200 text-amber-800 px-4 py-3 rounded-xl flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Sparkles className="w-5 h-5 text-amber-500" />
        <p className="text-sm font-medium">
          Demo Mode: Viewing sample sync history data.
        </p>
      </motion.div>

      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <History className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Sync History</h1>
            <p className="text-slate-500">View all directory sync activity</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-2 rounded-xl font-semibold"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
            <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              All Sync Jobs
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {DEMO_SYNC_HISTORY.map((job, index) => {
                const dirInfo = DIRECTORY_INFO[job.directory] || {
                  name: job.directory,
                  icon: "🔗",
                  color: "bg-slate-500",
                };
                return (
                  <motion.div
                    key={job.id}
                    className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <div className={`w-10 h-10 ${dirInfo.color} rounded-xl flex items-center justify-center text-lg shadow-md`}>
                      {dirInfo.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-800">
                          {dirInfo.name}
                        </span>
                        {getStatusBadge(job.status)}
                      </div>
                      {job.error && (
                        <p className="text-red-500 text-sm mt-1">{job.error}</p>
                      )}
                      {job.result && (
                        <p className="text-slate-500 text-sm mt-1">
                          Updated: {(job.result as { updated_fields: string[] }).updated_fields.join(", ")}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">
                        {formatDateTime(job.completed_at || job.created_at)}
                      </p>
                      {job.attempts > 1 && (
                        <p className="text-xs text-slate-400">
                          Attempt {job.attempts} of {job.max_attempts}
                        </p>
                      )}
                    </div>

                    {getStatusIcon(job.status)}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function RealHistoryPage() {
  const supabase = createClient();
  const [campgroundId, setCampgroundId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampground() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: campground } = await supabase
          .from("campgrounds")
          .select("id")
          .eq("user_id", user.id)
          .single();
        setCampgroundId(campground?.id || null);
      }
    }
    fetchCampground();
  }, [supabase]);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["sync-history", campgroundId],
    queryFn: async () => {
      if (!campgroundId) return [];
      const { data } = await supabase
        .from("sync_jobs")
        .select("*")
        .eq("campground_id", campgroundId)
        .order("created_at", { ascending: false })
        .limit(50);
      return data || [];
    },
    enabled: !!campgroundId,
    refetchInterval: 5000,
  });

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "running":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-emerald-100 text-emerald-700">Success</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
      case "running":
        return <Badge className="bg-blue-100 text-blue-700">Running</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDirectoryName = (id: string) => {
    const names: Record<string, string> = {
      google: "Google Business",
      facebook: "Facebook",
      bing: "Bing Places",
      campendium: "Campendium",
      the_dyrt: "The Dyrt",
      rv_life: "RV LIFE",
      good_sam: "Good Sam",
      allstays: "Allstays",
      hipcamp: "Hipcamp",
      apple: "Apple Maps",
      yelp: "Yelp",
      tripadvisor: "TripAdvisor",
    };
    return names[id] || id;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <History className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Sync History</h1>
            <p className="text-slate-500">View all directory sync activity</p>
          </div>
        </div>
        <Button variant="outline" className="border-2 rounded-xl">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {!jobs || jobs.length === 0 ? (
        <Card className="border-2 border-slate-100 rounded-2xl">
          <CardContent className="p-8 text-center">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">
              No sync history yet. Connect a directory and trigger a sync to see
              activity here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
            <CardTitle className="text-lg text-emerald-700">All Sync Jobs</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-1">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl border-b last:border-0"
                >
                  {getStatusIcon(job.status)}

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {getDirectoryName(job.directory)}
                      </span>
                      {getStatusBadge(job.status)}
                    </div>
                    {job.error && (
                      <p className="text-red-500 text-sm mt-1">{job.error}</p>
                    )}
                  </div>

                  <div className="text-right text-sm">
                    <p className="text-slate-700">
                      {formatDateTime(
                        job.completed_at || job.started_at || job.created_at
                      )}
                    </p>
                    {job.attempts > 1 && (
                      <p className="text-slate-400">
                        Attempt {job.attempts} of {job.max_attempts}
                      </p>
                    )}
                  </div>

                  {job.screenshots && job.screenshots.length > 0 && (
                    <a
                      href={job.screenshots[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 text-sm hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Screenshot
                    </a>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const [isDemo, setIsDemo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDemo(isDemoMode());
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return isDemo ? <DemoHistoryPage /> : <RealHistoryPage />;
}
