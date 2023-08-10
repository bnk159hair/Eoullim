import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const tokenState = atom<string>({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom<string>({
  key: 'userState',
  default: '',
});

export const sessionTokenState = atom<string>({
  key: 'sessionTokenState',
  default: '',
})