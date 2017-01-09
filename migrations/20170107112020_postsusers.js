
exports.up = knex =>
  knex.schema.createTable('postsusers', (table) => {
    table.increments();
    table.integer('post_id').notNullable().references('posts.id').onDelete('CASCADE').index();
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE').index();
  })
exports.down = knex =>
  knex.schema.dropTable('postsusers');
