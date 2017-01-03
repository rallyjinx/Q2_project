'use strict';

process.env.NODE_EN = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('./db/knex');

suite('migrations', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('users columns'), (done) => {
    knex('users').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'users_id_seq\'::regclass)',
          },

          username: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            unique: true,
          },

          email {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            unique: true,
          },

          digest {
            type: 'char'...
          }


        }
      })
  }
})
