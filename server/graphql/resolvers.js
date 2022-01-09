const User = require('../models/User');
const Chatroom = require('../models/Chatroom');
const Message = require('../models/Message');


const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    // chatrooms: async (_, { userID}) => {
    //   const chatrooms = await Chatroom.find({
    //     members: { $in: [ userID ] }
    //   });
    //   return chatrooms;
    // },
    chatroom: async (_, args) => {
      const { currentUserID, selectedContactID } = args.input;
      const chatroom = await Chatroom.findOne({
        members: { $all: [ currentUserID, selectedContactID ] }
      });
      return chatroom;
    },
    chatroomByID: async (_, { chatroomID }) => {
      const chatroom = await Chatroom.findOne({ _id: chatroomID });
      return chatroom;
    },
    messages: async (_, { chatroomID }) => {
      const messages = await Message.find({ chatroomID });
      return messages;
    }
  },
  Mutation: {
    updateUser: async (_, args) => {
      const {_id, status, name } = args.input;
      const updatedUser = await User.findByIdAndUpdate({ _id }, { status, name }, { new: true });
      return updatedUser;
    },
    createChatroom: async (_, args) => {
      const { currentUserID, selectedContactID } = args.input;
      const newChatroom = new Chatroom({
        members: [currentUserID, selectedContactID]
      });
      const chatroom = newChatroom.save();
      return chatroom;
    },
    sendMessage: async (_, args) => {
      const {chatroomID, sender, message, image} = args.input;
      const newMessage = new Message({
        chatroomID,
        sender,
        message,
        image
      });
      const savedMessage = newMessage.save();
      return savedMessage;
    }
  }
};

module.exports = { resolvers };