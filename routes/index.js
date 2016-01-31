var express = require('express');
var router = express.Router();
var User = require('../models/User');

//======================================================================================================
// ASSIGNMENT 1 - Hello Cloud

// GET
router.get('/', function(req, res, next) {
  var currentDate = new Date();
  res.render('index', { title: 'Hello Cloud', date: currentDate });
});




//======================================================================================================
// ASSIGNMENT 2 - Dynamic

// GET
router.get('/dynamic', function(req, res, next) {
  var currentDate = new Date();
  var statusMessage = 'Awaiting Submission';
  console.log(req.body);
  //console.log(User);
  User.find(function(err, User){
    res.render('dynamic', { statusMessage, User, title: 'Hello Cloud', date: currentDate });
  });
});

// POST
router.post('/dynamic', function(req, res, next) {
  //console.log(req.body);
  var statusMessage = 'Awaiting Submission';
  var temp = req.body;
  new User({ 
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
  User.find(function(err, User){
    res.render('dynamic', { statusMessage, User, title: 'Hello Cloud', date: currentDate });
  });
});

// GET EDIT
router.get('/edit', function(req, res, next) {
  var currentDate = new Date();
  console.log(req.body);
  //console.log(User);
  User.find(function(err, User){
     res.render('dynamic', { User, title: 'Hello Cloud', date: currentDate });
  });
});


// GET EDIT userID
router.get('/edit/:userID', function(req, res, next) {
  var currentDate = new Date();
  var statusMessage = 'Awaiting Submission';
  User.find({_id:req.params.userID}, function(err, doc){
    console.log(doc);
    res.render('edit', { 
      statusMessage,
      doc, 
      title: 'Hello Cloud', 
      date: currentDate 
    });
  });
});


// POST EDIT
router.post('/edit', function(req, res, next) {
  var currentDate = new Date();
  var temp = req.body;
  console.log(temp.id);
  var statusMessage = 'Awaiting Submission';
  User.findOneAndUpdate(
    {_id: temp.id},     //query
    {$set: {
      name : temp.name,
      email : temp.email,
      password : temp.password,
      gender : temp.gender,
      admin : temp.admin
      }
    },   //update
    {                                               //options
      upsert: true,              // create the doc when it's not there
      //returnOriginal:false     // return the modified doc *(new is not supported here!)
    }, 
    function(err, r){       //callback
      if(err) {
        console.log(err);
        statusMessage = 'Data Update Failed! Please try again!';
      } else {
        console.log('Successful update!')
        statusMessage = 'Data Updated Successfully';
      }
    }
  );
  // Record.save({ 
  //   _id : temp.id,
  //   name : temp.name,
  //   email : temp.email,
  //   password : temp.password,
  //   gender : temp.gender,
  //   admin : temp.admin
  // }).save(function(err, doc){
  //   if(err){
  //     //res.json(err);
  //     statusMessage = 'Data Update Failed! Please try again.';
  //   }else{
  //     //res.send('Success')
  //     statusMessage = 'Data Updated Successfully!';
  //   }
  // });
  var currentDate = new Date();
  User.find({_id:temp.id}, function(err, doc){
    console.log(doc);
    res.render('edit', { 
      statusMessage,
      doc, 
      title: 'Hello Cloud', 
      date: currentDate 
    });
  });
});


// VIEW DB JSON
router.get('/db', function(req, res, next) {
  //console.log(users);
  User.find(function(err, User){
    console.log(User);
    res.json(User);
  });
});


//======================================================================================================
// ASSIGNMENT 3 - API

// GET ALL
router.get('/api', function (req, res, next) {

});

// GET BY ID
router.get('/api/:recordID', function (req, res, next) {

});

// POST
router.post('/api/:recordID', function (req, res, next) {

});

// PUT
router.put('/api/:recordID', function (req, res, next) {

});


// DELETE 
router.delete('/api/:recordID', function (req, res, next) {

});



module.exports = router;
