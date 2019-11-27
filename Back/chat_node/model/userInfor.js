var mongoose = require('mongoose');
var UserInforSchema = new mongoose.Schema({
  userName: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
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
  firstName: {
    type: String
  },
  lastName: {
    type: String,
  },
  avatarPath: {
    type: String
  }
});
var UserInfor = mongoose.model('UserInfor', UserInforSchema);
module.exports = UserInfor;


