/* eslint no-param-reassign: 0 */

const express = require('express');
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const checkEmail = require('../validations/checkUser').checkEmail;
const checkPassword = require('../validations/checkUser').checkPassword;

const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('dashboard');
});

router.get('/login', (_req, res) => {
  res.render('login', {
    hasError: false,
    email: '',
    password: '',
  });
});

function checkLogin(req) {
  let info = {
    hasError: false,
    email: '',
    password: '',
  };
  info.hasError = false;
  info.error = {};

  checkEmail(info, req);
  checkPassword(info, req);

  return info;
}

router.post('/login', (req, res) => {
  const validate = checkLogin(req);
  if (validate.hasError) {
    return res.render('login', validate);
  }
  knex('users').where({
    email: req.body.email,
  }).first().then((user) => {
    if (!user) {
      res.redirect('/login'); // add something here to say incorrect login or something
    } else {
      bcrypt.compare(req.body.password, user.digest, (err, result) => {
        if (result) {
          req.session.user = user;
          res.cookie('loggedin', true);
          res.redirect('/dashboard');
        } else {
          res.redirect('/login');
        }
      });
    }
  });
});

module.exports = router;
