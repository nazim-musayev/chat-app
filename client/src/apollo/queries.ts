import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query getUsers($id: ID!) {
    users(id: $id) {
      _id
      name
      email
      image
      status
    }
  }
`;

export const QUERY_CHATROOM = gql`
  query getChatroom($input: ChatroomInput!) {
    chatroom(input: $input) {
      _id
      members
    }
  }
`;

export const QUERY_CHATROOM_BY_ID = gql`
  query getChatroomByID($chatroomID: ID!) {
    chatroomByID(chatroomID: $chatroomID) {
      members
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query getMessages($chatroomID: ID!) {
    messages(chatroomID: $chatroomID) {
      _id
      chatroomID
      sender
      message
      image
      createdAt
    }
  }
`;
