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
  console.log('a');
  Account.findOne({userName: req.body.username}, function(err, doc){
    if (err) {
      res.send(err);
    } else {
      if (doc.password == md5(req.body.password)){
        
        res.send({status: "OK"});
      }
    }
  });
});


router.post('/create_account', function(req, res, next){
  var account = {
    userName: req.body.userName,
    email: req.body.email,
    password: md5(req.body.password)
  };
  Account.create(account, function(err, success){
    if(err){
      res.send(err);
    }else{
      res.send({status: 'OK'})
    }
  })
 });

 router.post('/create_user_information', upload.single('avatarPath'), function(req, res, next){
    console.log(req.body);
    // UserInfor.create(userInfor, function(err, success){
    //   if(err){
    //     res.send(err);
    //   }else{
    //     res.send({status: 'OK'})
    //   }
    // })
 });


 

module.exports = router;
