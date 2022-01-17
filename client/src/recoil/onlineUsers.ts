import { atom } from "recoil";
import { SocketUser } from "src/interfaces";

export const onlineUsersState = atom({
  key: "onlineUsersState",
  default: [] as SocketUser[]
});
