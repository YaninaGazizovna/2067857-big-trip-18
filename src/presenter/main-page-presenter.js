import { render, RenderPosition } from '../framework/render.js';
import MainPageView from '../view/main-page-view.js';
import MessageView from '../view/message-view.js';
import PointPresenter from './point-presenter.js';
import SortView from '../view/sort-view.js';
import { updateItem } from '../util.js';

export default class MainPagePresenter {

  #mainPageComponents = new MainPageView();
  #messageComponent = new MessageView();

  #pointModel = null;
  #pageContainer = null;
  #boardPoint = [];

  #pointPresenter = new Map();

  #sortComponent = new SortView();

  constructor (pageContainer, pointModel){
    this.#pageContainer = pageContainer;
    this.#pointModel = pointModel;

  }

  init = () => {
    this.#boardPoint = [...this.#pointModel.points];
    this.#renderPage();

  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) =>{
    this.#boardPoint = updateItem(this.#boardPoint ,updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainPageComponents.element, RenderPosition.BEFOREBEGIN);
  };

  #renderPage = () => {
    render(this.#mainPageComponents, this.#pageContainer);
    this.#renderSort();

    for (let i = 0; i < this.#boardPoint.length; i++) {
      this.#renderPoint(this.#boardPoint[i]);
    }

    if (this.#boardPoint.length === 0){
      render( this.#messageComponent, this.#mainPageComponents.element);
    }
  };


  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#mainPageComponents.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id,pointPresenter);
  };

  #clearPointList = () =>{
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
