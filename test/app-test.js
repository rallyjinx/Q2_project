process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../routes/users.js');
const knex = require('../db/knex');

beforeEach(done => {
  Promise.all([
    knex('users').insert({
      id: 1,
      username: 'Sprocket',
      email: 'cat@catthings.com',
      digest: 'meow'
    }),
    knex('users').insert({
      id: 2,
      username: 'Jinxella',
      email: 'me@mememe.com',
      digest: 'qwertyuiop'
    }),
    knex('users').insert({
      id: 3,
      username: 'you',
      email: 'you@you.com',
      digest: 'meowmeowmeow'
    })
  ]).then(() => done());
});

afterEach(done => {
  knex('users').del().then(() => done());
});

describe('GET /users', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200, done);
    done();
  });

  it('returns an array of all users', done => {
    request(app)
      .get('/users')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{
          id: 1,
          username: 'Sprocket',
          email: 'cat@catthings.com',
          digest: 'meow'
        }, {
          id: 2,
          username: 'Jinxella',
          email: 'me@mememe.com',
          digest: 'qwertyuiop'
        }, {
          id: 3,
          username: 'you',
          email: 'you@you.com',
          digest: 'meowmeowmeow'

        }]);
        done();
      });
  });

});

xdescribe('POST /users', () => {

});

xdescribe('DELETE /users/:id', () => {

});

xdescribe('GET /posts', () => {

});

xdescribe('GET /posts/:id', () => {

});

xdescribe('POST /posts/', () => {

});

xdescribe('PATCH /posts/:id', () => {

});

xdescribe('DELETE /posts/:id', () => {

});
