exports.seed = knex =>
  knex('postsusers').del()
  .then(() =>
    knex('postsusers').insert([{
      user_id: 2,
      post_id: 2,
    }]),
    knex.raw('SELECT setval(\'postsusers_id_seq\', (SELECT MAX(id) FROM postsusers))'),
  );
