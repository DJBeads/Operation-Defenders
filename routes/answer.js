var express = require('express');
var router = express.Router();
const db = require('../database/index');





router.get('/:id', function (req, res, next) {
  db
      .query(`select * from answers`)
      .then(result => {
        if (result.rows.length < 1) {
          next();
        } else {
          res.render("quiz", {answers: result.rows})
        }
      })
      .catch(err => next(err));
})

/* GET users listing. */
router.post('/answer', function(req, res, next) {
  
});


module.exports = router;
