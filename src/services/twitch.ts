import { APP_CLIENT_ID } from "../utils/constants";
import { Client, Redemption, RedemptionResponse, Reward, RewardRedemption } from "./twitch_types";

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
    let cursor : string = ''
    while ( !(rewardsReturn.length % PER_PAGE) || rewardsReturn.length === 0) {
      if( rewardsReturn.length === 0){
        const response = await fetch(`https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=${clientId}&reward_id=${rewardId}&status=${status}&first=${PER_PAGE}&after=${(rewardsReturn.length + 1)}`, {
          headers: {
            'Client-Id': APP_CLIENT_ID,
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const rewardsResponse = data as RedemptionResponse
        const rewards = rewardsResponse.data 
        if(rewardsResponse.pagination){
          cursor = rewardsResponse.pagination.cursor
        }
        rewardsReturn = [ ...rewardsReturn, ...rewards]
      }else if(cursor){
        const response = await fetch(`https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=${clientId}&reward_id=${rewardId}&status=${status}&first=${PER_PAGE}&after=${cursor}`, {
          headers: {
            'Client-Id': APP_CLIENT_ID,
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const rewardsResponse = data as RedemptionResponse
        const rewards = rewardsResponse.data 
        if(rewardsResponse.pagination){
          cursor = rewardsResponse.pagination.cursor
        }
        rewardsReturn = [ ...rewardsReturn, ...rewards]
      }
    }
    return rewardsReturn;
  }catch{
    return []
  }
}

export const registerCustomRewards = async ( token: string, clientId: string | number, title: string , cost: number, prompt: string, inputRequired: boolean ) : Promise<boolean> => {
  try{
    const response = await fetch(`https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${clientId}`,{
      method: 'POST',
      headers: {
        'Client-Id': APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        title,
        cost,
        prompt,
        is_user_input_required: inputRequired
      })
    })
    const data = await response.json();
    return true;
  }catch{
    return false
  }
}