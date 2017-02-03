/* eslint no-param-reassign: 0 */
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

router.get('/posts', [authorizedUser], (_req, res, next) => {
  res.render('post_idea', {
    hasError: false,
    topic: '',
    idea_text: '',
  });
});

router.get('/posts/:id', (req, res, next) => {
  knex('posts')
    .where('id', req.params.id)
    .then((post) => {
      res.send(post[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/posts', (req, res, next) => {
  let validate = checkPost(req);
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

// edit posts (edit.ejs)
router.patch('/posts', (req, res, next) => {
  console.log('hi look it all worked *falls down*', req.body);
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

function checkTopic(info, req) {
  const str = req.body.topic;
  if (str) {
    info.topic = req.body.topic;
  } else {
    if (!info.error.topic) {
      info.error.topic = [];
    }
    info.hasError = true;
    info.error.topic.push({ message: 'you must choose a topic' });
  }
}

function checkPostText(info, req) {
  const str = req.body.idea_text;
  let minMax = false;
  if (str.length >= 10 && str.length <= 300) {
    minMax = true;
  }
  if (minMax) {
    info.idea_text = req.body.idea_text;
  } else {
    if (!info.error.idea_text) {
      info.error.idea_text = [];
    }
    info.hasError = true;
    info.error.idea_text.push({ message: 'post must be between 10 and 300 characters' });
  }
}

function checkPost(req) {
  let info = {};
  info.hasError = false;
  info.error = {};

  checkTopic(info, req);
  checkPostText(info, req);

  return info;
}

module.exports = router;
