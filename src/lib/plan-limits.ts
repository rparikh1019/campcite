// Plan limits and enforcement

export const PLAN_LIMITS = {
  trial: { directories: 6, syncFrequency: "biweekly" as const },
  starter: { directories: 6, syncFrequency: "monthly" as const },
  growth: { directories: 10, syncFrequency: "biweekly" as const },
  pro: { directories: 12, syncFrequency: "weekly" as const },
};

export const PLAN_DIRECTORIES = {
  starter: [
    "google",
    "facebook",
    "bing",
    "campendium",
    "the_dyrt",
    "rv_life",
  ],
  growth: [
    "google",
    "facebook",
    "bing",
    "campendium",
    "the_dyrt",
    "rv_life",
    "apple",
    "good_sam",
    "allstays",
    "hipcamp",
  ],
  pro: [
    "google",
    "facebook",
    "bing",
    "campendium",
    "the_dyrt",
    "rv_life",
    "apple",
    "good_sam",
    "allstays",
    "hipcamp",
    "yelp",
    "tripadvisor",
  ],
};

export type Plan = keyof typeof PLAN_LIMITS;

export function canConnectDirectory(
  plan: Plan,
  currentCount: number
): boolean {
  return currentCount < PLAN_LIMITS[plan].directories;
}

export function canAccessDirectory(plan: Plan, directory: string): boolean {
  const trial = plan === "trial" ? "starter" : plan;
  const allowedDirectories = PLAN_DIRECTORIES[trial] || PLAN_DIRECTORIES.starter;
  return allowedDirectories.includes(directory);
}

export function getPlanPrice(plan: Plan, annual: boolean = false): number {
  const prices = {
    trial: 0,
    starter: annual ? 90 : 9,
    growth: annual ? 190 : 19,
    pro: annual ? 490 : 49,
  };
  return prices[plan];
}

export function getPlanName(plan: Plan): string {
  const names = {
    trial: "Free Trial",
    starter: "Starter",
    growth: "Growth",
    pro: "Pro",
  };
  return names[plan];
}
