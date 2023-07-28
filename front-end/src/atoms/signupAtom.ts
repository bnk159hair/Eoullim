import { atom } from 'recoil';

export interface UserData {
  guardianName: string;
  phoneNumber: string;
  username: string;
  password: string;
}

export const signupState = atom<UserData>({
  key: 'signupState',
  default: {
    guardianName: '',
    phoneNumber: '',
    username: '',
    password: '',
  },
});