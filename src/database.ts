import type { Knex } from 'knex'
import setupKnex from 'knex'

import { env } from './env'

export const config: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    extension: 'ts',
    directory: 'db/migrations',
  },
}

export const knex = setupKnex(config)
