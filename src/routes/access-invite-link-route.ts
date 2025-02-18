import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params
      await accessInviteLink({ subscriberId })
      const redirectURL = new URL(env.WEB_URL)
      redirectURL.searchParams.set('referrer', subscriberId)
      return reply.redirect(redirectURL.toString(), 302)
    }
  )
}
