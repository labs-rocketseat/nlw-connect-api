import { redis } from '../redis/client'

interface IGetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: IGetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)
  if (!rank) {
    return { position: null }
  }
  return { position: rank + 1 }
}
