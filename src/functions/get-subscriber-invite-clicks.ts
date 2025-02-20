import { redis } from '../redis/client'

interface IGetSubscriberInviteClicksParams {
  subscriberId: string
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: IGetSubscriberInviteClicksParams) {
  const count = await redis.hget('referral:access-count', subscriberId)
  return { count: count ? Number.parseInt(count) : 0 }
}
