import { SortType } from './data.js';

const filter = {
  [SortType.DAY]:(points) => points.sort((point) => point),
  [SortType.EVENT]:(points) => points.sort((point) => point),
  [SortType.TIME]:(points) => points.sort((point) => point),
  [SortType.PRICE]:(points) => points.basePrice.sort((a, b) => b - a),
  [SortType.OFFER]:(points) => points.sort((point) => point)
};

export const generateSort = () => Object.entries(filter).map(
  ([sortName]) => ({
    name:sortName
  })
);
