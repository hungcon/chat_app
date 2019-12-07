var express = require('express');
var router = express.Router();
var Account = require('../model/account');
var UserInfor = require('../model/userInfor');
const multer = require('multer');
var md5 = require('md5');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + '-' + file.originalname )
  }
})

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-in', function(req, res) {
  Account.findOne({userName: req.body.username}, function(err, doc){
    if (err) {
      res.status(401).send({message: 'Internal server error.'});
    } else {
      if (doc === null) {
        res.status(201).send({message: 'Account is not exists.'})
      } else {
        if (doc.password == md5(req.body.password)){
          res.status(201).send({message: 'OK', checkConfiguration: doc.checkConfiguration});
        } else {
          res.status(201).send({message: 'Password is not correct.'})
        }
      }
    }
  });
});


router.post('/create_account', function(req, res, next){
  var account = {
    userName: req.body.userName,
    password: md5(req.body.password),
    checkConfiguration: 0,
  };
  Account.findOne({userName: req.body.userName}, 
    function(err, doc){
      if (err) {
        res.status(401).send({message: 'Internal server error.'});
      } else {
        if(doc !== null) {
          if(doc.userName == req.body.userName){
            res.status(201).send({message: 'Username already exists'})
          }
        } else {
          Account.create(account, function(err, success){
            if(err){
              console.log(err);
              res.status(401).send({message: 'Internal server error.'});
            }else{
              res.status(201).send({message: 'OK'});
            }
          })
        }
      }
  });
 });

 router.post('/create_user_information', function(req, res){
    Account.findOne({userName: req.body.userName}, function(err, doc){
      if( err ){
        res.status(401).send({message: 'Internal server error.'})
      } else {
        var userInfor = {
          accounts: doc._id,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber
        };
        UserInfor.create(userInfor, function(err, success){
          if(err){
            res.status(401).send({message: 'Internal server error.'});
          }else{
            Account.update({userName: req.body.userName}, { $set: { checkConfiguration: 1}}).exec();
            res.status(201).send({message: 'OK'});
          }
        });
      }
    })
            // UserInfor.findOne({email: 'hungcon.5070@gmail.com'})
            // .populate('accounts')
            // .exec(function(err, doc){
            //   if(err){
            //     console.log(err)
            //   }
            //   res.send(doc);
            // })
            
 });


 

module.exports = router;
