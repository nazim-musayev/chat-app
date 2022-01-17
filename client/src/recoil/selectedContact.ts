import { atom } from "recoil";
import { User } from "src/interfaces";

export const selectedContactState = atom<Pick<User, "_id" | "name">>({
  key: "selectedContactState",
  default: { _id: "", name: "" }
});
