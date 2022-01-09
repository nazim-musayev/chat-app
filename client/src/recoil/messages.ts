import { atom } from 'recoil';
import { Message } from 'src/interfaces';

export const socketMessagesState = atom({
  key: 'socketMessagesState',
  default: [] as Message[]
});
 