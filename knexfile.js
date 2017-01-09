// Update with your config settings.

require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/ideadb_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/ideadb_test',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
//heroku/production stuff : https://learn.galvanize.com/content/gSchool/node-curriculum/master/Knex/Step-by-Step.md
};
