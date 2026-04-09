// Demo mode authentication for previewing the app without Supabase

export const DEMO_USER = {
  id: "demo-user-123",
  email: "demo@campcite.com",
  user_metadata: {
    full_name: "Demo User",
  },
  created_at: new Date().toISOString(),
};

export const DEMO_PROFILE = {
  id: "demo-user-123",
  email: "demo@campcite.com",
  full_name: "Demo User",
  plan: "growth",
  trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
  created_at: new Date().toISOString(),
};

export const DEMO_CAMPGROUND = {
  id: "demo-campground-123",
  user_id: "demo-user-123",
  name: "Pine Valley RV Resort",
  slug: "pine-valley-rv-resort",
  address: "123 Forest Road",
  city: "Lake Tahoe",
  state: "CA",
  zip: "96150",
  phone: "(555) 123-4567",
  email: "info@pinevalleyrvresort.com",
  website: "https://pinevalleyrvresort.com",
  description: "A beautiful RV resort nestled in the pines near Lake Tahoe. Full hookups, WiFi, and stunning mountain views.",
  attributes: {
    hours: {
      monday: { open: "08:00", close: "20:00" },
      tuesday: { open: "08:00", close: "20:00" },
      wednesday: { open: "08:00", close: "20:00" },
      thursday: { open: "08:00", close: "20:00" },
      friday: { open: "08:00", close: "21:00" },
      saturday: { open: "07:00", close: "21:00" },
      sunday: { open: "07:00", close: "20:00" },
    },
    amenities: ["WiFi", "Full Hookups", "Showers", "Laundry", "Camp Store", "Pool", "Playground", "Pet Friendly"],
    pricing: {
      nightly: 45,
      weekly: 280,
      monthly: 950,
    },
    policies: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      pets: true,
      maxStay: 30,
    },
  },
  created_at: new Date().toISOString(),
};

export const DEMO_DIRECTORIES = [
  {
    id: "dir-1",
    campground_id: "demo-campground-123",
    directory_type: "google_business",
    status: "connected",
    external_id: "google-123",
    last_synced_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    sync_status: "synced",
  },
  {
    id: "dir-2",
    campground_id: "demo-campground-123",
    directory_type: "facebook",
    status: "connected",
    external_id: "fb-456",
    last_synced_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    sync_status: "synced",
  },
  {
    id: "dir-3",
    campground_id: "demo-campground-123",
    directory_type: "campendium",
    status: "connected",
    external_id: "camp-789",
    last_synced_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    sync_status: "outdated",
  },
  {
    id: "dir-4",
    campground_id: "demo-campground-123",
    directory_type: "the_dyrt",
    status: "connected",
    external_id: "dyrt-101",
    last_synced_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    sync_status: "synced",
  },
  {
    id: "dir-5",
    campground_id: "demo-campground-123",
    directory_type: "hipcamp",
    status: "pending",
    external_id: null,
    last_synced_at: null,
    sync_status: "not_connected",
  },
  {
    id: "dir-6",
    campground_id: "demo-campground-123",
    directory_type: "rvlife",
    status: "pending",
    external_id: null,
    last_synced_at: null,
    sync_status: "not_connected",
  },
];

const DEMO_MODE_KEY = "campcite_demo_mode";

export function enableDemoMode() {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_MODE_KEY, "true");
  }
}

export function disableDemoMode() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DEMO_MODE_KEY);
  }
}

export function isDemoMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DEMO_MODE_KEY) === "true";
}

export function getDemoUser() {
  if (isDemoMode()) {
    return DEMO_USER;
  }
  return null;
}
