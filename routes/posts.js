const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const ev = require('express-validation');
const validations = require('../validations/posts');

function authorizedUser(req, res, next) {
  //
  console.log('greetings from authorizedUser');
  let userID = req.session.user;
  if(userID){
    next();
  } else {
    res.render('restricted')
  }

}
router.get('/posts', [authorizedUser], (_req, res, next) => {
  console.log('it issssss working');
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
//ev(validations.post),
router.post('/posts', (req, res, next) => {
  console.log("inside posts, req.body", req.body);
  knex('posts')
    .insert({
      user_id: knex.select('id').from('users').where('id', req.session.user.id),
      idea_text: req.body.post_text,
      topic: req.body.topics,
    }, '*')
    .then((posts) => {
      res.redirect('/dashboard')
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
  console.log('in delete');
  knex('posts')
    .where('id', req.params.id)
    .where('user_id', req.sessions.user)
    .first()
    .then((post) => {
      knex('posts')
        .where('id', req.params.id)
        .del()
        .then(() => {
          console.log('deleted!');
          // delete post.id;
          // res.send(post);
        })
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
