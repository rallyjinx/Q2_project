'use strict';
// from reddit-clone
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const ev = require('express-validation');
const validations = require('../validations/users');
const flash = require('flash');

router.get('/logout', (req, res, next) => {
  req.session = null;
  res.clearCookie('loggedin');
  res.redirect('login');

});

module.exports = router;
