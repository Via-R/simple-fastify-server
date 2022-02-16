import fastify from 'fastify'
import pg from 'fastify-postgres'
import process from 'process'
import dotenv from 'dotenv'
import routes from './routes.js'

dotenv.config()
const server = fastify({ logger: true })
server.register(pg, {
  connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_SERVICE}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
})
server.register(routes)

function startServer() {
  server.listen(3000, '0.0.0.0', (err, _address) => {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
  })
}

startServer()
