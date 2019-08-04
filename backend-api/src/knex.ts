import * as Knex from 'knex'
import * as MockKnex from 'mock-knex'
import * as Paginator from 'knex-paginator'

const config = require('../knexfile')
const env = process.env.NODE_ENV || 'development'

const knex = Knex(config[env])
Paginator(knex)

if (env === 'test') {
  MockKnex.mock(knex)
}

export default knex
