import request from 'supertest'
import app from '../src/app'

jest.mock('../src/models/Cache')

describe('App Test', () => {

  it('GET /random-url should return 404', (done) => {
    request(app).get('/reset').expect(404, done)
  })

  it('POST /cache/add empty fields should return 400', (done) => {
    request(app).post('/cache/add').expect(400, done)
  })

})
