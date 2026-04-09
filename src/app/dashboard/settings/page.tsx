"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { isDemoMode, DEMO_PROFILE } from "@/lib/demo-auth";
import {
  Settings,
  User,
  CreditCard,
  Shield,
  Sparkles,
  Check,
  RefreshCw,
  AlertTriangle,
  Mail,
} from "lucide-react";
import type { User as UserType } from "@/types/database";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    features: ["6 directories", "Monthly sync", "Email support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 19,
    features: ["10 directories", "Bi-weekly sync", "Priority support"],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    features: ["12+ directories", "Weekly sync", "Phone support"],
  },
];

function DemoSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Demo Banner */}
      <motion.div
        className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200 text-amber-800 px-4 py-3 rounded-xl flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Sparkles className="w-5 h-5 text-amber-500" />
        <p className="text-sm font-medium">
          Demo Mode: Settings changes won&apos;t be saved.
        </p>
      </motion.div>

      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <Settings className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Settings</h1>
          <p className="text-slate-500">Manage your account and subscription</p>
        </div>
      </motion.div>

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <User className="w-5 h-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="font-semibold text-slate-800">{DEMO_PROFILE.email}</p>
                  <p className="text-sm text-slate-500">Account email</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-semibold text-slate-800 flex items-center gap-2">
                  Current Plan:
                  <Badge className="bg-emerald-100 text-emerald-700 font-bold">
                    {DEMO_PROFILE.plan.charAt(0).toUpperCase() + DEMO_PROFILE.plan.slice(1)}
                  </Badge>
                </p>
                <p className="text-sm text-slate-500">
                  Full access to all features
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => toast.info("Demo mode: Billing not available")}
                className="border-2 rounded-xl font-semibold"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Manage Billing
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-2 border-slate-100 shadow-lg rounded-2xl overflow-visible">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-emerald-700">Upgrade Your Plan</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-3 gap-4 items-center">
              {PLANS.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  className={`relative border-2 rounded-2xl p-6 ${
                    plan.popular
                      ? "border-emerald-500 bg-gradient-to-b from-emerald-50 to-white shadow-lg shadow-emerald-100"
                      : "border-slate-200 bg-white"
                  } ${DEMO_PROFILE.plan === plan.id ? "ring-2 ring-emerald-500 ring-offset-2" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-lg z-10">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-800 mt-2">{plan.name}</h3>
                  <p className="text-3xl font-extrabold text-slate-800 mt-2">
                    ${plan.price}
                    <span className="text-sm font-normal text-slate-500">/mo</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-slate-600">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-4 h-12 font-semibold rounded-xl ${
                      DEMO_PROFILE.plan === plan.id
                        ? "bg-slate-100 text-slate-500"
                        : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-200"
                    }`}
                    disabled={DEMO_PROFILE.plan === plan.id}
                    onClick={() => toast.info("Demo mode: Upgrade not available")}
                  >
                    {DEMO_PROFILE.plan === plan.id ? "Current Plan" : "Upgrade"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-2 border-red-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
              <div>
                <p className="font-semibold text-slate-800">Delete Account</p>
                <p className="text-sm text-slate-500">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => toast.info("Demo mode: Account deletion not available")}
                className="rounded-xl font-semibold"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function RealSettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        setEmail(authUser.email || "");
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();
        setUser(profile as UserType);
      }
      setLoading(false);
    }
    fetchUser();
  }, [supabase]);

  const handleUpgrade = async (planId: string) => {
    toast.info(`Redirecting to checkout for ${planId} plan...`);
    if (user) {
      await supabase.from("users").update({ plan: planId }).eq("id", user.id);
      toast.success(`Upgraded to ${planId} plan!`);
      router.refresh();
    }
  };

  const handleManageBilling = async () => {
    toast.info("Redirecting to billing portal...");
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        await supabase.from("campgrounds").delete().eq("user_id", authUser.id);
        await supabase.from("users").delete().eq("id", authUser.id);
        await supabase.auth.signOut();
        router.push("/");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const getPlanBadge = () => {
    if (!user) return null;
    switch (user.plan) {
      case "trial":
        return <Badge className="bg-yellow-100 text-yellow-700">Trial</Badge>;
      case "starter":
        return <Badge className="bg-blue-100 text-blue-700">Starter</Badge>;
      case "growth":
        return <Badge className="bg-green-100 text-green-700">Growth</Badge>;
      case "pro":
        return <Badge className="bg-purple-100 text-purple-700">Pro</Badge>;
      default:
        return <Badge variant="secondary">{user.plan}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <Settings className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Settings</h1>
          <p className="text-slate-500">Manage your account and subscription</p>
        </div>
      </motion.div>

      {/* Account Info */}
      <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <User className="w-5 h-5" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{email}</p>
              <p className="text-sm text-slate-500">Account email</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold flex items-center gap-2">
                Current Plan: {getPlanBadge()}
              </p>
              {user?.plan === "trial" && user?.trial_ends_at && (
                <p className="text-sm text-slate-500">
                  Trial ends{" "}
                  {new Date(user.trial_ends_at).toLocaleDateString()}
                </p>
              )}
            </div>
            {user?.stripe_subscription_id && (
              <Button variant="outline" onClick={handleManageBilling} className="rounded-xl">
                Manage Billing
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Cards */}
      <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
          <CardTitle className="text-emerald-700">Upgrade Your Plan</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`border-2 rounded-2xl p-6 ${
                  plan.popular ? "border-emerald-500" : "border-slate-200"
                } ${user?.plan === plan.id ? "bg-emerald-50" : ""}`}
              >
                {plan.popular && (
                  <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mt-2">{plan.name}</h3>
                <p className="text-3xl font-extrabold">
                  ${plan.price}
                  <span className="text-sm font-normal text-slate-500">/mo</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-4 rounded-xl"
                  variant={user?.plan === plan.id ? "outline" : "default"}
                  disabled={user?.plan === plan.id}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {user?.plan === plan.id ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-2 border-red-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Delete Account</p>
              <p className="text-sm text-slate-500">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" onClick={handleDeleteAccount} className="rounded-xl">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
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

  return isDemo ? <DemoSettingsPage /> : <RealSettingsPage />;
}
