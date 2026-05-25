import fastify from 'fastify'
import paymentsRoutes from '../routes/payments.routes.js'

const app = fastify({ logger: true })

app.register(paymentsRoutes, { prefix: '/api' })
app.get('/', async () => 'Fastify connected!')

export default async (req: any, res: any) => {
  await app.ready()
  app.server.emit('request', req, res)
}