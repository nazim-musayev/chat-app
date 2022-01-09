const { model, Schema } = require('mongoose');

const ChatroomSchema = new Schema({
  members: []
});

module.exports = model('Chatroom', ChatroomSchema)