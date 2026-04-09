"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { isDemoMode, DEMO_CAMPGROUND } from "@/lib/demo-auth";
import {
  Tent,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
  Home,
  Wifi,
  DollarSign,
  Shield,
  RefreshCw,
  Sparkles,
  Save,
  ArrowLeft,
} from "lucide-react";
import type { Campground, CampgroundAttributes } from "@/types/database";

interface CampgroundFormData {
  name: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  website?: string;
  email?: string;
  description?: string;
  attributes: CampgroundAttributes;
}

function DemoCampgroundPage() {
  const router = useRouter();
  const campground = DEMO_CAMPGROUND;

  return (
    <div className="max-w-4xl">
      {/* Demo Banner */}
      <motion.div
        className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200 text-amber-800 px-4 py-3 rounded-xl flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Sparkles className="w-5 h-5 text-amber-500" />
        <p className="text-sm font-medium">
          Demo Mode: Changes won&apos;t be saved. Sign up to manage your real campground!
        </p>
      </motion.div>

      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <Tent className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Edit Campground</h1>
          <p className="text-slate-500">Update your campground information</p>
        </div>
      </motion.div>

      <form>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-white border-2 border-slate-100 p-1 rounded-xl">
            <TabsTrigger value="basic" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">
              <MapPin className="w-4 h-4 mr-2" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">
              <FileText className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="sites" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">
              <Home className="w-4 h-4 mr-2" />
              Sites
            </TabsTrigger>
            <TabsTrigger value="amenities" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">
              <Wifi className="w-4 h-4 mr-2" />
              Amenities
            </TabsTrigger>
            <TabsTrigger value="policies" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">
              <Shield className="w-4 h-4 mr-2" />
              Policies
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">
              <DollarSign className="w-4 h-4 mr-2" />
              Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                  <CardTitle className="flex items-center gap-2 text-emerald-700">
                    <MapPin className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-semibold text-slate-700">Campground Name *</Label>
                    <Input
                      id="name"
                      defaultValue={campground.name}
                      className="h-12 border-2 border-slate-200 rounded-xl focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-semibold text-slate-700">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        defaultValue={campground.phone}
                        className="h-12 border-2 border-slate-200 rounded-xl focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-semibold text-slate-700">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={campground.email}
                        className="h-12 border-2 border-slate-200 rounded-xl focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="font-semibold text-slate-700">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      defaultValue={campground.website}
                      className="h-12 border-2 border-slate-200 rounded-xl focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="street_address" className="font-semibold text-slate-700">Street Address *</Label>
                    <Input
                      id="street_address"
                      defaultValue={campground.address}
                      className="h-12 border-2 border-slate-200 rounded-xl focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="font-semibold text-slate-700">City *</Label>
                      <Input
                        id="city"
                        defaultValue={campground.city}
                        className="h-12 border-2 border-slate-200 rounded-xl focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="font-semibold text-slate-700">State *</Label>
                      <Input
                        id="state"
                        defaultValue={campground.state}
                        className="h-12 border-2 border-slate-200 rounded-xl focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip_code" className="font-semibold text-slate-700">ZIP Code *</Label>
                      <Input
                        id="zip_code"
                        defaultValue={campground.zip}
                        className="h-12 border-2 border-slate-200 rounded-xl focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="details">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <FileText className="w-5 h-5" />
                  Description & Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-semibold text-slate-700">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={campground.description}
                    className="min-h-32 border-2 border-slate-200 rounded-xl focus:border-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-semibold text-slate-700">Check-in Time</Label>
                    <Input defaultValue={campground.attributes.policies.checkIn} className="h-12 border-2 border-slate-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold text-slate-700">Check-out Time</Label>
                    <Input defaultValue={campground.attributes.policies.checkOut} className="h-12 border-2 border-slate-200 rounded-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sites">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Home className="w-5 h-5" />
                  Site Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-500 text-center py-8">Site configuration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amenities">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Wifi className="w-5 h-5" />
                  Amenities
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {campground.attributes.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="font-medium text-slate-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Shield className="w-5 h-5" />
                  Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <Checkbox checked={campground.attributes.policies.pets} />
                    <Label className="font-medium">Pets Allowed</Label>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <Label className="font-semibold text-slate-700">Max Stay</Label>
                    <p className="text-slate-600">{campground.attributes.policies.maxStay} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <DollarSign className="w-5 h-5" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-xl text-center">
                    <p className="text-sm text-slate-500 mb-1">Nightly</p>
                    <p className="text-2xl font-bold text-emerald-600">${campground.attributes.pricing.nightly}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl text-center">
                    <p className="text-sm text-slate-500 mb-1">Weekly</p>
                    <p className="text-2xl font-bold text-emerald-600">${campground.attributes.pricing.weekly}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl text-center">
                    <p className="text-sm text-slate-500 mb-1">Monthly</p>
                    <p className="text-2xl font-bold text-emerald-600">${campground.attributes.pricing.monthly}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="button"
            onClick={() => toast.info("Demo mode: Changes not saved")}
            className="h-12 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-200 rounded-xl font-semibold"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="h-12 px-6 border-2 border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </motion.div>
      </form>
    </div>
  );
}

function RealCampgroundPage() {
  const supabase = createClient();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id || null);
    });
  }, [supabase.auth]);

  const { data: campground, isLoading } = useQuery({
    queryKey: ["campground", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await supabase
        .from("campgrounds")
        .select("*")
        .eq("user_id", userId)
        .single();
      return data as Campground | null;
    },
    enabled: !!userId,
  });

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<CampgroundFormData>({
      defaultValues: {
        name: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
        website: "",
        email: "",
        description: "",
        attributes: {},
      },
    });

  useEffect(() => {
    if (campground) {
      reset({
        name: campground.name,
        street_address: campground.street_address,
        city: campground.city,
        state: campground.state,
        zip_code: campground.zip_code,
        phone: campground.phone,
        website: campground.website || "",
        email: campground.email || "",
        description: campground.description || "",
        attributes: campground.attributes || {},
      });
    }
  }, [campground, reset]);

  const mutation = useMutation({
    mutationFn: async (data: CampgroundFormData) => {
      if (campground) {
        const { error } = await supabase
          .from("campgrounds")
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq("id", campground.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("campgrounds").insert({
          ...data,
          user_id: userId,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Campground saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["campground"] });
    },
    onError: (error) => {
      toast.error(`Error saving: ${error.message}`);
    },
  });

  const onSubmit = (data: CampgroundFormData) => {
    mutation.mutate(data);
  };

  const attributes = watch("attributes") || {};

  const setAttributeValue = (
    path: string,
    value: boolean | string | number | undefined
  ) => {
    const parts = path.split(".");
    const newAttributes = { ...attributes };
    let current: Record<string, unknown> = newAttributes;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Record<string, unknown>;
    }

    current[parts[parts.length - 1]] = value;
    setValue("attributes", newAttributes as CampgroundAttributes);
  };

  const getAttributeValue = (path: string): unknown => {
    const parts = path.split(".");
    let current: unknown = attributes;

    for (const part of parts) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined;
      }
      current = (current as Record<string, unknown>)[part];
    }

    return current;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <Tent className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">
            {campground ? "Edit Campground" : "Add Campground"}
          </h1>
          <p className="text-slate-500">
            {campground ? "Update your campground information" : "Add your campground to get started"}
          </p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-white border-2 border-slate-100 p-1 rounded-xl flex flex-wrap">
            <TabsTrigger value="basic" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">Basic Info</TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">Details</TabsTrigger>
            <TabsTrigger value="sites" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">Sites</TabsTrigger>
            <TabsTrigger value="amenities" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">Amenities</TabsTrigger>
            <TabsTrigger value="policies" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">Policies</TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="text-emerald-700">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold">Campground Name *</Label>
                  <Input
                    id="name"
                    {...register("name", { required: true })}
                    placeholder="Happy Valley Campground"
                    className="h-12 border-2 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-semibold">Phone *</Label>
                    <Input
                      id="phone"
                      {...register("phone", { required: true })}
                      placeholder="(555) 123-4567"
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="info@campground.com"
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="font-semibold">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    {...register("website")}
                    placeholder="https://www.campground.com"
                    className="h-12 border-2 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street_address" className="font-semibold">Street Address *</Label>
                  <Input
                    id="street_address"
                    {...register("street_address", { required: true })}
                    placeholder="123 Forest Road"
                    className="h-12 border-2 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="font-semibold">City *</Label>
                    <Input
                      id="city"
                      {...register("city", { required: true })}
                      placeholder="Pine City"
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="font-semibold">State *</Label>
                    <Input
                      id="state"
                      {...register("state", { required: true })}
                      placeholder="OR"
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip_code" className="font-semibold">ZIP Code *</Label>
                    <Input
                      id="zip_code"
                      {...register("zip_code", { required: true })}
                      placeholder="97001"
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="text-emerald-700">Description & Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-semibold">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Tell visitors about your campground..."
                    className="h-32 border-2 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">Check-in Time</Label>
                    <Input
                      placeholder="2:00 PM"
                      value={(getAttributeValue("hours.checkin_time") as string) || ""}
                      onChange={(e) =>
                        setAttributeValue("hours.checkin_time", e.target.value)
                      }
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold">Check-out Time</Label>
                    <Input
                      placeholder="11:00 AM"
                      value={(getAttributeValue("hours.checkout_time") as string) || ""}
                      onChange={(e) =>
                        setAttributeValue("hours.checkout_time", e.target.value)
                      }
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="year_round"
                      checked={!!getAttributeValue("seasons.year_round")}
                      onCheckedChange={(checked) =>
                        setAttributeValue("seasons.year_round", !!checked)
                      }
                    />
                    <Label htmlFor="year_round" className="font-semibold">Open year-round</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sites">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="text-emerald-700">Site Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">Total Sites</Label>
                    <Input
                      type="number"
                      value={(getAttributeValue("sites.total_sites") as number) || ""}
                      onChange={(e) =>
                        setAttributeValue(
                          "sites.total_sites",
                          parseInt(e.target.value) || undefined
                        )
                      }
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold">RV Sites</Label>
                    <Input
                      type="number"
                      value={(getAttributeValue("sites.rv_sites") as number) || ""}
                      onChange={(e) =>
                        setAttributeValue(
                          "sites.rv_sites",
                          parseInt(e.target.value) || undefined
                        )
                      }
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold">Tent Sites</Label>
                    <Input
                      type="number"
                      value={(getAttributeValue("sites.tent_sites") as number) || ""}
                      onChange={(e) =>
                        setAttributeValue(
                          "sites.tent_sites",
                          parseInt(e.target.value) || undefined
                        )
                      }
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Hookups</Label>
                  <div className="flex flex-wrap gap-4">
                    {["water", "electric", "sewer"].map((hookup) => (
                      <div key={hookup} className="flex items-center gap-2">
                        <Checkbox
                          id={hookup}
                          checked={!!getAttributeValue(`hookups.${hookup}`)}
                          onCheckedChange={(checked) =>
                            setAttributeValue(`hookups.${hookup}`, !!checked)
                          }
                        />
                        <Label htmlFor={hookup} className="capitalize font-medium">
                          {hookup}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amenities">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="text-emerald-700">Amenities</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: "restrooms", label: "Restrooms" },
                    { id: "showers", label: "Showers" },
                    { id: "laundry", label: "Laundry" },
                    { id: "dump_station", label: "Dump Station" },
                    { id: "camp_store", label: "Camp Store" },
                    { id: "pool", label: "Pool" },
                    { id: "hot_tub", label: "Hot Tub" },
                    { id: "playground", label: "Playground" },
                    { id: "dog_park", label: "Dog Park" },
                    { id: "wifi", label: "WiFi", path: "utilities" },
                    { id: "fishing", label: "Fishing" },
                    { id: "hiking_trails", label: "Hiking Trails" },
                  ].map((amenity) => {
                    const path = amenity.path || "amenities";
                    return (
                      <div key={amenity.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                        <Checkbox
                          id={amenity.id}
                          checked={!!getAttributeValue(`${path}.${amenity.id}`)}
                          onCheckedChange={(checked) =>
                            setAttributeValue(`${path}.${amenity.id}`, !!checked)
                          }
                        />
                        <Label htmlFor={amenity.id} className="font-medium">{amenity.label}</Label>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="text-emerald-700">Policies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                  <Checkbox
                    id="pets_allowed"
                    checked={!!getAttributeValue("policies.pets_allowed")}
                    onCheckedChange={(checked) =>
                      setAttributeValue("policies.pets_allowed", !!checked)
                    }
                  />
                  <Label htmlFor="pets_allowed" className="font-medium">Pets Allowed</Label>
                </div>

                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                  <Checkbox
                    id="fires_allowed"
                    checked={!!getAttributeValue("policies.fires_allowed")}
                    onCheckedChange={(checked) =>
                      setAttributeValue("policies.fires_allowed", !!checked)
                    }
                  />
                  <Label htmlFor="fires_allowed" className="font-medium">Fires Allowed</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card className="border-2 border-slate-100 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
                <CardTitle className="text-emerald-700">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">RV Rate (Min $/night)</Label>
                    <Input type="number" placeholder="35" className="h-12 border-2 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold">RV Rate (Max $/night)</Label>
                    <Input type="number" placeholder="65" className="h-12 border-2 rounded-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 mt-8">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-12 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-200 rounded-xl font-semibold"
          >
            <Save className="w-4 h-4 mr-2" />
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="h-12 px-6 border-2 rounded-xl font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function CampgroundPage() {
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

  return isDemo ? <DemoCampgroundPage /> : <RealCampgroundPage />;
}
