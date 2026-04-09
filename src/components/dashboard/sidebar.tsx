"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isDemoMode, disableDemoMode } from "@/lib/demo-auth";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Tent,
  History,
  Settings,
  LogOut,
  Trees,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/campground", label: "Edit Campground", icon: Tent },
  { href: "/dashboard/history", label: "Sync History", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    setIsDemo(isDemoMode());
  }, []);

  const handleLogout = async () => {
    if (isDemo) {
      disableDemoMode();
      router.push("/");
    } else {
      await supabase.auth.signOut();
      router.push("/login");
    }
  };

  return (
    <aside className="w-72 bg-gradient-to-b from-emerald-50 to-green-50 border-r-2 border-emerald-100 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b-2 border-emerald-100">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform">
            <Trees className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-800 tracking-tight">
              CampCite
            </span>
            <p className="text-xs text-emerald-600 font-medium -mt-0.5">
              Directory Manager
            </p>
          </div>
        </Link>
      </div>

      {/* Demo Badge */}
      {isDemo && (
        <div className="mx-4 mt-4 px-3 py-2 bg-amber-100 border border-amber-200 rounded-xl flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold text-amber-700">Demo Mode</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">
          Menu
        </p>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-200"
                      : "text-slate-600 hover:bg-white hover:shadow-md hover:text-emerald-700"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-emerald-100">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl h-12 font-medium"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          {isDemo ? "Exit Demo" : "Sign out"}
        </Button>
      </div>
    </aside>
  );
}
