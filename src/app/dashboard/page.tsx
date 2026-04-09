"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isDemoMode, DEMO_CAMPGROUND, DEMO_PROFILE, DEMO_DIRECTORIES, disableDemoMode } from "@/lib/demo-auth";
import {
  Globe,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Settings,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Tent,
  Wifi,
  Car,
  Trees,
  LogOut,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const DIRECTORY_INFO: Record<string, { name: string; icon: string; color: string }> = {
  google_business: { name: "Google Business", icon: "🔍", color: "bg-blue-500" },
  facebook: { name: "Facebook", icon: "📘", color: "bg-blue-600" },
  campendium: { name: "Campendium", icon: "🏕️", color: "bg-emerald-500" },
  the_dyrt: { name: "The Dyrt", icon: "⛺", color: "bg-orange-500" },
  hipcamp: { name: "Hipcamp", icon: "🌲", color: "bg-green-600" },
  rvlife: { name: "RV LIFE", icon: "🚐", color: "bg-purple-500" },
  bing_places: { name: "Bing Places", icon: "🔎", color: "bg-teal-500" },
};

function DemoModeBanner() {
  const router = useRouter();

  return (
    <motion.div
      className="bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 px-4 py-3 rounded-xl flex items-center justify-between shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold">Demo Mode Active</p>
          <p className="text-sm opacity-80">You&apos;re viewing sample data</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="bg-white/20 border-white/30 text-amber-900 hover:bg-white/30"
        onClick={() => {
          disableDemoMode();
          router.push("/");
          toast.success("Demo mode disabled");
        }}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Exit Demo
      </Button>
    </motion.div>
  );
}

function CampgroundCard({ campground }: { campground: typeof DEMO_CAMPGROUND }) {
  return (
    <motion.div
      className="bg-white rounded-2xl border-2 border-slate-100 shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Tent className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{campground.name}</h2>
            <p className="text-emerald-100 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {campground.city}, {campground.state}
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Phone className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium">{campground.phone}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Mail className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium">{campground.email}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <ExternalLink className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium truncate">{campground.website}</span>
          </div>
        </div>
        <p className="text-slate-600 mb-4">{campground.description}</p>
        <div className="flex flex-wrap gap-2">
          {campground.attributes.amenities.slice(0, 6).map((amenity) => (
            <span
              key={amenity}
              className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
            >
              {amenity}
            </span>
          ))}
          {campground.attributes.amenities.length > 6 && (
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
              +{campground.attributes.amenities.length - 6} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DirectoryCard({ directory, index }: { directory: typeof DEMO_DIRECTORIES[0]; index: number }) {
  const info = DIRECTORY_INFO[directory.directory_type] || { name: directory.directory_type, icon: "🔗", color: "bg-gray-500" };

  const getStatusColor = () => {
    switch (directory.sync_status) {
      case "synced":
        return "text-emerald-600 bg-emerald-50";
      case "outdated":
        return "text-amber-600 bg-amber-50";
      case "not_connected":
        return "text-slate-400 bg-slate-50";
      default:
        return "text-slate-400 bg-slate-50";
    }
  };

  const getStatusIcon = () => {
    switch (directory.sync_status) {
      case "synced":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "outdated":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case "not_connected":
        return <Clock className="w-5 h-5 text-slate-400" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl border-2 border-slate-100 p-5 hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
            {info.icon}
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{info.name}</h3>
            <p className={`text-sm font-medium px-2 py-0.5 rounded-full inline-block ${getStatusColor()}`}>
              {directory.sync_status === "synced" && "Synced"}
              {directory.sync_status === "outdated" && "Needs sync"}
              {directory.sync_status === "not_connected" && "Not connected"}
            </p>
          </div>
        </div>
        {getStatusIcon()}
      </div>
      {directory.last_synced_at && (
        <p className="text-xs text-slate-400">
          Last synced: {new Date(directory.last_synced_at).toLocaleDateString()}
        </p>
      )}
      {directory.status === "pending" && (
        <Button size="sm" className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600">
          Connect
        </Button>
      )}
    </motion.div>
  );
}

function DemoDashboard() {
  const [syncing, setSyncing] = useState(false);

  const handleSyncAll = () => {
    setSyncing(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Syncing all directories...",
        success: "All directories synced successfully!",
        error: "Sync failed",
      }
    );
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <DemoModeBanner />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Dashboard</h1>
          <p className="text-slate-500">Manage your campground listings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-sm">
            <span className="text-emerald-600 font-semibold">Growth Plan</span>
            <span className="text-slate-500 ml-2">• 10 directories</span>
          </div>
        </div>
      </div>

      <CampgroundCard campground={DEMO_CAMPGROUND} />

      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Directory Status</h2>
            <p className="text-slate-500 text-sm">4 connected, 2 pending</p>
          </div>
          <Button
            onClick={handleSyncAll}
            disabled={syncing}
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-200"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
            Sync All
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_DIRECTORIES.map((dir, i) => (
            <DirectoryCard key={dir.id} directory={dir} index={i} />
          ))}
        </div>
      </section>

      <motion.section
        className="bg-white rounded-2xl border-2 border-slate-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "Synced to Google Business", time: "2 hours ago", status: "success" },
            { action: "Synced to Facebook", time: "2 hours ago", status: "success" },
            { action: "Synced to The Dyrt", time: "1 day ago", status: "success" },
            { action: "Campendium sync needs attention", time: "5 days ago", status: "warning" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                {activity.status === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                )}
                <span className="font-medium text-slate-700">{activity.action}</span>
              </div>
              <span className="text-sm text-slate-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function RealDashboard() {
  const [loading, setLoading] = useState(true);
  const [campground, setCampground] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: camp } = await supabase
        .from("campgrounds")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      setCampground(camp);
      setUserProfile(profile);
      setLoading(false);
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {userProfile?.plan === "trial" && userProfile?.trial_ends_at && (
          <div className="bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-lg text-sm">
            Trial ends {new Date(userProfile.trial_ends_at).toLocaleDateString()}
            <Link href="/dashboard/settings" className="ml-2 text-green-600 hover:underline">
              Upgrade now
            </Link>
          </div>
        )}
      </div>

      {campground ? (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold">{campground.name}</h2>
          <p className="text-gray-600">{campground.description}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Welcome to CampCite!</h2>
          <p className="text-gray-600 mb-6">
            Let&apos;s get started by adding your campground information.
          </p>
          <Link href="/dashboard/campground">
            <Button size="lg">Add Your Campground</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
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

  return isDemo ? <DemoDashboard /> : <RealDashboard />;
}
