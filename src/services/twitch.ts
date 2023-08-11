import { APP_CLIENT_ID } from "../utils/constants";
import { Client, Redemption, Reward, RewardRedemption } from "./twitch_types";

export const getBroadcasterId = async ( token: string ) : Promise<string> => {
  try{
    const response = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-Id': APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const client = data.data[0] as Client
    return client.id;
  }catch{
    return ''
  }
}
export const getCustomRewards = async ( token: string, clientId: string | number ) : Promise<Reward[] | []> => {
  try{
    const response = await fetch(`https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${clientId}&only_manageable_rewards=true`, {
      headers: {
        'Client-Id': APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const rewards = data.data as Reward[];
    return rewards;
  }catch{
    return []
  }
}

export const getCustomRewardsRedemption = async ( token: string, clientId: string | number, rewardId: string | number, status: string ) : Promise<Redemption[] | []> => {
  try{
    const PER_PAGE = 50
    let rewardsReturn : Redemption[] = []
    while ( !(rewardsReturn.length % PER_PAGE) || rewardsReturn.length === 0) {
      const response = await fetch(`https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=${clientId}&reward_id=${rewardId}&status=${status}&first=${PER_PAGE}&after=${rewardsReturn.length}`, {
        headers: {
          'Client-Id': APP_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const rewards = data.data as Redemption[]
      rewardsReturn = [ ...rewardsReturn, ...rewards]
    }
    return rewardsReturn;
  }catch{
    return []
  }
}