"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { toast } from "sonner";
import { enableDemoMode } from "@/lib/demo-auth";
import {
  MapPin,
  Globe,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Check,
  ArrowRight,
  Star,
  Trees,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Edit3,
  Upload,
  Mountain,
  Tent,
  Sun,
  Bird,
  Leaf,
  Sparkles,
  Play,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const DIRECTORIES = [
  "Google Business Profile",
  "Facebook",
  "Campendium",
  "The Dyrt",
  "RV LIFE",
  "Bing Places",
  "Hipcamp",
  "RV Parky",
  "Allstays",
  "Ultimate Campgrounds",
];

const PRICING = [
  {
    name: "Starter",
    price: 9,
    description: "Perfect for small campgrounds",
    features: [
      "6 directory connections",
      "Monthly automatic sync",
      "Google + Facebook integration",
      "Email support",
      "Basic analytics",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: 19,
    description: "For campgrounds ready to expand",
    features: [
      "10 directory connections",
      "Bi-weekly automatic sync",
      "All camping directories",
      "Priority support",
      "Advanced analytics",
      "Listing health monitoring",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: 49,
    description: "Enterprise-grade features",
    features: [
      "12+ directory connections",
      "Weekly automatic sync",
      "Custom integrations",
      "Dedicated phone support",
      "API access",
      "Multi-location management",
    ],
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I used to spend an entire day updating our listings before peak season. Now it takes 5 minutes.",
    author: "Sarah Mitchell",
    role: "Owner, Pine Valley RV Resort",
    avatar: "SM",
    metric: "10+ hours saved monthly",
  },
  {
    quote:
      "A guest told me our Google hours were wrong. With CampCite, that never happens anymore.",
    author: "Mike Chen",
    role: "Manager, Lakeside Camping",
    avatar: "MC",
    metric: "40% more bookings",
  },
  {
    quote:
      "We're on 8 different camping sites now. There's no way I could keep them all updated manually.",
    author: "Jennifer Woods",
    role: "Director, Mountain View Campground",
    avatar: "JW",
    metric: "8 directories synced",
  },
];

// Tree SVG component
function TreesBackground({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
      {/* Background mountains */}
      <path d="M0 400 L0 300 Q200 200 400 280 Q600 180 800 250 Q1000 150 1200 220 Q1350 180 1440 200 L1440 400 Z" fill="#d1fae5" opacity="0.5"/>
      <path d="M0 400 L0 320 Q150 250 300 300 Q500 220 700 280 Q900 200 1100 260 Q1300 220 1440 250 L1440 400 Z" fill="#a7f3d0" opacity="0.6"/>

      {/* Trees - Layer 1 (back) */}
      <g opacity="0.4">
        <path d="M50 400 L50 350 L30 350 L60 300 L40 300 L70 250 L50 250 L80 200 L110 250 L90 250 L120 300 L100 300 L130 350 L110 350 L110 400 Z" fill="#059669"/>
        <path d="M180 400 L180 360 L165 360 L190 320 L175 320 L200 280 L185 280 L210 240 L235 280 L220 280 L245 320 L230 320 L255 360 L240 360 L240 400 Z" fill="#047857"/>
        <path d="M320 400 L320 355 L305 355 L330 310 L315 310 L340 265 L365 310 L350 310 L375 355 L360 355 L360 400 Z" fill="#059669"/>
        <path d="M450 400 L450 345 L430 345 L460 290 L440 290 L470 235 L500 290 L480 290 L510 345 L490 345 L490 400 Z" fill="#047857"/>
        <path d="M580 400 L580 365 L565 365 L590 325 L575 325 L600 285 L625 325 L610 325 L635 365 L620 365 L620 400 Z" fill="#059669"/>
        <path d="M720 400 L720 340 L700 340 L730 285 L710 285 L740 230 L770 285 L750 285 L780 340 L760 340 L760 400 Z" fill="#047857"/>
        <path d="M850 400 L850 350 L835 350 L860 305 L845 305 L870 260 L895 305 L880 305 L905 350 L890 350 L890 400 Z" fill="#059669"/>
        <path d="M980 400 L980 355 L960 355 L990 300 L970 300 L1000 245 L1030 300 L1010 300 L1040 355 L1020 355 L1020 400 Z" fill="#047857"/>
        <path d="M1110 400 L1110 360 L1095 360 L1120 320 L1105 320 L1130 280 L1155 320 L1140 320 L1165 360 L1150 360 L1150 400 Z" fill="#059669"/>
        <path d="M1240 400 L1240 345 L1220 345 L1250 290 L1230 290 L1260 235 L1290 290 L1270 290 L1300 345 L1280 345 L1280 400 Z" fill="#047857"/>
        <path d="M1370 400 L1370 355 L1355 355 L1380 310 L1365 310 L1390 265 L1415 310 L1400 310 L1425 355 L1410 355 L1410 400 Z" fill="#059669"/>
      </g>

      {/* Trees - Layer 2 (front) */}
      <g opacity="0.7">
        <path d="M100 400 L100 340 L80 340 L110 280 L90 280 L120 220 L150 280 L130 280 L160 340 L140 340 L140 400 Z" fill="#10b981"/>
        <path d="M250 400 L250 350 L235 350 L260 300 L245 300 L270 250 L295 300 L280 300 L305 350 L290 350 L290 400 Z" fill="#059669"/>
        <path d="M380 400 L380 330 L360 330 L390 270 L370 270 L400 210 L430 270 L410 270 L440 330 L420 330 L420 400 Z" fill="#10b981"/>
        <path d="M520 400 L520 355 L505 355 L530 310 L515 310 L540 265 L565 310 L550 310 L575 355 L560 355 L560 400 Z" fill="#059669"/>
        <path d="M650 400 L650 335 L630 335 L660 275 L640 275 L670 215 L700 275 L680 275 L710 335 L690 335 L690 400 Z" fill="#10b981"/>
        <path d="M790 400 L790 360 L775 360 L800 315 L785 315 L810 270 L835 315 L820 315 L845 360 L830 360 L830 400 Z" fill="#059669"/>
        <path d="M920 400 L920 340 L900 340 L930 280 L910 280 L940 220 L970 280 L950 280 L980 340 L960 340 L960 400 Z" fill="#10b981"/>
        <path d="M1050 400 L1050 350 L1035 350 L1060 300 L1045 300 L1070 250 L1095 300 L1080 300 L1105 350 L1090 350 L1090 400 Z" fill="#059669"/>
        <path d="M1180 400 L1180 330 L1160 330 L1190 270 L1170 270 L1200 210 L1230 270 L1210 270 L1240 330 L1220 330 L1220 400 Z" fill="#10b981"/>
        <path d="M1310 400 L1310 360 L1295 360 L1320 315 L1305 315 L1330 270 L1355 315 L1340 315 L1365 360 L1350 360 L1350 400 Z" fill="#059669"/>
      </g>

      {/* Ground */}
      <rect x="0" y="390" width="1440" height="10" fill="#86efac"/>
    </svg>
  );
}

function FloatingLeaf({ delay, x, duration }: { delay: number; x: string; duration: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: [0, 100, 200, 300],
        opacity: [0, 1, 1, 0],
        rotate: [0, 45, -30, 60],
        x: [0, 20, -20, 30]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Leaf className="w-6 h-6 text-emerald-400" />
    </motion.div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Global scroll progress for parallax effects
  const { scrollYProgress } = useScroll();

  // Hero parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const sunY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const sunScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const sunRotate = useTransform(scrollYProgress, [0, 0.3], [0, 30]);
  const treesY = useTransform(scrollYProgress, [0, 0.15], [0, 30]);
  const cloudsX1 = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const cloudsX2 = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const birdsX = useTransform(scrollYProgress, [0, 0.25], [0, 200]);

  // Problem section parallax
  const problemBgY = useTransform(scrollYProgress, [0.1, 0.4], [50, -50]);
  const floatingShape1 = useTransform(scrollYProgress, [0.15, 0.5], [0, -80]);
  const floatingShape2 = useTransform(scrollYProgress, [0.2, 0.55], [30, -60]);

  // How it works parallax
  const stepScale = useTransform(scrollYProgress, [0.35, 0.5], [0.95, 1]);
  const bgTreesY = useTransform(scrollYProgress, [0.4, 0.7], [50, -30]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-emerald-50 text-slate-800 overflow-x-hidden">
      {/* Floating leaves animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <FloatingLeaf delay={0} x="10%" duration={8} />
        <FloatingLeaf delay={2} x="25%" duration={10} />
        <FloatingLeaf delay={4} x="40%" duration={9} />
        <FloatingLeaf delay={1} x="60%" duration={11} />
        <FloatingLeaf delay={3} x="75%" duration={8} />
        <FloatingLeaf delay={5} x="90%" duration={10} />
      </div>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-emerald-100 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
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
          <nav className="hidden md:flex items-center gap-8">
            {["The Problem", "How It Works", "Pricing"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-[15px] font-semibold text-slate-600 hover:text-emerald-600 transition-colors relative"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 font-semibold"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 shadow-lg shadow-emerald-200 font-semibold px-6">
                  Start Free Trial
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative pt-32 pb-0 min-h-screen flex flex-col">
        {/* Parallax animated sun */}
        <motion.div
          className="absolute top-24 right-20 text-amber-300"
          style={{ y: sunY, scale: sunScale, rotate: sunRotate }}
          animate={{ filter: ["drop-shadow(0 0 20px rgba(251, 191, 36, 0.3))", "drop-shadow(0 0 40px rgba(251, 191, 36, 0.5))", "drop-shadow(0 0 20px rgba(251, 191, 36, 0.3))"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sun className="w-32 h-32" />
        </motion.div>

        {/* Parallax floating clouds */}
        <motion.div
          className="absolute top-32 left-[10%] w-24 h-12 bg-white/60 rounded-full blur-sm"
          style={{ x: cloudsX1 }}
        />
        <motion.div
          className="absolute top-40 left-[60%] w-32 h-16 bg-white/50 rounded-full blur-sm"
          style={{ x: cloudsX2 }}
        />
        <motion.div
          className="absolute top-48 left-[30%] w-20 h-10 bg-white/40 rounded-full blur-sm"
          style={{ x: cloudsX1 }}
        />

        {/* Parallax flying birds */}
        <motion.div
          className="absolute top-40 left-1/4"
          style={{ x: birdsX }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bird className="w-8 h-8 text-slate-400" />
        </motion.div>
        <motion.div
          className="absolute top-52 left-1/3"
          style={{ x: cloudsX2 }}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Bird className="w-6 h-6 text-slate-300" />
        </motion.div>
        <motion.div
          className="absolute top-36 right-1/4"
          style={{ x: cloudsX1 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Bird className="w-5 h-5 text-slate-300" />
        </motion.div>

        <motion.div
          className="container mx-auto px-6 relative flex-1 flex flex-col justify-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 mb-10 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
              </motion.div>
              <span className="text-sm font-bold text-emerald-700 tracking-wide">
                Built for campground owners, by campground owners
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.95] tracking-tight mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-slate-800">Update your</span>
              <br />
              <span className="text-slate-800">campground </span>
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
                everywhere
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Change your hours, rates, or amenities once — sync to Google, Facebook,
              Campendium, The Dyrt, and 10+ more directories instantly.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/signup">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-lg px-10 h-16 shadow-2xl shadow-emerald-300 group font-bold tracking-tight rounded-2xl"
                  >
                    Start 14-Day Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    try {
                      console.log("Demo mode button clicked from landing page");
                      enableDemoMode();
                      console.log("Demo mode enabled");
                      toast.success("Demo mode enabled! Redirecting...");
                      // Use window.location for more reliable navigation
                      window.location.href = "/dashboard";
                    } catch (error) {
                      console.error("Error enabling demo mode:", error);
                      toast.error("Failed to enable demo mode");
                    }
                  }}
                  className="text-lg px-10 h-16 border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold tracking-tight rounded-2xl group"
                >
                  <Play className="mr-2 w-5 h-5 text-amber-500" />
                  Try Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-sm text-slate-500 flex items-center justify-center gap-6 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="flex items-center gap-1.5">
                <Check className="w-5 h-5 text-emerald-500" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-5 h-5 text-emerald-500" /> Setup in 5 minutes
              </span>
            </motion.p>
          </div>
        </motion.div>

        {/* Parallax trees background at bottom */}
        <div className="relative mt-auto overflow-visible">
          <motion.div style={{ y: treesY }}>
            <TreesBackground className="w-full h-64 md:h-80" />
          </motion.div>
        </div>
      </section>

      {/* Directory badges - floating above trees */}
      <section className="relative -mt-32 pb-16 z-10">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-emerald-200/50 p-8 border border-emerald-100"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-center text-xs font-bold text-slate-500 mb-6 uppercase tracking-[0.25em]">
              One update syncs to all these directories
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {DIRECTORIES.map((dir, i) => (
                <motion.div
                  key={dir}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-default"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {i % 3 === 0 ? (
                    <Globe className="w-4 h-4 text-sky-500" />
                  ) : i % 3 === 1 ? (
                    <Tent className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Mountain className="w-4 h-4 text-green-600" />
                  )}
                  <span className="text-sm font-semibold text-slate-700">{dir}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="the-problem" className="relative py-32 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden">
        {/* Parallax background decoration */}
        <motion.div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-100 to-transparent opacity-50"
          style={{ y: problemBgY }}
        />
        {/* Parallax floating shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 blur-xl"
          style={{ y: floatingShape1 }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-red-200 rounded-full opacity-20 blur-xl"
          style={{ y: floatingShape2 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-amber-200 rounded-full opacity-15 blur-xl"
          style={{ y: floatingShape1 }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 shadow-sm mb-8">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">The Challenge</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 text-slate-800">
                Managing listings is
                <br />
                <span className="text-red-500">a nightmare</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Your campground appears on 10+ websites. Each with different logins,
                interfaces, and update processes.
              </p>
            </motion.div>

            {/* Before/After comparison */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <motion.div
                className="p-10 rounded-3xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30" />
                <div className="flex items-center gap-3 mb-10 relative">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 10 }}
                  >
                    <XCircle className="w-7 h-7 text-red-500" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-red-600 tracking-tight">Without CampCite</h3>
                </div>
                <ul className="space-y-5 relative">
                  {[
                    "Log into 10+ different websites",
                    "Remember different passwords",
                    "Copy-paste info repeatedly",
                    "Spend 4-6 hours per update",
                    "Miss sites, lose bookings",
                    "Frustrated customers",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-lg text-slate-700 font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* After */}
              <motion.div
                className="p-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30" />
                <div className="flex items-center gap-3 mb-10 relative">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: -10 }}
                  >
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-emerald-700 tracking-tight">With CampCite</h3>
                </div>
                <ul className="space-y-5 relative">
                  {[
                    "One dashboard for everything",
                    "Update once, sync everywhere",
                    "See all listings side-by-side",
                    "Done in 5 minutes",
                    "Never miss a directory",
                    "Happy campers always",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Check className="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-lg text-slate-700 font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 bg-white overflow-hidden">
        {/* Background trees */}
        <div className="absolute bottom-0 left-0 right-0 opacity-10">
          <TreesBackground className="w-full h-64" />
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 border border-sky-200 shadow-sm mb-8">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Simple as 1-2-3</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 text-slate-800">
              How it works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps. Never manually update a listing again.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: 1, icon: MapPin, title: "Connect", desc: "Link your Google, Facebook, Campendium, and other accounts", color: "from-sky-400 to-blue-500", shadow: "shadow-sky-300" },
                { step: 2, icon: Edit3, title: "Edit", desc: "Update your info once in the CampCite dashboard", color: "from-emerald-400 to-green-500", shadow: "shadow-emerald-300" },
                { step: 3, icon: Upload, title: "Sync", desc: "Click sync and watch all directories update automatically", color: "from-amber-400 to-orange-500", shadow: "shadow-amber-300" },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  {i < 2 && (
                    <div className="hidden md:block absolute top-16 left-[60%] w-full h-1 bg-gradient-to-r from-slate-200 to-transparent rounded-full z-0" />
                  )}
                  <motion.div
                    className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-8 shadow-2xl ${item.shadow} relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  <span className="inline-block w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-black text-lg leading-10 mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight mb-3 text-slate-800">{item.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Sync animation demo */}
            <motion.div
              className="mt-24 p-10 rounded-3xl bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50 border-2 border-emerald-200 shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 w-full p-8 rounded-2xl bg-white border-2 border-emerald-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Tent className="w-6 h-6 text-emerald-600" />
                    <p className="font-bold text-slate-700">Your Dashboard</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Hours", value: "8am - 8pm" },
                      { label: "Rate", value: "$45/night" },
                      { label: "WiFi", value: "Free" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                        <span className="text-slate-600 font-medium">{row.label}</span>
                        <span className="text-emerald-600 font-mono font-bold">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="flex flex-col items-center gap-3"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <RefreshCw className="w-12 h-12 text-emerald-500" />
                  <span className="text-sm text-emerald-600 font-bold">Syncing...</span>
                </motion.div>

                <div className="flex-1 w-full grid grid-cols-2 gap-4">
                  {["Google", "Facebook", "Campendium", "The Dyrt"].map((site, i) => (
                    <motion.div
                      key={site}
                      className="p-5 rounded-2xl bg-white border-2 border-emerald-300 flex items-center gap-3 shadow-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700 font-semibold">{site}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-32 bg-gradient-to-b from-white via-sky-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 shadow-sm mb-8">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
              Everything you need
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Zap, title: "One-Click Sync", desc: "Update everywhere instantly", color: "from-amber-400 to-orange-500", bg: "bg-amber-50" },
              { icon: Shield, title: "Accuracy Alerts", desc: "Know when data drifts", color: "from-emerald-400 to-green-500", bg: "bg-emerald-50" },
              { icon: Clock, title: "Auto-Scheduling", desc: "Set it and forget it", color: "from-sky-400 to-blue-500", bg: "bg-sky-50" },
              { icon: TrendingUp, title: "Analytics", desc: "Track your performance", color: "from-violet-400 to-purple-500", bg: "bg-violet-50" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className={`group p-8 rounded-3xl ${feature.bg} border-2 border-transparent hover:border-emerald-200 shadow-lg hover:shadow-2xl transition-all cursor-default`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 10 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold tracking-tight mb-2 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-24 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10"><Trees className="w-24 h-24 text-white" /></div>
          <div className="absolute bottom-10 right-10"><Mountain className="w-32 h-32 text-white" /></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Campgrounds" },
              { value: "50K+", label: "Listings" },
              { value: "98%", label: "Savings vs Yext" },
              { value: "4.9", label: "Rating", star: true },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className="text-5xl sm:text-6xl font-black text-white flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                  {stat.star && <Star className="w-8 h-8 text-amber-300 fill-amber-300" />}
                </motion.div>
                <p className="text-emerald-100 mt-2 font-semibold text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-32 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 shadow-sm mb-8">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
              Loved by campground owners
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.author}
                className="p-8 rounded-3xl bg-white border-2 border-slate-100 shadow-xl hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-6 h-6 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed italic">
                  &quot;{t.quote}&quot;
                </p>
                <div className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-6">
                  {t.metric}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{t.author}</p>
                    <p className="text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 shadow-sm mb-8">
              <Mountain className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Pricing</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 text-slate-800">
              Simple, fair pricing
            </h2>
            <p className="text-xl text-slate-600">
              98% cheaper than Yext. Built for campgrounds.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center pt-8">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`relative rounded-3xl p-10 overflow-visible ${
                  plan.popular
                    ? "bg-gradient-to-br from-emerald-500 to-green-600 shadow-2xl shadow-emerald-300 md:scale-105 z-10"
                    : "bg-white border-2 border-slate-200 hover:border-emerald-200 hover:shadow-xl"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={!plan.popular ? { y: -5 } : {}}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <motion.span
                      className="bg-amber-400 text-amber-900 text-sm font-black px-6 py-2 rounded-full shadow-xl uppercase tracking-wider whitespace-nowrap"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Most Popular
                    </motion.span>
                  </div>
                )}

                <h3 className={`text-2xl font-black ${plan.popular ? "text-white" : "text-slate-800"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.popular ? "text-emerald-100" : "text-slate-500"}`}>
                  {plan.description}
                </p>

                <div className="mt-8 mb-8">
                  <span className={`text-6xl font-black ${plan.popular ? "text-white" : "text-slate-800"}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-xl font-semibold ${plan.popular ? "text-emerald-100" : "text-slate-500"}`}>
                    /mo
                  </span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-6 h-6 mt-0.5 flex-shrink-0 ${plan.popular ? "text-emerald-200" : "text-emerald-500"}`} />
                      <span className={`text-lg ${plan.popular ? "text-white" : "text-slate-700"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className="block">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className={`w-full h-14 font-bold text-lg rounded-2xl ${
                        plan.popular
                          ? "bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl"
                          : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-200"
                      }`}
                    >
                      Start Free Trial
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        {/* Nature background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600" />
          <div className="absolute bottom-0 left-0 right-0 opacity-20">
            <TreesBackground className="w-full h-64" />
          </div>
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-8 text-white"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to get started?
            </motion.h2>
            <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 500+ campgrounds saving hours every month with CampCite.
            </p>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 text-xl px-12 h-16 font-black shadow-2xl rounded-2xl"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </motion.div>
            </Link>
            <p className="text-emerald-100 mt-8 font-semibold">
              14-day free trial • No credit card • Setup in 5 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg">
                <Tent className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">CampCite</span>
            </div>
            <nav className="flex gap-8 text-sm font-semibold text-slate-400">
              {["Privacy", "Terms", "Support", "Contact"].map((item) => (
                <a key={item} href="#" className="hover:text-emerald-400 transition-colors">
                  {item}
                </a>
              ))}
            </nav>
            <p className="text-slate-500 font-medium">
              © 2025 CampCite. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
