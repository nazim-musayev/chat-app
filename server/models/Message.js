const { model, Schema } = require('mongoose');

const MessageSchema = new Schema({
  chatroomID: String,
  sender: String,
  message: String,
  image: String
}, { timestamps: true });

module.exports = model('Message', MessageSchema);


// chatroomId: {
//   type: String
// },
// sender: {
//   type: String
// },
// message: {
//   type: String
// }