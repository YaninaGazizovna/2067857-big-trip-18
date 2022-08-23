import { isFuture,isPast,isSame } from '../util.js';
import { FilterType } from './data.js';

const filter = {
  [FilterType.EVERYTHING]:(points) => points.map((point) => point),
  [FilterType.FUTURE]:(points) => points.filter((point) => isFuture(point.dateFrom) || isSame(point.dateFrom)),
  [FilterType.PAST]:(points) => points.filter((point) => isPast(point.dateTo))
};

export const generateFilter = () => Object.entries(filter).map(
  ([filterName]) => ({
    name:filterName
  })
);
