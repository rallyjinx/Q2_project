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
    console.log('ok');
    next();
  } else {
    res.render('restricted')
  }

}

router.get('/search', [authorizedUser], (req, res, next) => {

  res.render('search');
});

router.get('/results', [authorizedUser], (req, res, next) => {
  //make magic ejs stuff here
  //find posts with topic="search-term"
console.log('hi');
let topic = req.query.topic;
console.log('this should be the topic', topic);

//if random button, display random ideas

//if topic is selected
  knex('posts')
    .where('topic', topic)
    .then((posts) => {
      res.render('results', {ideas: posts, topicname: topic})
    })
  //display them with ejs
  //render the page

});


module.exports = router;
