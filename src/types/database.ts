export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          plan: "trial" | "starter" | "growth" | "pro";
          trial_ends_at: string | null;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          payment_failed_at: string | null;
          payment_failure_count: number;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          plan?: "trial" | "starter" | "growth" | "pro";
          trial_ends_at?: string | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          payment_failed_at?: string | null;
          payment_failure_count?: number;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          plan?: "trial" | "starter" | "growth" | "pro";
          trial_ends_at?: string | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          payment_failed_at?: string | null;
          payment_failure_count?: number;
        };
      };
      campgrounds: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          street_address: string;
          city: string;
          state: string;
          zip_code: string;
          phone: string;
          website: string | null;
          email: string | null;
          latitude: number | null;
          longitude: number | null;
          description: string | null;
          attributes: CampgroundAttributes;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          street_address: string;
          city: string;
          state: string;
          zip_code: string;
          phone: string;
          website?: string | null;
          email?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          description?: string | null;
          attributes?: CampgroundAttributes;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          street_address?: string;
          city?: string;
          state?: string;
          zip_code?: string;
          phone?: string;
          website?: string | null;
          email?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          description?: string | null;
          attributes?: CampgroundAttributes;
          created_at?: string;
          updated_at?: string;
        };
      };
      campground_media: {
        Row: {
          id: string;
          campground_id: string;
          type: "photo" | "logo" | "video";
          url: string;
          caption: string | null;
          category: string | null;
          sort_order: number;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          campground_id: string;
          type: "photo" | "logo" | "video";
          url: string;
          caption?: string | null;
          category?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          campground_id?: string;
          type?: "photo" | "logo" | "video";
          url?: string;
          caption?: string | null;
          category?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
      };
      directory_connections: {
        Row: {
          id: string;
          user_id: string;
          directory: string;
          access_token: string | null;
          refresh_token: string | null;
          token_expires_at: string | null;
          session_data_encrypted: string | null;
          session_expires_at: string | null;
          external_id: string | null;
          external_url: string | null;
          status: "connected" | "disconnected" | "error" | "pending";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          directory: string;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          session_data_encrypted?: string | null;
          session_expires_at?: string | null;
          external_id?: string | null;
          external_url?: string | null;
          status?: "connected" | "disconnected" | "error" | "pending";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          directory?: string;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          session_data_encrypted?: string | null;
          session_expires_at?: string | null;
          external_id?: string | null;
          external_url?: string | null;
          status?: "connected" | "disconnected" | "error" | "pending";
          created_at?: string;
        };
      };
      directory_listings: {
        Row: {
          id: string;
          campground_id: string;
          directory: string;
          external_id: string | null;
          external_url: string | null;
          status: "pending" | "synced" | "error" | "not_found" | "syncing";
          last_synced_at: string | null;
          last_sync_result: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          campground_id: string;
          directory: string;
          external_id?: string | null;
          external_url?: string | null;
          status?: "pending" | "synced" | "error" | "not_found" | "syncing";
          last_synced_at?: string | null;
          last_sync_result?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          campground_id?: string;
          directory?: string;
          external_id?: string | null;
          external_url?: string | null;
          status?: "pending" | "synced" | "error" | "not_found" | "syncing";
          last_synced_at?: string | null;
          last_sync_result?: Json | null;
          created_at?: string;
        };
      };
      sync_jobs: {
        Row: {
          id: string;
          campground_id: string;
          directory: string;
          status: "pending" | "running" | "success" | "failed" | "cancelled";
          priority: number;
          attempts: number;
          max_attempts: number;
          scheduled_for: string;
          started_at: string | null;
          completed_at: string | null;
          result: Json | null;
          error: string | null;
          screenshots: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          campground_id: string;
          directory: string;
          status?: "pending" | "running" | "success" | "failed" | "cancelled";
          priority?: number;
          attempts?: number;
          max_attempts?: number;
          scheduled_for?: string;
          started_at?: string | null;
          completed_at?: string | null;
          result?: Json | null;
          error?: string | null;
          screenshots?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          campground_id?: string;
          directory?: string;
          status?: "pending" | "running" | "success" | "failed" | "cancelled";
          priority?: number;
          attempts?: number;
          max_attempts?: number;
          scheduled_for?: string;
          started_at?: string | null;
          completed_at?: string | null;
          result?: Json | null;
          error?: string | null;
          screenshots?: string[] | null;
          created_at?: string;
        };
      };
    };
  };
}

// Campground Attributes (JSONB)
export interface CampgroundAttributes {
  // Hours & Seasons
  hours?: {
    office?: WeeklyHours;
    checkin_time?: string;
    checkout_time?: string;
    gate_code_hours?: string;
  };
  seasons?: {
    open_date?: string;
    close_date?: string;
    year_round?: boolean;
    seasonal_notes?: string;
  };

  // Contact & Social
  contact?: {
    reservation_phone?: string;
    emergency_phone?: string;
    fax?: string;
    reservation_email?: string;
    manager_name?: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    pinterest?: string;
  };

  // Site Details
  sites?: {
    total_sites?: number;
    tent_sites?: number;
    rv_sites?: number;
    cabin_count?: number;
    glamping_count?: number;
    max_rv_length?: number;
    pull_through_count?: number;
    back_in_count?: number;
    waterfront_sites?: number;
    full_hookup_sites?: number;
    partial_hookup_sites?: number;
    no_hookup_sites?: number;
  };
  site_features?: {
    shade_level?: "full" | "partial" | "none" | "varies";
    privacy_level?: "secluded" | "moderate" | "open" | "varies";
    surface_type?: ("grass" | "gravel" | "paved" | "dirt" | "sand")[];
    fire_pits?: boolean;
    picnic_tables?: boolean;
    bbq_grills?: boolean;
  };

  // Hookups & Utilities
  hookups?: {
    water?: boolean;
    water_type?: "at_site" | "central";
    electric?: boolean;
    electric_amps?: (20 | 30 | 50)[];
    sewer?: boolean;
    sewer_type?: "full" | "partial" | "dump_station_only";
  };
  utilities?: {
    wifi?: boolean;
    wifi_type?: "free" | "paid" | "limited";
    wifi_speed?: "basic" | "streaming" | "fast";
    wifi_notes?: string;
    cell_coverage?: {
      verizon?: 1 | 2 | 3 | 4 | 5;
      att?: 1 | 2 | 3 | 4 | 5;
      tmobile?: 1 | 2 | 3 | 4 | 5;
    };
    cable_tv?: boolean;
    propane_refill?: boolean;
  };

  // Amenities
  amenities?: {
    restrooms?: boolean;
    restroom_rating?: 1 | 2 | 3 | 4 | 5;
    showers?: boolean;
    shower_type?: "free" | "paid" | "timed";
    laundry?: boolean;
    dump_station?: boolean;
    camp_store?: boolean;
    restaurant?: boolean;
    snack_bar?: boolean;
    pool?: boolean;
    pool_type?: "outdoor" | "indoor" | "both";
    hot_tub?: boolean;
    playground?: boolean;
    dog_park?: boolean;
    rec_room?: boolean;
    clubhouse?: boolean;
    fitness_center?: boolean;
    lake_access?: boolean;
    river_access?: boolean;
    ocean_access?: boolean;
    fishing?: boolean;
    fishing_type?: "onsite" | "nearby";
    boat_ramp?: boolean;
    marina?: boolean;
    kayak_rentals?: boolean;
    boat_rentals?: boolean;
    swimming?: boolean;
    hiking_trails?: boolean;
    biking_trails?: boolean;
    bike_rentals?: boolean;
    horseback_riding?: boolean;
    mini_golf?: boolean;
    golf_course?: boolean;
    tennis_courts?: boolean;
    basketball_courts?: boolean;
    volleyball?: boolean;
    horseshoes?: boolean;
    arcade?: boolean;
    ev_charging?: boolean;
    atm?: boolean;
    ice?: boolean;
    firewood?: boolean;
    rv_supplies?: boolean;
  };

  // Policies
  policies?: {
    pets_allowed?: boolean;
    pet_restrictions?: string;
    pet_size_limit?: number;
    pet_breed_restrictions?: string[];
    pet_fee?: number;
    max_pets?: number;
    pet_areas?: boolean;
    quiet_hours_start?: string;
    quiet_hours_end?: string;
    generator_hours_start?: string;
    generator_hours_end?: string;
    fires_allowed?: boolean;
    fire_type?: "ground_fires" | "fire_pits_only" | "none";
    alcohol_allowed?: boolean;
    smoking_policy?: string;
    age_restriction?: string;
    max_stay_days?: number;
    minimum_stay_days?: number;
    minimum_stay_weekends?: number;
    minimum_stay_holidays?: number;
    cancellation_policy?: string;
    deposit_required?: boolean;
    deposit_amount?: string;
  };

  // Pricing
  pricing?: {
    currency?: string;
    tent_nightly?: [number, number];
    rv_nightly?: [number, number];
    rv_full_hookup_nightly?: [number, number];
    rv_partial_hookup_nightly?: [number, number];
    cabin_nightly?: [number, number];
    glamping_nightly?: [number, number];
    weekly_rate?: number;
    monthly_rate?: number;
    seasonal_rate?: number;
    extra_person_fee?: number;
    extra_vehicle_fee?: number;
    pet_fee?: number;
    early_arrival_fee?: number;
    late_departure_fee?: number;
    resort_fee?: number;
    discounts?: {
      good_sam?: number;
      military?: number;
      senior?: number;
      aaa?: number;
      passport_america?: number;
    };
    pricing_notes?: string;
  };

  // Accessibility
  accessibility?: {
    ada_sites?: number;
    accessible_restrooms?: boolean;
    accessible_showers?: boolean;
    paved_paths?: boolean;
    wheelchair_accessible?: boolean;
    service_animals?: boolean;
  };

  // Nearby & Activities
  nearby?: {
    distance_to_town?: number;
    nearest_town?: string;
    nearest_grocery?: number;
    nearest_hospital?: number;
    nearest_gas?: number;
    attractions?: string[];
  };
  activities_onsite?: string[];
  activities_nearby?: string[];

  // Booking
  booking?: {
    reservation_url?: string;
    booking_system?:
      | "campspot"
      | "reserve_america"
      | "recreation_gov"
      | "roverpass"
      | "firefly"
      | "newbook"
      | "other";
    booking_system_other?: string;
    walkins_accepted?: boolean;
    fcfs_sites?: boolean;
    reservations_required?: boolean;
    book_ahead_days?: number;
  };

  // Certifications & Info
  certifications?: {
    good_sam_rating?: number;
    koa_type?: "journey" | "holiday" | "resort";
    campground_type?:
      | "private"
      | "state_park"
      | "national_park"
      | "county"
      | "coe"
      | "blm"
      | "usfs";
    memberships?: string[];
  };
  info?: {
    year_established?: number;
    acreage?: number;
    elevation?: number;
    ownership?: "family" | "corporate" | "government";
    manager_operated?: boolean;
  };

  // Payment
  payment?: {
    methods?: (
      | "cash"
      | "credit"
      | "debit"
      | "check"
      | "apple_pay"
      | "google_pay"
      | "venmo"
      | "paypal"
    )[];
    cards_accepted?: ("visa" | "mastercard" | "amex" | "discover")[];
    price_range?: "$" | "$$" | "$$$" | "$$$$";
  };

  // Identity & Badges
  identity?: {
    women_owned?: boolean;
    veteran_owned?: boolean;
    minority_owned?: boolean;
    family_owned?: boolean;
    lgbtq_friendly?: boolean;
    family_friendly?: boolean;
    adults_only?: boolean;
    eco_certified?: boolean;
    leave_no_trace?: boolean;
    green_practices?: string[];
    awards?: string[];
  };

  // Descriptions
  descriptions?: {
    tagline?: string;
    short?: string;
    medium?: string;
    long?: string;
  };

  // Categories & Keywords
  categories?: {
    primary?: string;
    secondary?: string[];
  };
  keywords?: string[];
  languages_spoken?: string[];
}

interface WeeklyHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

interface DayHours {
  open: string;
  close: string;
  closed?: boolean;
}

// Convenience types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Campground = Database["public"]["Tables"]["campgrounds"]["Row"];
export type CampgroundMedia =
  Database["public"]["Tables"]["campground_media"]["Row"];
export type DirectoryConnection =
  Database["public"]["Tables"]["directory_connections"]["Row"];
export type DirectoryListing =
  Database["public"]["Tables"]["directory_listings"]["Row"];
export type SyncJob = Database["public"]["Tables"]["sync_jobs"]["Row"];
