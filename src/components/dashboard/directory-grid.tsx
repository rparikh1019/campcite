"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DIRECTORIES = [
  { id: "google", name: "Google Business", icon: "🔍", tier: "starter" },
  { id: "facebook", name: "Facebook", icon: "📘", tier: "starter" },
  { id: "bing", name: "Bing Places", icon: "🔎", tier: "starter" },
  { id: "campendium", name: "Campendium", icon: "🏕️", tier: "starter" },
  { id: "the_dyrt", name: "The Dyrt", icon: "⛺", tier: "starter" },
  { id: "rv_life", name: "RV LIFE", icon: "🚐", tier: "starter" },
  { id: "good_sam", name: "Good Sam", icon: "👍", tier: "growth" },
  { id: "allstays", name: "Allstays", icon: "📍", tier: "growth" },
  { id: "hipcamp", name: "Hipcamp", icon: "🌲", tier: "growth" },
  { id: "apple", name: "Apple Maps", icon: "🍎", tier: "growth" },
  { id: "yelp", name: "Yelp", icon: "⭐", tier: "pro" },
  { id: "tripadvisor", name: "TripAdvisor", icon: "🦉", tier: "pro" },
];

interface DirectoryGridProps {
  campgroundId: string;
}

export function DirectoryGrid({ campgroundId }: DirectoryGridProps) {
  const supabase = createClient();

  const { data: listings } = useQuery({
    queryKey: ["listings", campgroundId],
    queryFn: async () => {
      const { data } = await supabase
        .from("directory_listings")
        .select("*")
        .eq("campground_id", campgroundId);
      return data || [];
    },
    refetchInterval: 5000, // Poll every 5 seconds
  });

  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const { data } = await supabase.from("directory_connections").select("*");
      return data || [];
    },
    refetchInterval: 5000,
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {DIRECTORIES.map((dir) => {
        const listing = listings?.find((l) => l.directory === dir.id);
        const connection = connections?.find((c) => c.directory === dir.id);

        return (
          <DirectoryCard
            key={dir.id}
            directory={dir}
            listing={listing}
            connection={connection}
          />
        );
      })}
    </div>
  );
}

interface DirectoryCardProps {
  directory: (typeof DIRECTORIES)[0];
  listing?: {
    status: string;
    last_synced_at: string | null;
    external_url: string | null;
  };
  connection?: {
    status: string;
  };
}

function DirectoryCard({ directory, listing, connection }: DirectoryCardProps) {
  const isConnected = connection?.status === "connected";
  const status = listing?.status || (isConnected ? "connected" : "not_connected");

  const getStatusBadge = () => {
    switch (status) {
      case "synced":
        return <Badge className="bg-green-100 text-green-700">Synced</Badge>;
      case "syncing":
        return <Badge className="bg-yellow-100 text-yellow-700">Syncing...</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-700">Error</Badge>;
      case "connected":
        return <Badge className="bg-blue-100 text-blue-700">Connected</Badge>;
      case "pending":
        return <Badge className="bg-gray-100 text-gray-700">Pending</Badge>;
      default:
        return <Badge variant="secondary">Not Connected</Badge>;
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{directory.icon}</span>
          <span className="font-medium text-sm">{directory.name}</span>
        </div>

        {getStatusBadge()}

        {listing?.last_synced_at && (
          <p className="text-xs text-gray-500 mt-2">
            {formatRelativeTime(listing.last_synced_at)}
          </p>
        )}

        <div className="mt-3">
          {status === "not_connected" ? (
            <Button size="sm" variant="outline" className="w-full text-xs">
              Connect
            </Button>
          ) : status === "synced" || status === "connected" ? (
            <Button size="sm" className="w-full text-xs">
              Sync Now
            </Button>
          ) : status === "error" ? (
            <Button size="sm" variant="destructive" className="w-full text-xs">
              Retry
            </Button>
          ) : null}
        </div>

        {listing?.external_url && (
          <a
            href={listing.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-600 hover:underline mt-2 block"
          >
            View listing →
          </a>
        )}
      </CardContent>
    </Card>
  );
}
