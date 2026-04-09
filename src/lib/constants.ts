// Application constants

export const DIRECTORIES = [
  {
    id: "google",
    name: "Google Business",
    icon: "🔍",
    type: "api",
    tier: "starter",
    description: "Critical for local search",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    type: "api",
    tier: "starter",
    description: "Social proof and reviews",
  },
  {
    id: "bing",
    name: "Bing Places",
    icon: "🔎",
    type: "api",
    tier: "starter",
    description: "Powers Yahoo, DuckDuckGo",
  },
  {
    id: "campendium",
    name: "Campendium",
    icon: "🏕️",
    type: "browser",
    tier: "starter",
    description: "Popular camping directory",
  },
  {
    id: "the_dyrt",
    name: "The Dyrt",
    icon: "⛺",
    type: "browser",
    tier: "starter",
    description: "Top camping app",
  },
  {
    id: "rv_life",
    name: "RV LIFE",
    icon: "🚐",
    type: "browser",
    tier: "starter",
    description: "RV trip planning",
  },
  {
    id: "apple",
    name: "Apple Maps",
    icon: "🍎",
    type: "api",
    tier: "growth",
    description: "iOS users search here",
  },
  {
    id: "good_sam",
    name: "Good Sam",
    icon: "👍",
    type: "browser",
    tier: "growth",
    description: "RV club directory",
  },
  {
    id: "allstays",
    name: "Allstays",
    icon: "📍",
    type: "browser",
    tier: "growth",
    description: "Camping & RV stops",
  },
  {
    id: "hipcamp",
    name: "Hipcamp",
    icon: "🌲",
    type: "browser",
    tier: "growth",
    description: "Glamping & unique stays",
  },
  {
    id: "yelp",
    name: "Yelp",
    icon: "⭐",
    type: "browser",
    tier: "pro",
    description: "Reviews & discovery",
  },
  {
    id: "tripadvisor",
    name: "TripAdvisor",
    icon: "🦉",
    type: "browser",
    tier: "pro",
    description: "Travel reviews",
  },
] as const;

export type Directory = (typeof DIRECTORIES)[number];
export type DirectoryId = Directory["id"];

export const SYNC_STATUSES = {
  not_connected: { label: "Not Connected", color: "gray" },
  pending: { label: "Pending", color: "yellow" },
  connected: { label: "Connected", color: "blue" },
  syncing: { label: "Syncing...", color: "yellow" },
  synced: { label: "Synced", color: "green" },
  error: { label: "Error", color: "red" },
} as const;

export type SyncStatus = keyof typeof SYNC_STATUSES;
