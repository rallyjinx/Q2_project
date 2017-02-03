const express = require('express');
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const ev = require('express-validation');
const validations = require('../validations/login');

const router = express.Router();

// router.get('/', (req, res) => {
//
// });

router.get('/', (req, res, next) => {
  let user = req.session.user;
  res.render('dashboard')
});

router.get('/login', (_req, res, next) => {
  //res.render('login');
  res.render('login', {
    hasError: false,
    email: '',
    password: '',
  });
});

function authorizedUser(req, res, next) {
  let userID = req.session.user.id;
  if(userID){
    next();
  } else {
    res.redirect('/')
  }
}

router.post('/login', (req, res, next) => {
  // validate entries
  let validate = checkLogin(req);
  if (validate.hasError) {
    return res.render('login', validate);
  }
  knex('users').where({
    email: req.body.email
  }).first().then((user) => {
    if (!user) {
      res.redirect('/login') // add something here to say incorrect login or something
    } else {
      bcrypt.compare(req.body.password, user.digest, (err, result) => {
        if (result) {
          req.session.user = user;
          res.cookie('loggedin', true);
          res.redirect('/dashboard');
        } else {
          console.log('you will not go to space today', result);
          res.redirect('/login');
        }
      });
    }
  });
});

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

//call from login post route
function checkLogin(req) {
  let info = {};
  info.hasError = false;
  info.error = {};

  checkEmail(info, req);
  checkPassword(info, req);

  return info;
}

module.exports = router;
