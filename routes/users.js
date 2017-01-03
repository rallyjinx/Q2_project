const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/users', (_req, res, next) => {
  knex('users')
    .orderBy('user_id')
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
