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

router.get('/edit/:id', [authorizedUser], (req, res, next) => {
  console.log("edit");
  knex('posts')
    .where('id', req.params.id)
    .first()
    .then((post) => {
      console.log(post.idea_text, post.topic);
      res.render('edit', {
        ideatext: post.idea_text,
        topic: post.topic
      });
    })
});

module.exports = router;
