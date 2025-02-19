import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import Fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getRankingRoute } from './routes/get-ranking-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const fastify = Fastify().withTypeProvider<ZodTypeProvider>()

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)
fastify.register(fastifyCors)
fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})
fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})
fastify.register(subscribeToEventRoute)
fastify.register(accessInviteLinkRoute)
fastify.register(getSubscriberInviteClicksRoute)
fastify.register(getSubscriberInvitesCountRoute)
fastify.register(getSubscriberRankingPositionRoute)
fastify.register(getRankingRoute)

fastify
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`> Server running at http://localhost:${env.PORT}`)
  })
