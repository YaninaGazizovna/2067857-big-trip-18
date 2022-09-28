import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition,remove } from '../framework/render.js';

export default class TripInfoPresenter {
  #container = null;
  #pointModel = null;
  #point = null;

  #tripInfoView = null;

  constructor(container, pointModel) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init = (points) => {
    this.#point = points;
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];

    this.#tripInfoView = new TripInfoView(points,destinations,offers);

    render(this.#tripInfoView, this.#container, RenderPosition.BEFOREBEGIN);
  };

  destroy = () => {
    remove(this.#tripInfoView);
  };
}
