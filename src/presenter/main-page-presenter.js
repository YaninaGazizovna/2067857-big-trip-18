import { render, RenderPosition } from '../framework/render.js';
import MainPageView from '../view/main-page-view.js';
import MessageView from '../view/message-view.js';
import PointPresenter from './point-presenter.js';
import SortView from '../view/sort-view.js';
import { updateItem, sortByPointPrice, sortByPointDuration } from '../util.js';
import { SortType } from '../fish/data.js';

export default class MainPagePresenter {

  #mainPageComponents = new MainPageView();
  #messageComponent = new MessageView();

  #pointModel = null;
  #pageContainer = null;
  #boardPoint = [];

  #pointPresenter = new Map();

  #sortComponent = new SortView();
  #currentSortType = SortType.DAY;
  #sourcedBoardPoint = [];

  constructor (pageContainer, pointModel){
    this.#pageContainer = pageContainer;
    this.#pointModel = pointModel;

  }

  init = () => {
    this.#boardPoint = [...this.#pointModel.points];
    this.#sourcedBoardPoint = [...this.#pointModel.points];

    this.#renderPage();

  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) =>{
    this.#boardPoint = updateItem(this.#boardPoint ,updatedPoint);
    this.#sourcedBoardPoint = updateItem(this.#sourcedBoardPoint ,updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#boardPoint.sort(sortByPointPrice);
        break;
      case SortType.TIME:
        this.#boardPoint.sort(sortByPointDuration);
        break;

      default:
        this.#boardPoint = [...this.#sourcedBoardPoint];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainPageComponents.element, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPage = () => {
    render(this.#mainPageComponents, this.#pageContainer);

    if (this.#boardPoint.length === 0){
      render( this.#messageComponent, this.#mainPageComponents.element);
    }

    this.#renderSort();
    this.#renderPointsList();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#mainPageComponents.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#boardPoint
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  };

  #renderPointsList = () =>{
    render(this.#mainPageComponents, this.#pageContainer);
    this.#renderPoints(0, Math.min(this.#boardPoint.length));
  };

  #clearPointList = () =>{
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
