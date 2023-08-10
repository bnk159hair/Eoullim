import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface Animon {
  id: number;
  headImagePath: string;
  bodyImagePath: string;
  name: string;
}

interface ChildProfile {
  animon: Animon;
  id: number;
  name: string;
  birth: number;
  gender: string;
  school: string;
  grade: number;
  status: string;
}

const { persistAtom } = recoilPersist();

export const Profilekey = atom<number>({
  key: 'profileId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const Profile = atom<ChildProfile>({
  key: 'profile',
  default: {
    id: 1,
    name: '짱구아들',
    birth: 1399248000000,
    gender: 'M',
    school: '떡잎초등학교',
    grade: 3,
    status: 'ON',
    animon: {
      id: 4,
      headImagePath: 'tiger_head',
      bodyImagePath: 'tiger_body',
      name: 'tiger',
    },
  },
});
