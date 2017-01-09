'use strict';

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const morgan = require('morgan');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(cookieParser());
app.use(cookieSession({
  secret: "squirrel"
}))
app.use(require('flash')());

const path = require('path');

app.use(express.static(path.join('public')));

//Cross-Site Request Forgery protection
app.use((req, res, next) => {
  const accept = '/json/.test(req.get(\'Accept\'))';
  if (accept) {
    return next();
  }
  res.sendStatus(406);
});

const users = require('./routes/users');
const posts = require('./routes/posts');
const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
const search = require('./routes/search');
const logout = require('./routes/logout')
const results = require('./routes/search')
const postsusers = require('./routes/postsusers')

app.use(users);
app.use(posts);
app.use(login);
app.use(dashboard);
app.use(search);
app.use(logout);
app.use(results);
app.use(postsusers);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).send(err);
  }
  console.error(err);
  res.sendStatus(500);
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
