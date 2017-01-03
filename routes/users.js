const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');

router.get('/users', (_req, res, next) => {
  knex('users')
    .orderBy('id')
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.digest, 12)
    .then((hashedPassword) => {
      return knex('users')
        .insert({
          username: req.body.username,
          email: req.body.email,
          digest: hashedPassword
        }, '*');
    })
    .then((users) => {
      const user = users[0];
      delete user.digest;
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/users/:id', (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .then((user) => {
      knex('users')
        .where('id', req.params.id)
        .del()
        .then(() => {
          delete user.id;
          res.send(user);
        })
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
