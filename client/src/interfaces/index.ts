// Messages

export interface MessagesVariables {
  chatroomID: string
};

export interface Message {
  _id: string,
  chatroomID: string,
  sender: string, 
  message: string,
  image: string,
  createdAt: string
};

export interface MessagesData {
  messages: Message[]
};

export interface User {
  _id: string,
  name: string,
  email: string,
  image: string,
  status: string | null
};

export interface UsersData {
  users: User[]
};

export interface UpdateUserData {
  updateUser: User
};

export interface UpdateUserInput {
  input: {
    _id: string,
    name: string,
    status: string
  }
}

export interface ChatroomInput {
  input: {
    currentUserID: string,
    selectedContactID: string
  }
};

export interface Chatroom {
  _id: string,
  members: string[]
};

export interface ChatroomData {
  chatroom: Chatroom
};

export interface ChatroomsData {
  chatrooms: Chatroom[]
};

export interface ChatroomByID {
  chatroomByID: {
    members: string[]
  }
};

export interface CreateChatroom {
  createChatroom: Chatroom
};