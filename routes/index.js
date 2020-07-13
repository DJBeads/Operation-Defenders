var express = require('express');
var router = express.Router();
const app = express();
var hb = require('express-handlebars');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// ---------------middleware---------------

app.use(express.static('./public'));

// do not touch this code
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
// do not touch this code

// ---------------middleware end---------------

router.get('/', (req, res) => {
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

module.exports = router;
