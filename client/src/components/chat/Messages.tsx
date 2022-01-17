import NoMessages from "src/components/chat/NoMessages";
import MotionDiv from "src/components/shared/MotionDiv";
import Avatar from "src/components/shared/Avatar";
import { useEffect, useRef } from "react";
import { Message } from "src/interfaces";
import Moment from "react-moment";

interface Props {
  currentUserID: string;
  messagesFromDB: Message[];
  socketMessages: Message[];
};

const Messages = ({ messagesFromDB, currentUserID, socketMessages }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const allMessages = Array.from([...messagesFromDB, ...socketMessages]).map((item, index, array) => {
    return {
      ...item,
      image: (index !== 0 && item.sender === array[index - 1].sender) || item.sender === currentUserID ? "" : item.image,
      createdAt: new Intl.DateTimeFormat("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",}).format(Number(item.createdAt))
    };
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  return (
    <>
      {allMessages.length === 0 && <NoMessages />}
      <div className="flex flex-col p-4 space-y-2 h-full overflow-y-scroll">
        {allMessages.map(({ sender, message, _id, image, createdAt }) => (
          <div
           ref={scrollRef}
           key={_id}
           className={`w-[55%] ${sender === currentUserID ? "self-end" : undefined}`}
          >
            <MotionDiv classes="flex flex-col space-y-1">
              <span className="text-xs text-center text-gray-700">
                <Moment fromNow>
                  {createdAt}
                </Moment>
              </span>
              <div className="flex space-x-2">
                {image ? <Avatar src={image} width={10} height={10} /> : <div className="w-10 h-10" />}
                <p
                  className={`rounded-[50px] break-all w-full
                   ${sender === currentUserID ? "bg-primary text-white" : "bg-white"}
                   ${message.length > 40 ? "py-4 px-6" : "py-3 px-4"}`
                  }
                >
                  {message}
                </p>
              </div>
            </MotionDiv>
          </div>
        ))}
      </div>
    </>
  );
};

export default Messages;
