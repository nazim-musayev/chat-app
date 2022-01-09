import React, { useState, useEffect, Dispatch, SetStateAction, MouseEventHandler } from 'react';
import dynamic from "next/dynamic";
import { IEmojiData } from 'emoji-picker-react';
import { MdSentimentSatisfiedAlt, MdDone, MdSend } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';
import { Message } from 'src/interfaces';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from 'src/apollo/mutations';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client'; 
import { v4 as uuid } from 'uuid';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { socketMessagesState } from 'src/recoil/messages';

const socket: Socket = io("http://localhost:3001");


const Picker = dynamic(() => import('emoji-picker-react'), {
  ssr: false
});

interface MessageInput {
  input: Omit<Message, "_id" | "createdAt">
};

interface SendMessage {
  sendMessage: Message
};

interface Props {
  setSocketMessages: Dispatch<SetStateAction<Message[]>>
}

const Footer = ({setSocketMessages}: Props) => {
  const [sendMessage] = useMutation<SendMessage, MessageInput>(SEND_MESSAGE);
  // const [socketMessages, setSocketMessages] = useRecoilState(socketMessagesState);
  // const resetSocketState = useResetRecoilState(socketMessagesState);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { data: session } = useSession();
  const { query } = useRouter();
  const chatroomID = query.id;
  const unique_id = uuid();

  const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    setMessage(current => current + emojiObject.emoji);
  };

  const handleSendMessage = async () => {
    if(message === "") return;

    const data: Message = {
      _id: unique_id,
      chatroomID: `${chatroomID}`,
      sender: session?.user.id!,
      image: session?.user.image!,
      message,
      createdAt: `${new Date().getTime()}`
    };

    await socket.emit("send_message", data);

    sendMessage({
      variables: {
        input: {
          chatroomID: `${chatroomID}`,
          message,
          sender: session?.user.id!,
          image: session?.user.image!
        }
      }
    });

    setMessage('');
    setSocketMessages((pre) => [...pre, data]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.code === "Enter"){
      handleSendMessage()
    }
  };

  useEffect(() => {
    // resetSocketState();
    socket.emit("join_room", chatroomID);
  }, [socket]);
  
  useEffect(() => {
    socket.on("new_message", (data) => {
      setSocketMessages((pre) => [...pre, data])
    });
    // return () => resetSocketState();
  }, [socket]);


  return (
      <div className="w-full pr-2 py-2 bg-white text-primary">
        {emojiPicker && <Picker pickerStyle={{ width: '100%' }} onEmojiClick={onEmojiClick} /> }
        <div className="flex items-center space-x-2 relative">
          <MdSentimentSatisfiedAlt 
           onClick={() => setEmojiPicker(!emojiPicker)}
           className=" text-[28px] absolute left-3 text-yellow-400 cursor-pointer" 
          />
          <input
            type="text"
            value={message}
            placeholder="Send Message" 
            className="py-2 pl-10 grow outline-white text-secondary" 
            onKeyDown={handleKeyDown}
            onClick={() => setEmojiPicker(false)}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message && <RiCloseFill className="text-2xl cursor-pointer" onClick={() => setMessage('')} />}
          <MdSend className="text-3xl w-16 cursor-pointer hover:text-secondary" onClick={handleSendMessage} />
        </div>
      </div>
    
  )
}

export default Footer