import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Contacts from 'src/components/contacts';
import client from 'src/apollo/client';
import { QUERY_USERS, QUERY_MESSAGES, QUERY_CHATROOM_BY_ID } from 'src/apollo/queries';
import { User, UsersData, Message, MessagesData, ChatroomByID } from 'src/interfaces';
import Chat from 'src/components/chat';
// import { Session, User } from 'next-auth';

interface Variables {
  chatroomID: string
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chatroomID = `${context.params!.id}`;
  const session = await getSession(context);
  const userID = session?.user.id;

  const { data: usersData } = await client.query<UsersData>({
    query: QUERY_USERS
  });

  const { data: messagesData } = await client.query<MessagesData, Variables>({
    fetchPolicy: "network-only",
    query: QUERY_MESSAGES,
    variables: {
      chatroomID
    }
  });

  const { data: chatroomData } = await client.query<ChatroomByID, Variables>({
    query: QUERY_CHATROOM_BY_ID,
    variables: {
      chatroomID
    }
  })
  
  const contacts = usersData.users.filter((user) => user._id !== userID);
  const currentUser = usersData.users.find((user) => user._id === userID);
  const currentContactID = chatroomData.chatroomByID.members.find((id) => id !== userID);

  const props = {
    contacts,
    currentUser,
    currentContactID,
    messages: messagesData.messages,
  }

  return {
    props: JSON.parse(JSON.stringify(props))
  }
};

interface Props {
  contacts: User[],
  currentUser: User,
  messages: Message[],
  currentContactID: string,
};

const Home: NextPage<Props> = ({contacts, messages, currentUser, currentContactID})  => {
 
  return (
    <div className="flex h-full bg-secondary">
      <div className="w-[30%] text-white">
        <Contacts contacts={contacts} currentUser={currentUser} currentContactID={currentContactID} />
      </div>
      <div className="h-full w-[70%] bg-slate-200">
        <Chat currentUserID={currentUser._id} messagesFromDB={messages} />
      </div>
    </div>      
  )
};

export default Home;