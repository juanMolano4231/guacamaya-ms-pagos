import fastify from 'fastify'
import paymentsRoutes from './routes/payments.routes.js'

const app = fastify({ logger: true })

app.register(paymentsRoutes, { prefix: '/api' })

app.get('/', async () => 'Fastify connected!')

const start = async () => {
  try {
    await app.listen({ port: 8080, host: '0.0.0.0' })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()