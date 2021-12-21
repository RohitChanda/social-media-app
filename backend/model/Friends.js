const mongoose=require("mongoose");
const { Schema } = mongoose;
const validator=require("validator");
const friendsSchema = new Schema({
    requester: { 
        type: Schema.Types.ObjectId,
        ref: 'user'},
    recipient: { 
        type: Schema.Types.ObjectId,
        ref: 'user'},
    status: {
      type: Number,
      enums: [
          0,    //add friend
          1,    //requested
          2,    //pending
          3,    //friends
      ]
    }
  }, {timestamps: true})
const Friends= mongoose.model('Friends', friendsSchema);
module.exports =Friends;