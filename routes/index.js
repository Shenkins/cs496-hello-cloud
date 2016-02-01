var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Title = require('../models/Title');

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

// GET - display all documents in DB
router.get('/api', function (req, res, next) {
  Title.find(function(err, Title){
    res.json(Title);
  });
});

// GET BY ID - find and display single title
router.get('/api/:recordID', function (req, res, next) {
  Title.find({_id:req.params.recordID}, function(err, Title){
    res.send(Title);
  })
});

// POST - Add new document into DB
router.post('/api', function (req, res, next) {
  var title = req.body;
  console.log('Adding title: ' + JSON.stringify(title));
  Title.insert(title, {safe:true}, function(err, result) {
    if (err) {
      res.json({'Error':'An error has occurred while inserting title'});
    } else {
      console.log('Success: ' + JSON.stringify(result[0]));
      res.json(result[0]);
    }
  });
});

// PUT - Update existing document in DB
router.put('/api/:recordID', function (req, res, next) {
  var id = req.params.id;
  var title = req.body;

  console.log('Updating title: ' + id);
  console.log(JSON.stringify(title));

  Title.update({'_id':new BSON.ObjectID(id)}, title, {safe:true}, function(err, result) {
    if (err) {
      console.log('Error updating title: ' + err);
      res.send({'Error':'An error has occurred while attempting to update title.'});
    } else {
      console.log('' + result + ' document(s) updated');
      res.json(title);
    }
  });
});


// DELETE 
router.delete('/api/:recordID', function (req, res, next) {

});



module.exports = router;
