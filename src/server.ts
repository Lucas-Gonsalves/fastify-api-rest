import fastify from 'fastify'
import { knex } from './database.js'
import { env } from './env'
import { transactionRoutes } from './routes/transactions.js'

const app = fastify()

app.register(transactionRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
