// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/ideadb_dev'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/ideadb_test'
  }

  production: {
    client: 'postgresql',
    connection: {
      database: 'idea_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
