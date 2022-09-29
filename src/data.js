const AUTHORIZATION = 'Basic jG3vfS21vsm2ba1k';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const MAXIMUM_CITIES_COUNT = 4;

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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const isEscapeKey = (evt) => evt.key === 'Escape' | evt.key === 'Esc';

export {
  MAXIMUM_CITIES_COUNT,
  AUTHORIZATION,
  END_POINT,
  FilterType,
  Method,
  SortType,
  UpdateType,
  UserAction,
  TimeLimit,
  Mode,
  isEscapeKey
};
