import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FilterType } from './data.js';

dayjs.extend(duration);

const humanizeDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY H:MM');
const humanizeHour = (dueDate) => dayjs(dueDate).format(' HH:MM');
const humanizeStartDate = (dueDate) => dayjs(dueDate).format('MMM DD');
const formatHoursMinutes = (minutes) =>
  dayjs.duration(minutes, 'minutes').format('DD[d] H[H] mm[M]');
const differenceMinutes = (dateFrom, dateTo) =>
  dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

const getSortWeight = (pointA, pointB) => {
  if (pointA < pointB) {
    return 0;
  }

  if (pointB >= pointA ) {
    return 1;
  }

  return null;
};

const isFuture = (dueDate) => dayjs(dueDate).isAfter(dayjs());
const isPast = (dueDate) => dayjs(dueDate).isBefore(dayjs());
const isSame = (dueDate) => dayjs(dueDate).isSame(dayjs());
const isDatesEqual = (dateA, dateB) => dayjs(dateA).isSame(dateB);

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

const filter = {
  [FilterType.EVERYTHING]:(points) => points.map((point) => point),
  [FilterType.FUTURE]:(points) => points.filter((point) => isFuture(point.dateFrom) || isSame(point.dateFrom)),
  [FilterType.PAST]:(points) => points.filter((point) => isPast(point.dateTo))
};

export {
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
  isDatesEqual,
  filter
};
