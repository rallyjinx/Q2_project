/* eslint no-plusplus: 0 */
/* eslint no-param-reassign: 0 */

const express = require('express');
const knex = require('../db/knex');

const router = express.Router();

function authorizedUser(req, res, next) {
  const userID = req.session.user;
  if (userID) {
    next();
  } else {
    res.render('restricted');
  }
}

router.get('/dashboard', [authorizedUser], (req, res) => {
  knex('posts')
    .where('user_id', req.session.user.id)
    .then((myposts) => {
      knex('postsusers').innerJoin('posts', 'posts.id', 'postsusers.post_id')
      .where('postsusers.user_id', req.session.user.id)
      .then((posts) => {
        res.render('dashboard', {
          user: req.session.user.username,
          ideas: myposts,
          saved_ideas: posts,
        });
      });
    });
});

router.delete('/dashboard', [authorizedUser], (req, res, next) => {
  knex('posts')
    .where('id', req.body.id)
    .where('user_id', req.session.user.id)
    .first()
    .del()
      .then((post) => {
        delete post.id;
        knex('posts')
          .where('user_id', req.session.user.id)
          .then((myposts) => {
            knex('postsusers').innerJoin('posts', 'posts.id', 'postsusers.post_id')
            .where('postsusers.user_id', req.session.user.id)
             .then((posts) => {
               res.render('dashboard', {
                 user: req.session.user.username,
                 ideas: myposts,
                 saved_ideas: posts,
               });
             });
          });
      })
    .catch((err) => {
      next(err);
    });
});

router.delete('/dashboard/saved', [authorizedUser], (req, res) => {
  knex('postsusers')
    .where('post_id', req.body.saved_id)
    .where('user_id', req.session.user.id)
    .first()
    .del()
    .then((post) => {
      delete post.id;
      knex('posts')
        .where('user_id', req.session.user.id)
        .then((myposts) => {
          knex('postsusers').innerJoin('posts', 'posts.id', 'postsusers.post_id')
          .where('postsusers.user_id', req.session.user.id)
           .then((posts) => {
             res.render('dashboard', {
               user: req.session.user.username,
               ideas: myposts,
               saved_ideas: posts,
             });
           });
        });
    });
});
module.exports = router;
