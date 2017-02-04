/* eslint no-param-reassign: 0 */
const express = require('express');
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');
const checkUsername = require('../validations/checkUser').checkUsername;
const checkEmail = require('../validations/checkUser').checkEmail;
const checkPassword = require('../validations/checkUser').checkPassword;
const confirmPassword = require('../validations/checkUser').confirmPassword;

const router = express.Router();

router.get('/users', (_req, res) => {
  res.render('users', {
    hasError: false,
    username: '',
    email: '',
    password: '',
    conf_password: '',
  });
});

function checkRegistration(req) {
  let info = {
    hasError: false,
    username: '',
    email: '',
    password: '',
    conf_password: '',
  };
  info.hasError = false;
  info.error = {};

  checkUsername(info, req);
  checkEmail(info, req);
  checkPassword(info, req);
  confirmPassword(info, req);

  return info;
}

router.post('/users', (req, res, next) => {
  const validate = checkRegistration(req);
  if (validate.hasError) {
    return res.render('users', validate);
  }
  bcrypt.hash(req.body.password, 12)
    .then((hashedPassword) => {
      return knex('users')
        .insert({
          username: req.body.username,
          email: req.body.email,
          digest: hashedPassword,
        }, '*');
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
