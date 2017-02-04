
exports.seed = knex =>
  knex('posts').del()
  .then(() =>
    knex('posts').insert([{
      user_id: 1,
      idea_text: 'This is my superneat idea',
      topic: 'test-topic',
    }, {
      user_id: 1,
      idea_text: 'Second good idea',
      topic: 'test-topic',
    }]),
    knex.raw('SELECT setval(\'posts_id_seq\', (SELECT MAX(id) FROM posts))'),
);
