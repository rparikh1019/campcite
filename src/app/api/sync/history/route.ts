import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's campground
  const { data: campground } = await supabase
    .from("campgrounds")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!campground) {
    return NextResponse.json([]);
  }

  const { data: jobs, error } = await supabase
    .from("sync_jobs")
    .select("*")
    .eq("campground_id", campground.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(jobs);
}
