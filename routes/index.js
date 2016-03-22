/**
 * Created by matthewthoms on 2016-03-17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home - Business Directory'
  });
});

module.exports = router;
