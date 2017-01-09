const express = require('express');
const router = express.Router({
  mergeParams: true
});

const knex = require('../db/knex');
const ev = require('express-validation');
const validations = require('../validations/posts');

function authorizedUser(req, res, next) {
  //
  let userID = req.session.user;
  if(userID){
    console.log('ok', userID);
    next();
  } else {
    res.render('restricted')
  }

}

router.post('/postsusers', [authorizedUser], (req, res, next) => {
  console.log('inside postsusers, post_id:', req.body.idea, 'user_id:', req.session.user.id);
  let idea_id = req.body.idea;
  knex('postsusers')
    .insert({
      user_id: req.session.user.id,
      post_id: idea_id
    }, '*')
    .then(() => {
      res.redirect('/dashboard')
    })


});

module.exports = router;
