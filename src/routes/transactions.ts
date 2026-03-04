import type { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transaction = await knex('transactions').where('amount', 100)

    return transaction
  })
}
