import request from 'supertest'
import app from '../src/app'

jest.mock('../src/models/Cache', () => ({ count: jest.fn(), init: jest.fn(), deleteMany: jest.fn(), findOne: jest.fn()}));
import Cache from '../src/models/Cache'

describe('App Test', () => {

  it('GET /random-url should return 404', (done) => {
    request(app).get('/reset').expect(404, done)
  })

  it('GET /cache/keys create new random cache should return 200', (done) => {
    let newCache = new Cache({key: 'test', value: 'test'})
    newCache.save();
    request(app).get('/cache/keys').expect(200, done)   
  })

  it('GET /cache/set create new random cache should return 200', (done) => {
    request(app).get('/cache/set').send({ key: 'test' }).expect(404, done)   
  })

  it('POST /cache/add with new cache should return 200', (done) => {
    request(app).post('/cache/add').send({ key: 'test', value: 'test' }).expect(200, done)
  })

  it('POST /cache/add empty fields should return 400', (done) => {
    request(app).post('/cache/add').expect(400, done)
  })

  it('GET /cache/get empty fields should return 404', (done) => {
    request(app).get('/cache/get/123').expect(404, done)
  })

  it('DELETE /cache/delete non existing record should return 404', (done) => {
    request(app).delete('/cache/delete/123').expect(404, done)
  })

  it('DELETE /cache/deleteAll remove every record should return 200', (done) => {
    request(app).delete('/cache/deleteAll').expect(200, done)
  })

})
