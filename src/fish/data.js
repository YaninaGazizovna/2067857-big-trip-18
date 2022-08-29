const EVENT_TYPE = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DESTINATION_NAME = [
  'Amsterdam',
  'Geneva',
  'Chamonix',
  'Rome',
];

const PICTURES = [
  'https://i.picsum.photos/id/961/300/200.jpg?hmac=CGCfqgV607DU7GGSMm_b24yw6uLoTX7YqM9v6E2WOKE',
  'https://i.picsum.photos/id/511/300/200.jpg?hmac=IF234j2yMtCNT96snMrQv6BFx8NLfvxeEnynN7RsjGI',
  'https://i.picsum.photos/id/805/300/200.jpg?hmac=28eezqdZybSoXvf2TZhkS2MgleKvhVvuZwWCYDYNlaY',
  'https://i.picsum.photos/id/1044/300/200.jpg?hmac=8NoYjXRoHGgNbFgZIxMUh1aIy-YHBt-ahW2RlqUbhb4',
];

const OFFER_TYPE_TITLE = [
  'Choose seats',
  'Add luggage',
  'Upgrade to a business class',
  'Add meal',
  'Switch to comfort class'
];

const DATE_FROM = [
  '2019-07-10T23:50:56.845Z',
  '2019-07-09T23:45:56.845Z',
  '2019-05-11T21:52:56.845Z',
  '2019-03-12T19:55:56.845Z'
];

const DATE_TO = [
  '2019-08-11T11:20:13.375Z',
  '2019-07-12T23:50:56.845Z',
  '2019-09-11T23:21:13.375Z',
  '2019-10-11T13:23:13.375Z',
  '2019-11-11T11:23:13.375Z',
];

const FilterType = {
  'EVERYTHING':'everything',
  'FUTURE':'future',
  'PAST':'past'
};

const SortType = {
  DAY:'day',
  EVENT:'event',
  TIME:'time',
  PRICE:'price',
  OFFER:'offers'
};

export {
  EVENT_TYPE,
  DESTINATION_NAME,
  PICTURES,
  OFFER_TYPE_TITLE,
  DATE_FROM,
  DATE_TO,
  FilterType,
  SortType,
};
