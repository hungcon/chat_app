var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FriendSchema = new mongoose.Schema({
    requester: {
        type: Schema.Types.ObjectId,
        ref: 'UserInfor'
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'UserInfor'
    },
    status: {
        type: Number,
        enums: [
            0,    //'requested',
            1,    //'pending',
            2,    //'accepted',
            3,    //'rejected'
        ], 
        timestamp: true,
    }
});

var Friends = mongoose.model('Friends', FriendSchema);
module.exports = Friends;