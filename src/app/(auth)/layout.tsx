"use client";

import Link from "next/link";
import { Tent, Trees, Mountain, Bird, Sun, Leaf } from "lucide-react";
import { motion } from "framer-motion";

function FloatingElement({ children, delay, duration, x, y }: { children: React.ReactNode; delay: number; duration: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-emerald-50 text-slate-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingElement delay={0} duration={6} x={5} y={20}>
          <Trees className="w-24 h-24 text-emerald-200" />
        </FloatingElement>
        <FloatingElement delay={1} duration={8} x={85} y={15}>
          <Mountain className="w-32 h-32 text-emerald-100" />
        </FloatingElement>
        <FloatingElement delay={2} duration={5} x={15} y={70}>
          <Leaf className="w-12 h-12 text-green-200" />
        </FloatingElement>
        <FloatingElement delay={0.5} duration={7} x={80} y={60}>
          <Bird className="w-10 h-10 text-sky-200" />
        </FloatingElement>
        <FloatingElement delay={3} duration={10} x={90} y={30}>
          <Trees className="w-20 h-20 text-emerald-100" />
        </FloatingElement>

        {/* Sun */}
        <motion.div
          className="absolute top-10 right-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <Sun className="w-20 h-20 text-amber-200" />
        </motion.div>

        {/* Ground gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-100 to-transparent" />
      </div>

      {/* Header */}
      <motion.header
        className="relative z-50 bg-white/80 backdrop-blur-lg border-b border-emerald-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <motion.div
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:shadow-emerald-300 transition-shadow"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tent className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              CampCite
            </span>
          </Link>
        </div>
      </motion.header>

      {/* Content */}
      <main className="relative flex items-center justify-center min-h-[calc(100vh-73px)] py-12 px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
