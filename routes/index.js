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
  var statusMessage = 'Awaiting Submission';
  console.log(req.body);
  //console.log(User);
  Record.find(function(err, Record){
    res.render('dynamic', { statusMessage, Record, title: 'Hello Cloud', date: currentDate });
  });
});

router.post('/dynamic', function(req, res, next) {
  //console.log(req.body);
  var statusMessage = 'Awaiting Submission';
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
      statusMessage = 'Data Insertion Failed! Please try again.';
    }else{
      statusMessage = 'Data Added Successfully!';
    }
  });
  var currentDate = new Date();
  Record.find(function(err, Record){
    res.render('dynamic', { statusMessage, Record, title: 'Hello Cloud', date: currentDate });
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
  var currentDate = new Date();
  var statusMessage = 'Awaiting Submission';
  Record.find({_id:req.params.recordID}, function(err, doc){
    console.log(doc);
    res.render('edit', { 
      statusMessage,
      doc, 
      title: 'Hello Cloud', 
      date: currentDate 
    });
  });
});

router.post('/edit', function(req, res, next) {
  var currentDate = new Date();
  var temp = req.body;
  console.log(temp.id);
  var statusMessage = 'Awaiting Submission';
  new Record({ 
    _id : temp.id,
    name : temp.name,
    email : temp.email,
    password : temp.password,
    gender : temp.gender,
    admin : temp.admin
  }).save(function(err, doc){
    if(err){
      //res.json(err);
      statusMessage = 'Data Update Failed! Please try again.';
    }else{
      //res.send('Success')
      statusMessage = 'Data Updated Successfully!';
    }
  });
  var currentDate = new Date();
  Record.find({_id:temp.id}, function(err, doc){
    console.log(doc);
    res.render('edit', { 
      statusMessage,
      doc, 
      title: 'Hello Cloud', 
      date: currentDate 
    });
  });
});

router.get('/db', function(req, res, next) {
  //console.log(users);
  Record.find(function(err, Record){
    console.log(Record);
    res.json(Record);
  });
});


module.exports = router;
