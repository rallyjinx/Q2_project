'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const ev = require('express-validation');
const validations = require('../validations/users');
const flash = require('flash');

function authorizedUser(req, res, next) {
  //
  let userID = req.session.user;
  if(userID){
    next();
  } else {
    res.render('restricted')
  }
}

router.get('/dashboard', [authorizedUser], (req, res, next) => {

  knex('posts')
    .where('user_id', req.session.user.id)
    .then((myposts) => {

      return myposts;

      //res.render('dashboard', {user: req.session.user.username, ideas: myposts})

    })
    .then((myposts) => {
      knex('postsusers').innerJoin('posts', 'posts.id', 'postsusers.post_id')
      .where('postsusers.user_id', req.session.user.id)
      .then((posts) => {
        res.render('dashboard', {
          user: req.session.user.username,
          ideas: myposts,
          saved_ideas: posts
        })
      })
    } )

});

module.exports = router;

// knex('posts')
//   .where('id', req.params.id)
//   .then((post) => {
//     res.send(post[0]);
//   })
//   .catch((err) => {
//     next(err);
//   });
// });
