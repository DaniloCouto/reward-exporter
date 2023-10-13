export interface Reward {
  broadcaster_name: string;
  broadcaster_id: string;
  id: string;
  image?: null;
  background_color: string;
  is_enabled: boolean;
  cost: number;
  title: string;
  prompt: string;
  is_user_input_required: boolean;
  max_per_stream_setting: MaxPerStreamSetting;
  max_per_user_per_stream_setting: MaxPerUserPerStreamSetting;
  global_cooldown_setting: GlobalCooldownSetting;
  is_paused: boolean;
  is_in_stock: boolean;
  default_image: DefaultImage;
  should_redemptions_skip_request_queue: boolean;
  redemptions_redeemed_current_stream?: null;
  cooldown_expires_at?: null;
}
export interface MaxPerStreamSetting {
  is_enabled: boolean;
  max_per_stream: number;
}
export interface MaxPerUserPerStreamSetting {
  is_enabled: boolean;
  max_per_user_per_stream: number;
}
export interface GlobalCooldownSetting {
  is_enabled: boolean;
  global_cooldown_seconds: number;
}
export interface DefaultImage {
  url_1x: string;
  url_2x: string;
  url_4x: string;
}

export interface Client {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email?: string;
    created_at: string;
  }
  export interface Pagination {
    cursor: string
  }
  
  export interface Redemption {
    broadcaster_name: string
    broadcaster_login: string
    broadcaster_id: string
    id: string
    user_login: string
    user_id: string
    user_name: string
    user_input: string
    status: string
    redeemed_at: string
  }

  export interface RedemptionResponse{
    data: Redemption[]
    pagination?: Pagination
  }
  
  export interface RewardRedemption {
    id: string
    title: string
    prompt: string
    cost: number
  }

  export interface SimpleRedemption {
    user_name: string,
    redemption: string
  }
  
