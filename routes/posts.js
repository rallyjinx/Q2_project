const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const ev = require('express-validation');
const validations = require('../validations/posts');

router.get('/posts', (_req, res, next) => {
  knex('posts')
    .orderBy('user_id')
    .then((posts) => {
      res.send(posts);
    })
    .catch((err) => {
      next(err);
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

router.post('/posts', ev(validations.post), (req, res, next) => {
  knex('posts')
    .insert({
      user_id: req.body.user_id, //????
      idea_text: req.body.idea_text,
      topic: req.body.topic,
      new_user_id: req.body.new_user_id, //????
      claimed: req.body.claimed //????
    }, '*')
    .then((posts) => {
      res.send(posts[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/posts/:id', (req, res, next) => {
  knex('posts')
    .where('id', req.params.id)
    .first()
    .then((post) => {
      if (!post) {
        return next();
      }
      return knex('posts')
        .update({
          user_id: req.body.user_id, //????
          idea_text: req.body.idea_text,
          topic: req.body.topic,
          new_user_id: req.body.new_user_id, //????
          claimed: req.body.claimed //????
        }, '*')
        .where('id', req.params.id)
    })
    .then((post) => {
      res.send(post[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/posts/:id', (req, res, next) => {
  knex('posts')
    .where('id', req.params.id)
    .first()
    .then((post) => {
      knex('posts')
        .where('id', req.params.id)
        .del()
        .then(() => {
          delete post.id;
          res.send(post);
        })
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
