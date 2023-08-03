import { atom } from 'recoil';

export const Profilekey = atom<string>({
  key: 'tokenState',
  default: '',
});
