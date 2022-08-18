import { generatePoint } from '../fish/point.js';

const DESTINATION_VIEW_COUNT = 0;

export default class PointModel {
  #points = Array.from({length: DESTINATION_VIEW_COUNT},generatePoint);

  get points (){
    return this.#points;

  }
}
