export const APP_CLIENT_ID = "w6cbwn8qww03bd1hrtlabsqmj0kkzn";
export const REDIRECT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://danilocouto.github.io/reward-exporter";
export const SCOPE_CHANNEL_REWARDS = "channel:read:redemptions";

export default {
  APP_CLIENT_ID,
  REDIRECT_URL,
  SCOPE_CHANNEL_REWARDS,
};
