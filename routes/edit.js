const express = require('express');
const knex = require('../db/knex');
const ev = require('express-validation');
const validations = require('../validations/posts');

const router = express.Router();

function authorizedUser(req, res, next) {
  const userID = req.session.user;
  if (userID) {
    next();
  } else {
    res.render('restricted');
  }
}

router.get('/edit/:id', [authorizedUser], (req, res, next) => {
  console.log('edit');
  knex('posts')
    .where('id', req.params.id)
    .first()
    .then((post) => {
      console.log(post.idea_text, post.topic);
      res.render('edit', {
        ideaid: post.id,
        ideatext: post.idea_text,
        edittopic: post.topic,
      });
    });
});

module.exports = router;
