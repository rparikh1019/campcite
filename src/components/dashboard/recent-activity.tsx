"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentActivityProps {
  campgroundId: string;
}

export function RecentActivity({ campgroundId }: RecentActivityProps) {
  const supabase = createClient();

  const { data: jobs } = useQuery({
    queryKey: ["sync-jobs", campgroundId],
    queryFn: async () => {
      const { data } = await supabase
        .from("sync_jobs")
        .select("*")
        .eq("campground_id", campgroundId)
        .order("created_at", { ascending: false })
        .limit(10);
      return data || [];
    },
    refetchInterval: 5000,
  });

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✅";
      case "failed":
        return "❌";
      case "running":
        return "🔄";
      case "pending":
        return "⏳";
      default:
        return "📋";
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

  if (!jobs || jobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">
            No sync activity yet. Connect a directory and click &quot;Sync Now&quot; to get
            started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex items-center gap-3 text-sm border-b pb-3 last:border-0"
            >
              <span>{getStatusIcon(job.status)}</span>
              <div className="flex-1">
                <span className="font-medium">
                  {getDirectoryName(job.directory)}
                </span>
                {job.error && (
                  <p className="text-red-500 text-xs mt-1">{job.error}</p>
                )}
              </div>
              <Badge
                variant={job.status === "success" ? "default" : "secondary"}
                className={
                  job.status === "success"
                    ? "bg-green-100 text-green-700"
                    : job.status === "failed"
                    ? "bg-red-100 text-red-700"
                    : ""
                }
              >
                {job.status}
              </Badge>
              <span className="text-gray-400 text-xs">
                {formatDateTime(job.completed_at || job.started_at || job.created_at)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
