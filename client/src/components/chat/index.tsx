import Messages from "src/components/chat/Messages";
import Loading from "src/components/shared/Loading";
import Header from "src/components/shared/Header";
import Footer from "src/components/chat/Footer";
import Error from "src/components/chat/Error";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Message, MessagesData, ChatroomByID } from "src/interfaces";
import { QUERY_MESSAGES, QUERY_CHATROOM_BY_ID } from "src/apollo/queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { selectedContactState } from "src/recoil/selectedContact";
import { User as SessionUser } from "next-auth";
import { Socket } from "socket.io-client";


interface Variables {
  chatroomID: string;
};

interface Props {
  sessionUser: SessionUser;
  socket: Socket;
};

const Chat = ({ sessionUser, socket }: Props) => {
  const [selectedContact, setSelectedContact] = useRecoilState(selectedContactState);
  const [socketMessages, setSocketMessages] = useState<Message[]>([]);
  const router = useRouter();
  const chatroomID = `${router.query.room}`;
  const currentUserID = sessionUser.id;

  const { data: messagesData, loading, error } = useQuery<MessagesData, Variables>(QUERY_MESSAGES, {
    fetchPolicy: "network-only",
    variables: {
      chatroomID
    },
  });

  const [getChatroom] = useLazyQuery<ChatroomByID, Variables>(QUERY_CHATROOM_BY_ID, {
    fetchPolicy: "network-only",
    onCompleted: (chatroomData) => { 
      if (selectedContact._id === "") {
        const selectedContactID = chatroomData.chatroomByID.members.find( (id) => id !== sessionUser.id)!;
        setSelectedContact({
          _id: selectedContactID,
          name: `${router.query.chat}`
        });
      }
    }
  });

  const setSocketMessagesCB = useCallback((data: Message) => {
    setSocketMessages((pre) => [...pre, data]);
  }, []);

  const messagesProps = {
    socketMessages,
    currentUserID,
    messagesFromDB: messagesData?.messages!
  };

  const footerProps = {
    socket,
    sessionUser,
    setSocketMessagesCB
  };

  useEffect(() => {
    if(selectedContact._id === ""){
      getChatroom({
        variables: { 
          chatroomID
        }
      })
    };
  }, [selectedContact, chatroomID, getChatroom]);

  useEffect(() => {
    const data = { chatroomID, currentUserID };
    socket.emit("join_room", data);
  }, [socket, chatroomID, currentUserID]);

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="grow">
        {loading && <Loading />}
        {error && <Error />}
      </div>
      {messagesData && <Messages {...messagesProps} />}
      <Footer {...footerProps} />
    </div>
  );
};

export default Chat;
