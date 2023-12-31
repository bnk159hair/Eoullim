import { atom } from 'recoil';

export const PublisherId = atom<number>({
  key: 'publisherId',
  default: 0,
});

export const PublisherVideoStatus = atom<boolean>({
  key: 'publisherVideoStatus',
  default: false,
});

export const PublisherAnimonURL = atom<string>({
  key: 'publisherAnimonURL',
  default: '',
});

export const PublisherGuideStatus = atom<boolean>({
  key: 'publisherGuideStatus',
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

export const SubscriberAnimonURL = atom<string>({
  key: 'subscriberAnimonURL',
  default: '',
});

export const SubscriberGuideStatus = atom<boolean>({
  key: 'subscriberGuideStatus',
  default: false,
});

export const IsAnimonLoaded = atom<boolean>({
  key: 'isAnimonLoaded',
  default: false,
});

export const guideSeq = atom<Number[]>({
  key: 'guideSeq',
  default: [],
});

export const GuideScript = atom<string>({
  key: 'guideScript',
  default: '',
});

export const TimeStamp = atom<string>({
  key: 'timeStamp',
  default: '',
});
