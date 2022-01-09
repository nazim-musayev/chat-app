import Footer from 'src/components/chat/Footer';
import { Message } from 'src/interfaces';
import Header from 'src/components/shared/Header';
import Avatar from 'src/components/shared/Avatar';
import { useEffect, useRef } from 'react';
import Moment from 'react-moment';
import MotionDiv from 'src/components/shared/MotionDiv';
import { useRecoilValue } from 'recoil';
import { socketMessagesState } from 'src/recoil/messages';
import { useState } from 'react';


interface Props {
  currentUserID: string,
  messagesFromDB: Message[]
};

const Chat = ({currentUserID, messagesFromDB}: Props) => {
  // const socketMessages = useRecoilValue(socketMessagesState);
  const [socketMessages, setSocketMessages] = useState<Message[]>([])
  const scrollRef = useRef<HTMLDivElement>(null);

  // console.log(socketMessages)

  const allMessages = Array.from([...messagesFromDB, ...socketMessages]).map((item, index, array) => {
    return {
      ...item,
      image: (index !== 0 && item.sender === array[index-1].sender || item.sender === currentUserID) ? "" : item.image,
      createdAt: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Number(item.createdAt))
    }
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [allMessages]);
  
  return (
    <div className="relative h-full flex flex-col">
      <Header />
      <div className="flex flex-col p-4 space-y-2 h-full overflow-y-scroll">
        {allMessages.map(({sender, message, _id, image, createdAt}) => (
          <div ref={scrollRef} key={_id} className={`w-[40%] ${sender === currentUserID ? "self-end" : undefined}`}>
            <MotionDiv classes="flex flex-col space-y-1">
              <span className="text-center text-xs text-gray-700">
                <Moment fromNow>
                  {createdAt}
                </Moment>
              </span>
              <div className="flex space-x-2">
                {image ? <Avatar src={image} width={10} height={10} /> : <div className="w-10 h-10" /> }
                <p className={`rounded-full p-3 grow ${sender === currentUserID ? "bg-primary text-white" : "bg-white"}`}>
                  {message}
                </p>
              </div>
            </MotionDiv>
          </div>
        ))}
      </div>
      <Footer setSocketMessages={setSocketMessages} />
    </div>
  )
}

export default Chat
