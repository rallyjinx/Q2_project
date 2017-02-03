const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');
const ev = require('express-validation');
const validations = require('../validations/users');

router.get('/users', (_req, res, next) => {
  res.render('users', {
    hasError: false,
    username: '',
    email: '',
    password: '',
    conf_password: ''
  });
});

router.post('/users', (req, res, next) => {
  console.log(req.body.password);
  let validate = checkRegistration(req);
  if (validate.hasError) {
    return res.render('users', validate);
  }
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
      res.redirect('/login')
    })
    .catch((err) => {
      next(err);
    });
});

function checkUsername(info, req) {
  const str = req.body.username;
  let fiveCharMin = false;

  if (str.length >= 5) {
    fiveCharMin = true;
  }
  if (fiveCharMin) {
    info.username = req.body.username;
  } else {
    if (!info.error.username) {
      info.error.username = [];
    }
    info.hasError = true;
    info.error.username.push({ message: 'username must be at least 5 characters' });
  }
}

function checkEmail(info, req) {
  const str = req.body.email;
  let hasDot = false;
  let hasAt = false;

  /* eslint no-plusplus: 0 */
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '@' || hasAt) {
      if (hasAt && str[i] === '.') {
        hasDot = true;
      }
      hasAt = true;
    }
  }
  if (hasAt && hasDot) {
    info.email = req.body.email;
  } else {
    if (!info.error.email) {
      info.error.email = [];
    }
    info.hasError = true;
    info.error.email.push({ message: 'invalid email address' });
  }
}

// validate password
function checkPassword(info, req) {
  const str = req.body.password;
  let eightChar = false;
  let letter = false;
  let number = false;
  let special = false;
  let match = false;

  if (str.length >= 8) {
    eightChar = true;
  }
  if (str.match(/[a-zA-Z]/g)) {
    letter = true;
  }
  if (str.match(/[0-9]/g)) {
    number = true;
  }
  if (str.match(/[`~!@#$%^&*()_+-={}[\]\\|;':",./<>?]/g)) {
    special = true;
  }
  if (eightChar && letter && number && special) {
    info.password = req.body.password;
  } else {
    if (!info.error.password) {
      info.error.password = [];
    }
    info.hasError = true;
    info.error.password.push({ message: 'password must be at least 8 characters and contain a number, letter, and special character'})
  }
}

function confirmPassword(info, req) {
  const passwordOne = req.body.password;
  const passwordTwo = req.body.conf_password;
  let passwordMatch = false;

  if (passwordOne === passwordTwo) {
    passwordMatch = true;
  }
  if (!passwordMatch) {
    if (!info.error.password) {
      info.error.password = [];
    }
    info.hasError = true;
    info.error.password.push({ message: 'passwords must match' });
  }
}

function checkRegistration(req) {
  let info = {};
  info.hasError = false;
  info.error = {};

  checkUsername(info, req);
  checkEmail(info, req);
  checkPassword(info, req);
  confirmPassword(info, req);

  return info;
}


module.exports = router;
