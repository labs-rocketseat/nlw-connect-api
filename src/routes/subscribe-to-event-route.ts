import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe someone to the event',
        tags: ['subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, name, referrer } = request.body
      const { subscriberId } = await subscribeToEvent({
        email,
        name,
        referrerId: referrer,
      })
      return reply.code(201).send({ subscriberId })
    }
  )
}
