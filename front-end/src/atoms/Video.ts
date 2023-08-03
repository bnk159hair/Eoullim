import { atom } from 'recoil';

export const micStatus = atom<boolean>({
  key: 'micStatus',
  default: true,
});

export const cameraStatus = atom<boolean>({
  key: 'cameraStatus',
  default: true,
});
