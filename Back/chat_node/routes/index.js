var express = require('express');
var router = express.Router();
var Account = require('../model/account');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getUsers', function(req, res, next) {
 
 Account.find({}, function(err, docs){
  res.send(docs);
 })  
});

router.post('/addUser', function(req, res, next){
  Account.create(user, function(err, success){
    if(err){
      res.send(err);
    }else{
      res.send({status: 'OK'})
    }
  })
 })

 
router.post('/getUser', function(req, res, next){
  passport.authenticate('local', function(err, user) {
    if (err) { return next(err) };
    if (!user) {
      return res.send({success: 1});
    }
  })
 })

 

module.exports = router;
