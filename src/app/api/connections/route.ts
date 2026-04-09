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

  const { data: connections, error } = await supabase
    .from("directory_connections")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(connections);
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { directory, access_token, refresh_token, external_id, external_url } =
    await request.json();

  const { data, error } = await supabase
    .from("directory_connections")
    .upsert({
      user_id: user.id,
      directory,
      access_token,
      refresh_token,
      external_id,
      external_url,
      status: "connected",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const directory = searchParams.get("directory");

  if (!directory) {
    return NextResponse.json(
      { error: "Directory required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("directory_connections")
    .delete()
    .eq("user_id", user.id)
    .eq("directory", directory);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
