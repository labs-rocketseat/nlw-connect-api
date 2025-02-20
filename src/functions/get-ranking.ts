import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')
  const subscribeIdAndScore: Record<string, number> = {}
  for (let i = 0; i < ranking.length; i += 2) {
    subscribeIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscribeIdAndScore)))
  const rankingWithScore = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscribeIdAndScore[subscriber.id],
      }
    })
    .sort((subscriber1, subscriber2) => {
      return subscriber2.score - subscriber1.score
    })
  return { rankingWithScore }
}
