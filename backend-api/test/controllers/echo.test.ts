import {expect} from 'chai'
import * as request from 'supertest'
import app from '../../src/app'
import * as MockKnex from 'mock-knex'

describe('echo.test', () => {
  const tracker = MockKnex.getTracker()

  beforeEach(() => {
    tracker.install()
  })

  afterEach(() => {
    tracker.uninstall()
  })

  it('GET /echo?msg', async () => {
    tracker.on('query', query => {
      expect(query.method).to.equal('insert')
      query.response([])
    })

    const msg = 'message'
    const res = await request(app).get(`/echo?msg=${msg}`).expect(200)
    expect(res.body.msg).to.equal(msg)
  })
})
