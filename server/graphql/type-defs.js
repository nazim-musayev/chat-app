const { gql } = require("apollo-server");

const typeDefs = gql`
  input UserUpdateInput {
    _id: ID!,
    status: String!
    name: String!
  }

   input ChatroomInput {
    currentUserID: String!
    selectedContactID: String!
  }
  
  input MessageInput {
    chatroomID: ID!
    sender: String!
    message: String!
    image: String!
  }

  type SelectedContact {
    selectedContactID: String!
  }
  
  type Message {
    _id: ID!
    chatroomID: String!
    sender: String!
    message: String!
    image: String!
    createdAt: String!
  }

  type Chatroom {
    _id: ID!
    members: [String]!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    image: String!
    status: String
  }

  type Query {
    users: [User]!
    chatroomByID(chatroomID: ID!): Chatroom!
    chatroom(input: ChatroomInput!): Chatroom!
    messages(chatroomID: ID!): [Message]!
  }

  type Mutation {
    updateUser(input: UserUpdateInput!): User!
    createChatroom(input: ChatroomInput!): Chatroom!
    sendMessage(input: MessageInput!): Message!
  }
`;

module.exports = { typeDefs };