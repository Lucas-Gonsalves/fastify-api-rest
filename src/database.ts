import setupKnex from 'knex'
import type { Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './db/app.db',
  },
  migrations: {
    extension: 'ts',
    directory: 'db/migrations',
  },
}

export const knex = setupKnex(config)
