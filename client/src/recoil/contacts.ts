import { atom } from 'recoil';
import { User } from 'src/interfaces';

export const contactsState = atom({
  key: 'contactsState',
  default: [] as User[]
});

