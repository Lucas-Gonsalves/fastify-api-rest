import setupKnex from 'knex'

export const knex = setupKnex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './tmp/app.db',
  },
})
