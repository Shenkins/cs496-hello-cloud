var express = require('express');
var router = express.Router();
var Record = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  var currentDate = new Date();
  res.render('index', { title: 'Hello Cloud', date: currentDate });
});

router.get('/dynamic', function(req, res, next) {
  var currentDate = new Date();
  console.log(req.body);
  //console.log(User);
  Record.find(function(err, Record){
    res.render('dynamic', { Record, title: 'Hello Cloud', date: currentDate });
  });
});

router.post('/dynamic', function(req, res, next) {
  //console.log(req.body);
  var temp = req.body;
  new Record({ 
    name : temp.name,
    email : temp.email,
    password : temp.password,
    gender : temp.gender,
    admin : temp.admin
  }).save(function(err, doc){
    if(err){
      //res.json(err);
    }else{
      //res.send('Success')
    }
  });
  var currentDate = new Date();
  Record.find(function(err, Record){
    res.render('dynamic', { Record, title: 'Hello Cloud', date: currentDate });
  });
});

router.get('/edit', function(req, res, next) {
  var currentDate = new Date();
  console.log(req.body);
  //console.log(User);
  Record.find(function(err, Record){
    res.render('dynamic', { Record, title: 'Hello Cloud', date: currentDate });
  });
});

router.get('/edit/:recordID', function(req, res, next) {
  //console.log(users);
  var currentDate = new Date();
  Record.find({_id:req.params.recordID}, function(err, Record){
    res.render('edit', { 
      Record, 
      title: 'Hello Cloud', 
      date: currentDate });
  });
});

// router.post('/edit/:recordID', function(req, res, next) {
//   var currentDate = new Date();
//   console.log(req.body);
//   var temp = req.body;
//   new Record({ 
//     _id : 
//     name : temp.name,
//     email : temp.email,
//     password : temp.password,
//     gender : temp.gender,
//     admin : temp.admin
//   }).save(function(err, doc){
//     if(err){
//       //res.json(err);
//     }else{
//       //res.send('Success')
//     }
//   });
//   Record.findOne({_id:req.params.recordID}, function(err, Record){
//     console.log('hello');
//     res.render('edit', { 
//       Record, 
//       title: 'Hello Cloud', 
//       date: currentDate 
//     });
//   });
// });

router.get('/db', function(req, res, next) {
  //console.log(users);
  Record.find(function(err, Record){
    console.log(Record);
    res.json(Record);
  });
});


module.exports = router;
