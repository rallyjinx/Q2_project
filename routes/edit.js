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

router.get('/edit/:id', [authorizedUser], (req, res) => {
  knex('posts')
    .where('id', req.params.id)
    .first()
    .then((post) => {
      res.render('edit', {
        ideaid: post.id,
        ideatext: post.idea_text,
        edittopic: post.topic,
      });
    });
});

module.exports = router;
