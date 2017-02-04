process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../routes/users');
const knex = require('../db/knex');


beforeEach(done => {
  knex.migrate.rollback()
  .then(() => {
    knex.migrate.latest()
    .then(() => {
      knex.seed.run()
      .then(() => done());
    })
  })
});
// afterEach(done => {
//   knex('users').del().then(() => done())
// });

// well, this won't really work will it because
// the users are never 'gettened' by the /users route...
// except that it did pass. . .
// try posts...? same error...
describe('GET /dashboard', () => {
  console.log('inside test');
  it('responds with JSON', (done) => {
    request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
