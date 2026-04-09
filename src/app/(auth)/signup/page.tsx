"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, ArrowLeft, Mail, Lock, ArrowRight, Tent, Sparkles, Trees, Play } from "lucide-react";
import { motion } from "framer-motion";
import { enableDemoMode } from "@/lib/demo-auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // If Supabase isn't configured, redirect to demo mode
    if (!supabase) {
      enableDemoMode();
      toast.success("Supabase not configured. Starting demo mode...");
      window.location.href = "/dashboard";
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setConfirmationSent(true);
    setLoading(false);
  };

  if (confirmationSent) {
    return (
      <div className="w-full max-w-md">
        <motion.div
          className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-sm border-2 border-emerald-100 shadow-2xl shadow-emerald-200/50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
            >
              <Mail className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-2xl font-extrabold tracking-tight mb-2 text-slate-800">
              Check your email
            </h1>
            <p className="text-slate-500 mb-2">
              We sent a confirmation link to
            </p>
            <p className="text-emerald-600 font-bold mb-6">{email}</p>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 mb-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Click the link in your email to activate your account. If you
                don&apos;t see it, check your spam folder.
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={() => setConfirmationSent(false)}
              className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to signup
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <motion.div
        className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-sm border-2 border-emerald-100 shadow-2xl shadow-emerald-200/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Free Trial</span>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-slate-800">
            Start your free trial
          </h1>
          <p className="text-slate-500">
            14 days free, no credit card required
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@campground.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12 h-14 bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                className="pl-12 h-14 bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl text-base"
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-lg shadow-lg shadow-emerald-200 rounded-xl group"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-bold tracking-wider">
              Or
            </span>
          </div>
        </div>

        {/* Demo Mode Button */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              try {
                console.log("Demo mode button clicked");
                enableDemoMode();
                console.log("Demo mode enabled in localStorage");
                toast.success("Demo mode enabled! Redirecting...");
                console.log("Navigating to dashboard");
                // Use window.location for more reliable navigation
                window.location.href = "/dashboard";
              } catch (error) {
                console.error("Error enabling demo mode:", error);
                toast.error("Failed to enable demo mode");
              }
            }}
            className="w-full h-14 border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-lg rounded-xl group"
          >
            <Play className="w-5 h-5 mr-2 text-amber-500" />
            Try Demo Mode
          </Button>
        </motion.div>
        <p className="text-center text-xs text-slate-400 mt-2">
          Explore the app with sample data, no account needed
        </p>

        {/* Benefits */}
        <div className="mt-8 pt-6 border-t-2 border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Trees className="w-4 h-4 text-emerald-500" />
            What you get
          </p>
          <ul className="space-y-3">
            {[
              "Sync to 10+ camping directories",
              "Google & Facebook integration",
              "Automatic listing updates",
              "14-day free trial",
            ].map((benefit, i) => (
              <motion.li
                key={benefit}
                className="flex items-center gap-3 text-sm text-slate-600 font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
          By signing up, you agree to our{" "}
          <a href="#" className="text-emerald-600 hover:underline font-medium">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-emerald-600 hover:underline font-medium">
            Privacy Policy
          </a>
        </p>
      </motion.div>

      {/* Sign in link */}
      <motion.p
        className="text-center text-sm text-slate-600 mt-6 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-emerald-600 hover:text-emerald-700 font-bold"
        >
          Sign in
        </Link>
      </motion.p>
    </div>
  );
}
