import { atom } from "recoil";
import { User } from "src/interfaces";

export const userProfileState = atom<Pick<User, "status" | "name">>({
  key: "userProfileState",
  default: { name: "", status: "" },
});
