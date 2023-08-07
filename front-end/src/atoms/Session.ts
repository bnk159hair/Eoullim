import { atom } from 'recoil';

export const PublisherId = atom<string>({
  key: 'publisherId',
  default: '',
});

export const PublisherVideoStatus = atom<boolean>({
  key: 'publisherVideoStatus',
  default: false,
});

export const SubscriberId = atom<string>({
  key: 'subscriberId',
  default: '',
});

export const SubscriberVideoStatus = atom<boolean>({
  key: 'subscirberVideoStatus',
  default: false,
});
