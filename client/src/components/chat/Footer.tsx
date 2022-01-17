import { MdSentimentSatisfiedAlt, MdSend } from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { IEmojiData } from "emoji-picker-react";
import { User as SessionUser } from "next-auth";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "src/apollo/mutations";
import { Message } from "src/interfaces";
import { Socket } from "socket.io-client";
import MotionX from "src/components/shared/MotionX";


const Picker = dynamic(() => import("emoji-picker-react"), {
  ssr: false
});

interface MessageInput {
  input: Omit<Message, "_id" | "createdAt">;
};

interface SendMessage {
  sendMessage: Message;
};

interface Props {
  setSocketMessagesCB: (data: Message) => void;
  sessionUser: SessionUser;
  socket: Socket;
};

const Footer = ({ setSocketMessagesCB, sessionUser, socket }: Props) => {
  const [sendMessage] = useMutation<SendMessage, MessageInput>(SEND_MESSAGE);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { query } = useRouter();
  const chatroomID = query.room;
  const unique_id = uuid();

  const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    setMessage((current) => current + emojiObject.emoji);
  };

  const handleSendMessage = () => {
    if (message === "") return;

    const data: Message = {
      _id: unique_id,
      chatroomID: `${chatroomID}`,
      sender: sessionUser.id!,
      image: sessionUser.image!,
      message,
      createdAt: `${new Date().getTime()}`
    };

    socket.emit("send_message", data);

    sendMessage({
      variables: {
        input: {
          chatroomID: `${chatroomID}`,
          message,
          sender: sessionUser.id!,
          image: sessionUser.image!,
        }
      }
    });

    setMessage("");
    setSocketMessagesCB(data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSendMessage();
    };
  };

  useEffect(() => {
    socket.on("new_message", (data: Message) => {
      setSocketMessagesCB(data);
    });
  }, [socket, setSocketMessagesCB]);

  return (
    <div className="w-full pr-2 py-2 bg-white text-primary">
      {emojiPicker && (
        <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
      )}
      <div className="flex items-center space-x-2 relative">
        <MdSentimentSatisfiedAlt
          onClick={() => setEmojiPicker(!emojiPicker)}
          className="text-[28px] absolute left-3 text-yellow-400 cursor-pointer"
        />
        <input
          type="text"
          value={message}
          placeholder="Send Message"
          className="py-2 pl-10 grow outline-white text-secondary placeholder:text-gray-700"
          onKeyDown={handleKeyDown}
          onClick={() => setEmojiPicker(false)}
          onChange={(e) => setMessage(e.target.value)}
        />
        {message && (
          <MotionX>
            <RiCloseFill
              className="text-2xl cursor-pointer"
              onClick={() => setMessage("")}
            />
          </MotionX>
        )}
        <MdSend
          className="text-3xl w-16 cursor-pointer hover:text-secondary"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Footer;
