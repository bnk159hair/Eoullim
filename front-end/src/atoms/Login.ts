import { atom } from 'recoil';


export const loggedInUserIdState = atom<string>({
  key: 'loggedInUserId',
  default: '',
});