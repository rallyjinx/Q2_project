
exports.seed = knex =>
  knex('posts').del()
  .then(() =>
    knex('posts').insert([{
      id: 1,
      user_id: 1,
      idea_text: 'This is my superneat idea',
      topic: 'test-topic',
      new_user_id: 1,
      claimed: 0,
    }, {
      id: 2,
      user_id: 1,
      idea_text: 'Second good idea',
      topic: 'test-topic',
      new_user_id: 2,
      claimed: 1,
    }]),
    knex.raw('SELECT setval(\'posts_id_seq\', (SELECT MAX(id) FROM posts))')
);
