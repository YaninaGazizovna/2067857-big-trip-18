import { generatePoint } from '../fish/point.js';
import { DESTINATION_VIEW_COUNT } from '../data.js';


export default class PointModel {
  points = Array.from({length: DESTINATION_VIEW_COUNT},generatePoint);

  getPoints = () => this.points;

}


