import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Contacts from 'src/components/contacts';
import client from 'src/apollo/client';
import { QUERY_USERS } from 'src/apollo/queries';
import { User, UsersData } from 'src/interfaces';
import Header from 'src/components/shared/Header';
import { BsMessenger } from 'react-icons/bs';


export const getServerSideProps: GetServerSideProps = async (context) => {  
  const session = await getSession(context);

  const { data } = await client.query<UsersData>({
    query: QUERY_USERS
  });

  const contacts = data.users.filter((user) => user._id !== session?.user.id);
  const currentUser = data.users.find((user) => user._id === session?.user.id);

  const props = {
    contacts,
    currentUser
  };

  return {
    props: JSON.parse(JSON.stringify(props))
  }
};

interface Props {
  contacts: User[],
  currentUser: User
};

const Home: NextPage<Props> = ({ contacts, currentUser })  => {
  return (
    <div className="flex h-full bg-secondary overflow-hidden">
      <div className="h-full w-[30%] text-white">
        <Contacts currentContactID='' contacts={contacts} currentUser={currentUser} />
      </div>
      <div className="h-full w-[70%] bg-slate-200 relative">
        <Header />
        <BsMessenger className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-8xl text-primary' />
      </div>
    </div>      
  )
}

export default Home
