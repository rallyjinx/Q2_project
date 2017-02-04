/* eslint no-param-reassign: 0 */

const express = require('express');
const knex = require('../db/knex');
const checkTopic = require('../validations/checkPost').checkTopic;
const checkPostText = require('../validations/checkPost').checkPostText;

const router = express.Router();

function authorizedUser(req, res, next) {
  const userID = req.session.user;
  if (userID) {
    next();
  } else {
    res.render('restricted');
  }
}

router.get('/posts', [authorizedUser], (_req, res) => {
  res.render('post_idea', {
    hasError: false,
    topic: '',
    idea_text: '',
  });
});

function checkPost(req) {
  let info = {
    hasError: false,
    topic: '',
    idea_text: '',
  };
  info.hasError = false;
  info.error = {};

  checkTopic(info, req);
  checkPostText(info, req);

  return info;
}

router.post('/posts', (req, res, next) => {
  const validate = checkPost(req);
  if (validate.hasError) {
    return res.render('post_idea', validate);
  }

  knex('posts')
    .insert({
      user_id: knex.select('id').from('users').where('id', req.session.user.id),
      idea_text: req.body.idea_text,
      topic: req.body.topic,
    }, '*')
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/posts', (req, res, next) => {
  knex('posts')
    .where('id', req.body.id)
    .first()
    .then((post) => {
      if (!post) {
        return next();
      }
      return knex('posts')
        .update({
          user_id: req.body.user_id,
          idea_text: req.body.idea_text,
          topic: req.body.topic,
        }, '*')
        .where('id', req.body.id);
    })
    .then(() => {
      res.redirect('dashboard');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
