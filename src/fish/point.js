import {
  getRandomInteger,
  getMixArray
} from '../util.js';
import {
  EVENT_TYPE,
  OFFER_TYPE_TITLE,
  PICTURES,
  DATE_FROM,
  DATE_TO,
} from './data.js';
import { nanoid } from 'nanoid';

const generateType = () => {
  const type = EVENT_TYPE;

  const randomTypeIndex = getRandomInteger(0, type.length - 1);

  return type[randomTypeIndex];
};

const generateOfferTitle = () => {
  const title = OFFER_TYPE_TITLE;

  const randomTypeIndex = getRandomInteger(0, title.length - 1);

  return title[randomTypeIndex];
};

const generateDateFrom = () => {
  const date = DATE_FROM;

  const randomDateIndex = getRandomInteger(0, date.length - 1);

  return date[randomDateIndex];
};

const generateDateTo = () => {
  const date = DATE_TO;

  const randomDateIndex = getRandomInteger(0, date.length - 1);

  return date[randomDateIndex];
};

export const offer = [{
  id: 1,
  type: generateType(),
  title: generateOfferTitle(),
  price: getRandomInteger(60,2200)
},
{
  id: 2,
  type: generateType(),
  title: generateOfferTitle(),
  price: getRandomInteger(60,2200)
},
{
  id: 3,
  type: generateType(),
  title: generateOfferTitle(),
  price: getRandomInteger(60,2200)
}];


export const destinations = [{
  id: 1,
  description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  name: 'Chamonix',
  pictures: [{
    src: getMixArray(PICTURES),
    description: 'Beautiful Mountains'
  }]
},
{
  id: 2,
  description: 'Rome is often referred to as the City of Seven Hills due to its geographic location, and also as the "Eternal City". Rome is generally considered to be the "cradle of Western civilization and Christian culture',
  name: 'Rome',
  pictures: [{
    src: getMixArray(PICTURES),
    description: 'Italian Alps'
  }]
},
{
  id: 3,
  description: 'Amsterdam is the capital and largest city in the European country of the Netherlands. Amsterdam is famous for its canals and dikes.',
  name: 'Amsterdam',
  pictures: [{
    src: getMixArray(PICTURES),
    description: 'Mountains'
  }]
}
];

export const generatePoint = () => ({
  basePrice: getRandomInteger(1000,3000),
  dateFrom: generateDateFrom(DATE_FROM),
  dateTo: generateDateTo(DATE_TO),
  id: nanoid(),
  destination: getRandomInteger(1,3),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: getRandomInteger(1,3),
  type: generateType(),
});
