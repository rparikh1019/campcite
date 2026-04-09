"use client";

import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {/* Subtle nature pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="trees-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 10 L60 40 L40 40 Z" fill="currentColor" className="text-emerald-900" />
              <path d="M50 25 L65 55 L35 55 Z" fill="currentColor" className="text-emerald-900" />
              <rect x="47" y="55" width="6" height="15" fill="currentColor" className="text-emerald-900" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#trees-pattern)" />
          </svg>
        </div>
        <div className="relative p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
