/* eslint no-param-reassign: 0 */

const express = require('express');

const router = express.Router();

router.get('/logout', (req, res) => {
  req.session = null;
  res.clearCookie('loggedin');
  res.redirect('login');
});

module.exports = router;
