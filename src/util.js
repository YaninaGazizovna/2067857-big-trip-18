import dayjs from 'dayjs';

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
  const arrayMixLength = arrayMixed.splice(getRandomInteger(0, array.length - 1));

  return arrayMixLength;
}

const humanizeDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY H:00');
const humanizeHour = (dueDate) => dayjs(dueDate).format(' HH:00');
const humanizeStartDate = (dueDate) => dayjs(dueDate).format('MMMM DD');
const differenceHoursMinutes = (dateFrom,dateTo) => dayjs(dateTo).diff(dayjs(dateFrom),'hour','minute');


export { getRandomInteger, getMixArray, humanizeDate, humanizeHour, humanizeStartDate, differenceHoursMinutes };
