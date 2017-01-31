const express = require('express');
const knex = require('../db/knex');
const ev = require('express-validation');
const validations = require('../validations/users');

const router = express.Router();

function authorizedUser(req, res, next) {
  const userID = req.session.user;
  if (userID) {
    next();
  } else {
    res.render('restricted');
  }
}

router.get('/dashboard', [authorizedUser], (req, res, next) => {
  console.log('dashboard get route is totally working');
  knex('posts')
    .where('user_id', req.session.user.id)
    .then(myposts => myposts)
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
    // .then((post) => {
      // knex('posts')
      //   .where('id', req.body.id)
        // .where('id', req.session.user.id)
        // .del()
        .then((post) => {
          console.log('deleted!', post.id);
          delete post.id;
          knex('posts')
            .where('user_id', req.session.user.id)
            .then((myposts) => {
              console.log('myposts', myposts);

              return myposts;
            })
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
      // })
    .catch((err) => {
      next(err);
    });
});

router.delete('/dashboard/saved', [authorizedUser], (req, res, next) => {
  console.log('delete saved', req.body.saved_id, req.session.user.id);
  knex('postsusers')
    .where('post_id', req.body.saved_id)
    .where('user_id', req.session.user.id)
    .first()
    .del()
    .then((post) => {
      delete post.id;
      knex('posts')
        .where('user_id', req.session.user.id)
        .then(myposts => myposts)
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
