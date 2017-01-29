
exports.up = knex =>
  knex.schema.createTable('postsusers', (table) => {
    table.increments();
    table.integer('post_id').notNullable().references('posts.id').onDelete('CASCADE').index();
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE').index();
  })
exports.down = knex =>
  knex.schema.dropTable('postsusers');

  // ┌──────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                         postsusers                                       │
  // ├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
  // │id           │serial                   │primary key                                       │
  // │user_id      │integer                  │not null default '' foreign key references users  │
  // │post id      │integer                  │not null default '' foreign key references posts  |
  // └─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
  
