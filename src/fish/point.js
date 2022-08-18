import {
  getRandomInteger,
  getMixArray
} from '../util.js';
import {
  EVENT_TYPE,
  OFFER_TYPE_TITLE,
  PICTURES
} from './data.js';

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
  basePrice: 2220,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  id: getRandomInteger(1,3),
  destination: getRandomInteger(1,3),
  isFavorite: false,
  offers: getRandomInteger(1,3),
  type: generateType(),
});
