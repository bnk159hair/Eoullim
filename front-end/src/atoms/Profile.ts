import { atom } from 'recoil';

export const Profilekey = atom<number>({
  key: 'profileId',
  default: 0,
});
