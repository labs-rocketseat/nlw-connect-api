import { redis } from '../redis/client'

interface IGetSubscriberInvitesCountParams {
  subscriberId: string
}

export async function getSubscriberInvitesCount({
  subscriberId,
}: IGetSubscriberInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)
  return { count: count ? Number.parseInt(count) : 0 }
}
