import { ChatroomData, ChatroomInput, CreateChatroom, User } from "src/interfaces";
import NoContactsOrError from "src/components/contacts/NoContactsOrError";
import Avatar from "src/components/shared/Avatar";
import { GoPrimitiveDot } from "react-icons/go";
import { useRouter } from "next/router";
import { User as SessionUser } from "next-auth";
import { CREATE_CHATROOM } from "src/apollo/mutations";
import { QUERY_CHATROOM } from "src/apollo/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { searchedContactsState } from "src/recoil/contacts";
import { searchInputState } from "src/recoil/searchInput";
import { selectedContactState } from "src/recoil/selectedContact";
import { onlineUsersState } from "src/recoil/onlineUsers";


interface UserWithOnlineStatus extends User {
  online: boolean;
};

interface Props {
  sessionUser: SessionUser;
  contacts: User[];
};

const ContactList = ({ sessionUser, contacts }: Props) => {
  const [selectedContact, setSelectedContact] = useRecoilState(selectedContactState);
  const searchedContacts = useRecoilValue(searchedContactsState);
  const resetSearchInput = useResetRecoilState(searchInputState);
  const searchInputValue = useRecoilValue(searchInputState);
  const onlineUsers = useRecoilValue(onlineUsersState);
  const router = useRouter();

  const [createChatroom] = useMutation<CreateChatroom, ChatroomInput>(CREATE_CHATROOM, {
    onCompleted: (createdChatroom: CreateChatroom) => {
      router.push({
        pathname: "/",
        query: {
          room: createdChatroom.createChatroom._id,
          chat: selectedContact.name
        }
      });
    }
  });

  const [getChatroom] = useLazyQuery<ChatroomData, ChatroomInput>(QUERY_CHATROOM, {
    fetchPolicy: "network-only",
    onCompleted: (chatroomData: ChatroomData) => {
      router.push({
        pathname: "/",
        query: {
          room: chatroomData.chatroom._id,
          chat: selectedContact.name
        }
      });
    },
    onError: () => {
      createChatroom({
        variables: {
          input: {
            currentUserID: sessionUser.id,
            selectedContactID: selectedContact._id,
          }
        }
      });
    }
  });

  const handleClick = (_id: string, name: string) => {
    if (_id === selectedContact._id) return;
    getChatroom({
      variables: {
        input: {
          currentUserID: sessionUser.id,
          selectedContactID: _id,
        }
      }
    });
    setSelectedContact({ _id, name });
    if(searchInputValue !== ""){
      resetSearchInput()
    };
  };

  const contactsWithOnlineStatus: UserWithOnlineStatus[] = (searchInputValue ? searchedContacts : contacts).map((contact) => {
    return {
      ...contact,
      online: onlineUsers.some((user) => user.userID === contact._id)
    };
  });

  return (
    <>
      {contactsWithOnlineStatus.length === 0 && <NoContactsOrError message="no contacts :(" />}
      <div className="contacts hover:overflow-y-scroll">
        {contactsWithOnlineStatus.map(({ _id, name, image, status, online }) => (
          <div
           key={_id}
           onClick={() => handleClick(_id, name)}
           className={`w-[310px] flex items-center p-5 ${selectedContact._id === _id ? "bg-dark" : "cursor-pointer hover:bg-dark"}`}
          >
            <Avatar src={image} width={10} height={10} />
            <div className="ml-2 grow">
              <p className="text-sm font-semibold"> {name} </p>
              <p className="text-xs text-gray-400">
                {status ?? "Hey there, i am using Chat App"}
              </p>
            </div>
            {online && <GoPrimitiveDot className="text-green-500" />}
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactList;
