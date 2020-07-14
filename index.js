// --------------require modules----------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
var hb = require('express-handlebars');
var cookieSession = require('cookie-session');
const csurf = require('csurf');

// ---------------middleware---------------
app.use(
  cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(csurf());
app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(express.static('./public'));

// do not touch this code and do not touch
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
// do not touch this code

// ---------------middleware end---------------

// ------------route----------------

app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main'
  });
});
app.get('/transition', (req, res) => {
  res.render('transition', {
    layout: 'main'
  });
});
app.get('/quiz', (req, res) => {
  res.render('quiz', {
    layout: 'main'
  });
});

const port = 8080;

app.listen(port, () => {
  console.log('listening on port: ', port);
});
