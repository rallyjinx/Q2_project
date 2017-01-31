'use strict';
// from reddit-clone
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const ev = require('express-validation');
const validations = require('../validations/login');
const flash = require('flash');

router.get('/', function(req, res) {
  res.render('login');
});

router.get('/', function (req, res, next) {
  let user = req.session.user;
  res.render('dashboard')
});

router.get('/login', (_req, res, next) => {
  res.render('login');
});

function authorizedUser(req, res, next) {
  let userID = req.session.user.id;
  if(userID){
    next();
  } else {
    res.redirect('/')
  }
}

router.post('/login', ev(validations.post), function (req, res, next) {
  console.log('in login.js post', req.body.password);

  knex('users').where({
    email: req.body.email
  }).first().then(function (user) {
    console.log("before if", user);
    if(!user){
      res.redirect('/login') //add something here to say incorrect login or something
    } else {
      console.log('just before bcrypt.compare', req.body.password, user.digest);
      bcrypt.compare(req.body.password, user.digest, function(err, result) {
        if(result){
          console.log('yay!', result);
          req.session.user = user;
          res.cookie("loggedin", true);
          console.log(req.session.user.id);
          res.redirect('/dashboard');
        } else {
          console.log("you will not go to space today", result);
          res.redirect('/login')
        }
      })
    }
  })
});

module.exports = router;
