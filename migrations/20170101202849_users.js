
exports.up = knex =>
  knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.specificType('digest', 'char(60)').notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.raw('DROP TABLE users CASCADE');


// ┌──────────────────────────────────────────────────────────────────────────────────────────┐
// │                                         users                                            │
// ├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
// │id           │serial                   │primary key                                       │
// │username     │varchar(255)             │not null default '' unique()                      │
// │email        │varchar(255)             │not null default '' unique()                      │
// │digest       │char(60)                 │not null default ''                               │
// │created_at   │timestamp with time zone │not null default now()                            │
// │updated_at   │timestamp with time zone │not null default now()                            │
// └─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
