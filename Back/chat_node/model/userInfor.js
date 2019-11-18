var mongoose = require('mongoose');
var UserInforSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  phoneNumber: {
      type: String,
      unique: true,
  },
  avatarPath: {
    type: String
  }
});
var UserInfor = mongoose.model('UserInfor', UserInforSchema);
module.exports = UserInfor;


