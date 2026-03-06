import { execSync } from 'node:child_process'

import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { app } from '../src/app'

describe('Transaction routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction and a new session cookie', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({ title: 'New transaction', amount: 5000, type: 'credit' })

    const cookies = response.get('Set-Cookie')

    expect(response.statusCode).toEqual(201)
    expect(cookies).toHaveLength(1)
    expect(cookies?.[0]).toContain('sessionId')
  })

  it('should be able to list all transactions', async () => {
    const createTransactioResponse = await request(app.server)
      .post('/transactions')
      .send({ title: 'New transaction', amount: 5000, type: 'credit' })

    const cookies = createTransactioResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies!)

    expect(listTransactionsResponse.statusCode).toEqual(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })
})
