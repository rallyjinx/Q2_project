
exports.seed = knex =>
  knex('users').del()
  .then(() =>
    knex('users').insert([{
      id: 1,
      username: 'jinx',
      email: 'rally@whatever.com',
      digest: 'a7a0eee7eedbfa955d36cc9dd485bce0aacc500842b68acbb78d3f772939',
    }, {
      id: 2,
      username: 'mr.testuser',
      email: 'test@testy.com',
      digest: '6ab01938530b807008e642e5712efeff388b8a87bb5967b8f03750adce66',
    }]),
    knex.raw('SELECT setval(\'users_id_seq\', (SELECT MAX(id) FROM users))'),
  );

// removed ids because http://stackoverflow.com/questions/37970743/unique-violation-7-error-duplicate-key-value-violates-unique-constraint-users
// put them back, because errors (error: insert or update on table "posts"
// violates foreign key constraint "posts_user_id_foreign")
