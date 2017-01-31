const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const ev = require('express-validation');
const validations = require('../validations/posts');

function authorizedUser(req, res, next) {
  //
  let userID = req.session.user;
  if(userID){
    next();
  } else {
    res.render('restricted')
  }

}
router.get('/posts', [authorizedUser], (_req, res, next) => {
  res.render('post_idea');
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
  console.log("inside posts, req.body", req.body);
  knex('posts')
    .insert({
      user_id: knex.select('id').from('users').where('id', req.session.user.id),
      idea_text: req.body.idea_text,
      topic: req.body.topic,
    }, '*')
    .then((posts) => {
      res.redirect('/dashboard')
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/posts', (req, res, next) => {
  console.log('hi look it all worked *falls down*');
  knex('posts')
    .where('id', req.params.id)
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
        .where('id', req.params.id)
    })
    .then((post) => {
      res.send(post[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
