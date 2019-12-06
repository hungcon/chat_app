var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UserInforSchema = new mongoose.Schema({
  accounts: {
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
  }
});
var UserInfor = mongoose.model('UserInfor', UserInforSchema);
module.exports = UserInfor;


