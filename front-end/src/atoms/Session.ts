import { atom } from 'recoil';

export const PublisherId = atom<number>({
  key: 'publisherId',
  default: 0,
});

export const PublisherVideoStatus = atom<boolean>({
  key: 'publisherVideoStatus',
  default: false,
});

export const SubscriberId = atom<number>({
  key: 'subscriberId',
  default: 0,
});

export const SubscriberVideoStatus = atom<boolean>({
  key: 'subscirberVideoStatus',
  default: false,
});
