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
  '2021-07-10T11:50:56.845Z',
  '2021-07-09T12:45:56.845Z',
  '2021-07-11T12:52:56.845Z',
  '2021-07-12T13:55:56.845Z'
];

const DATE_TO = [
  '2021-07-11T14:20:13.375Z',
  '2021-07-12T23:50:56.845Z',
  '2021-07-18T23:21:13.375Z',
  '2021-07-22T13:23:13.375Z',
  '2021-07-19T17:23:13.375Z',
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
