/* eslint no-param-reassign: 0 */

const express = require('express');
const knex = require('../db/knex');

const router = express.Router({
  mergeParams: true,
});

function authorizedUser(req, res, next) {
  let userID = req.session.user;
  if (userID) {
    next();
  } else {
    res.render('restricted');
  }
}

router.post('/postsusers', [authorizedUser], (req, res) => {
  let idea_id = req.body.idea;
  knex('postsusers')
    .insert({
      user_id: req.session.user.id,
      post_id: idea_id,
    }, '*')
    .then(() => {
      res.redirect('/dashboard');
    });
});

module.exports = router;
