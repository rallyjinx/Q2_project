const express = require('express');
const knex = require('../db/knex');

const router = express.Router({
  mergeParams: true,
});

function authorizedUser(req, res, next) {
  //
  const userID = req.session.user;
  if (userID) {
    next();
  } else {
    res.render('restricted');
  }
}

router.get('/search', [authorizedUser], (req, res) => {
  res.render('search');
});

router.get('/results', [authorizedUser], (req, res) => {
  const topic = req.query.topic;

  // stretch goal: if random button, display random ideas

  // if topic is selected
  knex('posts')
    .where('topic', topic)
    .then((posts) => {
      res.render('results', { ideas: posts, topicname: topic });
    });
});

module.exports = router;
