import { redis } from '../redis/client'

interface IAccessInviteLnkParams {
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId,
}: IAccessInviteLnkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
