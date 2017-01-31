const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');
const ev = require('express-validation');
const validations = require('../validations/users');

router.get('/users', (_req, res, next) => {
  res.render('users');
});

router.post('/users', ev(validations.post), (req, res, next) => {
  console.log(req.body.password);
  bcrypt.hash(req.body.password, 12)
    .then((hashedPassword) => {
      return knex('users')
        .insert({
          username: req.body.username,
          email: req.body.email,
          digest: hashedPassword
        }, '*');
    })
    .then(() => {
      res.redirect('/login') //does nothing
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/users/:id', (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then((user) => {
      if (!user) {
        return next();
      }
      return knex('users')
        .update({
          username: req.body.username,
          email: req.body.email,
        //  digest: hashedPassword
        }, '*')
        .where('id', req.params.id)
    })
    .then((user) => {
      res.send(user[0]);
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
