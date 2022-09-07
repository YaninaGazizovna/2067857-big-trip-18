import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < min) {
    return;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getMixArray(array) {
  const arrayNew = array.map((index) => [Math.random(), index]);
  const arraySort = arrayNew.sort();
  const arrayMixed = arraySort.map((index) => index[1]);
  const arrayMixLength = arrayMixed.splice(
    getRandomInteger(0, array.length - 1)
  );

  return arrayMixLength;
}

const humanizeDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY H:MM');
const humanizeHour = (dueDate) => dayjs(dueDate).format(' HH:MM');
const humanizeStartDate = (dueDate) => dayjs(dueDate).format('MMM DD');
const formatHoursMinutes = (minutes) =>
  dayjs.duration(minutes, 'minutes').format('DD[d] H[H] mm[M]');
const differenceMinutes = (dateFrom, dateTo) =>
  dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

const isFuture = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');
const isPast = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
const isSame = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

const getSortWeight = (pointA, pointB) => {
  if (pointA < pointB) {
    return 0;
  }

  if (pointB >= pointA ) {
    return 1;
  }

  return null;
};

const sortByPointDuration = (pointA, pointB) => {
  pointA = differenceMinutes(pointA.dateFrom, pointA.dateTo);
  pointB = differenceMinutes(pointB.dateFrom, pointB.dateTo);

  const weight = getSortWeight(pointA,pointB);

  return weight ?? pointB - pointA;
};

const sortByPointPrice = (pointA, pointB) => {
  const weight = getSortWeight(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
};

const sortByPointDate = (pointA, pointB) => {
  const weight = getSortWeight(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
};

const isDatesEqual = (dateA, dateB) => dayjs(dateA).isSame(dateB);

export {
  getRandomInteger,
  getMixArray,
  humanizeDate,
  humanizeHour,
  isSame,
  isFuture,
  isPast,
  humanizeStartDate,
  differenceMinutes,
  formatHoursMinutes,
  sortByPointDuration,
  sortByPointPrice,
  sortByPointDate,
  isDatesEqual
};
