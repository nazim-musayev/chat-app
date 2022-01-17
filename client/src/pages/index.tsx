import type { NextPage } from "next";
import Contacts from "src/components/contacts";
import Header from "src/components/shared/Header";
import Chat from "src/components/chat";
import { BsMessenger } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { onlineUsersState } from "src/recoil/onlineUsers";
import { selectedContactState } from "src/recoil/selectedContact";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3001");

const Home: NextPage = () => {
  const { data: session } = useSession();
  const sessionUser = session?.user!;
  const { asPath } = useRouter();
  const setOnlineUsers = useSetRecoilState(onlineUsersState);
  const resetSelectedContact = useResetRecoilState(selectedContactState);

  useEffect(() => {
    socket.emit("get_online", sessionUser.id);
  }, [sessionUser.id]);

  useEffect(() => {
    socket.on("get_users", (users) => setOnlineUsers(users));
  }, [setOnlineUsers]);

  useEffect(() => {
    !asPath.includes("room") && resetSelectedContact();
  }, [asPath, resetSelectedContact]);
  
  return (
    <div className="flex h-full bg-secondary">
      <div className="h-full w-[30%] text-white">
        <Contacts sessionUser={sessionUser} />
      </div>
      <div className="relative h-full w-[70%] bg-slate-200">
        {!asPath.includes("room") && (
          <>
            <Header />
            <BsMessenger className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-8xl text-primary" />
          </>
        )}
        {asPath.includes("room") && <Chat socket={socket} sessionUser={sessionUser} /> }
      </div>
    </div>
  );
};

export default Home;
