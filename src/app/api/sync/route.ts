import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { directory } = await request.json();

  // Get user's campground
  const { data: campground, error: campgroundError } = await supabase
    .from("campgrounds")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (campgroundError || !campground) {
    return NextResponse.json(
      { error: "No campground found" },
      { status: 404 }
    );
  }

  // Get user's connections
  const { data: connections } = await supabase
    .from("directory_connections")
    .select("directory")
    .eq("user_id", user.id)
    .eq("status", "connected");

  const directoriesToSync = directory
    ? [directory]
    : connections?.map((c) => c.directory) || [];

  if (directoriesToSync.length === 0) {
    return NextResponse.json(
      { error: "No directories connected" },
      { status: 400 }
    );
  }

  // Create sync jobs for each directory
  const jobs = directoriesToSync.map((dir) => ({
    campground_id: campground.id,
    directory: dir,
    priority: 10, // High priority for manual sync
  }));

  const { data: createdJobs, error: jobError } = await supabase
    .from("sync_jobs")
    .insert(jobs)
    .select();

  if (jobError) {
    return NextResponse.json({ error: jobError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: `Scheduled sync for ${directoriesToSync.length} directories`,
    jobs: createdJobs,
  });
}
