import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      _id
      name
      email
      image
      status
    }
  }
`;

export const CREATE_CHATROOM = gql`
  mutation CreateChatroom($input: ChatroomInput!) {
    createChatroom(input: $input) {
      _id
      members
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      _id
      chatroomID
      sender
      message
      image
      createdAt
    }
  }
`;