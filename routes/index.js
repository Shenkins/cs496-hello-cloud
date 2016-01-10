var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var currentDate = new Date();
  res.render('index', { title: 'Hello Cloud', date: currentDate });
});

module.exports = router;
