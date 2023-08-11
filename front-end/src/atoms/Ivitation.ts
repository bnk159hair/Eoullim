import { atom } from 'recoil';

export const invitationToken = atom<string>({
  key: 'invitationToken',
  default: '',
});

export const invitationSessionId = atom<string>({
  key: 'invitationSessionId',
  default: '',
});
