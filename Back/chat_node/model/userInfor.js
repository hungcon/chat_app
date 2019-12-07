var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UserInforSchema = new mongoose.Schema({
  accounts: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
      type: String,
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


