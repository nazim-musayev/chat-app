import { ChatroomData, ChatroomInput, CreateChatroom, User } from 'src/interfaces';
import SearchContacts from 'src/components/contacts/SearchContacts';
import Header from 'src/components/contacts/Header';
import Avatar from 'src/components/shared/Avatar';
import { useSession } from 'next-auth/react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_CHATROOM } from 'src/apollo/mutations';
import { QUERY_CHATROOM } from 'src/apollo/queries';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { contactsState } from 'src/recoil/contacts';
import { searchInputState } from 'src/recoil/searchInput';
// import { User } from 'next-auth';


interface Props {
  contacts: User[],
  currentUser: User,
  currentContactID: string
};

const Contacts = ({contacts, currentUser, currentContactID}: Props) => {
  const [selectedContactID, setSelectedContactID] = useState<string>('');
  const searchedContacts = useRecoilValue(contactsState);
  const searchInputValue = useRecoilValue(searchInputState);
  const {data: session } = useSession()
  const currentUserID = session?.user.id!;
  const router = useRouter();

  const [createChatroom] = useMutation<CreateChatroom, ChatroomInput>(CREATE_CHATROOM, {
    onCompleted: (createdChatroom: CreateChatroom) => {
      const selectedContact = contacts.find((user) => user._id === selectedContactID)!;
      router.push({
        pathname: `${createdChatroom.createChatroom._id}`,
        query: {
          chat: selectedContact.name
        }
      });
    }
  });

  const [getChatroom] = useLazyQuery<ChatroomData, ChatroomInput>(QUERY_CHATROOM, {
    fetchPolicy: "network-only",
    onCompleted: (chatroomData: ChatroomData) => {
      const selectedContact = contacts.find((user) => user._id === selectedContactID)!;
      router.push({
        pathname: `${chatroomData.chatroom._id}`,
        query: {
          chat: selectedContact.name
        }
      })
    },
    onError: () => {
      createChatroom({
        variables: {
          input: {
            currentUserID,
            selectedContactID
          }
        }
      })
    },
  });
  
  const handleClick = (_id: string) => {
    if(_id === selectedContactID) return;

    getChatroom({
      variables: {
        input: {
          currentUserID,
          selectedContactID: _id
        }
      }
    });

    setSelectedContactID(_id);
  };

  return (
    <div className="relative h-full flex flex-col space-y-8">
      <Header currentUser={currentUser} />
      <div className="px-5">
        <SearchContacts contacts={contacts} />
      </div>
      <div className="contacts hover:overflow-y-scroll">
      {(searchInputValue ? searchedContacts : contacts).map(({_id, name, image, status}) => (
        <div
         key={_id}
         onClick={() => handleClick(_id)}
         className={`flex items-center space-x-2 p-5 ${currentContactID === _id ? "bg-dark" : "cursor-pointer hover:bg-dark"}`} 
        >
          <Avatar src={image} width={10} height={10} />
          <div>
            <p className="text-sm font-semibold"> {name} </p>
            <p className="text-xs text-gray-400">{status ?? "Hey there, i am using Chat App"}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Contacts