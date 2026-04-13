import fastify from 'fastify'

const app = fastify()

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