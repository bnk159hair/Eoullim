import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const Profilekey = atom<number>({
  key: 'profileId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
