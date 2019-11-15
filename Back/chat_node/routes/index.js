var express = require('express');
var router = express.Router();
var Account = require('../model/account');
var md5 = require('md5');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/createAccount', function(req, res, next){
  var account = {};
  account.userName = req.body.userName;
  account.firstName = req.body.firstName;
  account.lastName = req.body.lastName;
  account.password = md5(req.body.password);
  Account.create(account, function(err, success){
    if(err){
      res.send(err);
    }else{
      res.send({status: 'OK'})
    }
  })
 })


 

module.exports = router;
