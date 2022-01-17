import { atom } from "recoil";

export const searchInputState = atom<string>({
  key: "searchInputState",
  default: ""
});
