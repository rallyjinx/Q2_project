
exports.up = knex =>
  knex.schema.createTable('posts', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE').index();
    table.text('idea_text').notNullable().defaultTo('');
    table.string('topic').notNullable().defaultTo('');
    table.integer('new_user_id').notNullable().references('users.id').onDelete('CASCADE').index();
    table.integer('claimed').notNullable().defaultTo(0);
    table.timestamps(true, true);
  })


exports.down = knex => knex.schema.dropTable('posts');


// ┌──────────────────────────────────────────────────────────────────────────────────────────┐
// │                                         posts                                            │
// ├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
// │id           │serial                   │primary key                                       │
// │user_id      │integer                  │not null default '' foreign key references users  │
// │idea_text    │text                     │not null default ''                               │
// │topic        │string                   │not null default ''                               │
// │new_user_id  │integer                  │not null default '' foreign key references users  │
// |claimed      |integer                  |not null default ''                               |
// │created_at   │timestamp with time zone │not null default now()                            │
// │updated_at   │timestamp with time zone │not null default now()                            │
// └─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
