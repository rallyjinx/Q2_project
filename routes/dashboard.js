'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const ev = require('express-validation');
const validations = require('../validations/users');
const flash = require('flash');

router.get('/dashboard', (req, res, next) => {
 res.render('dashboard', {user: req.session.user.username})
})

module.exports = router;
