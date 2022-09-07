import { render, RenderPosition,remove } from '../framework/render.js';
import MainPageView from '../view/main-page-view.js';
import MessageView from '../view/message-view.js';
import PointPresenter from './point-presenter.js';
import SortView from '../view/sort-view.js';
import { sortByPointPrice, sortByPointDuration, sortByPointDate } from '../util.js';
import { SortType, UserAction, UpdateType } from '../fish/data.js';

export default class MainPagePresenter {

  #mainPageComponents = new MainPageView();
  #messageComponent = new MessageView();

  #pointModel = null;
  #pageContainer = null;

  #pointPresenter = new Map();

  #sortComponent = null;
  #currentSortType = SortType.DAY;

  constructor (pageContainer, pointModel){
    this.#pageContainer = pageContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points (){
    switch (this.#currentSortType){
      case SortType.PRICE:
        return [...this.#pointModel.points].sort(sortByPointPrice);

      case SortType.TIME:
        return [...this.#pointModel.points].sort(sortByPointDuration);

      case SortType.DAY:
        return [...this.#pointModel.points].sort(sortByPointDate);
    }

    return this.#pointModel.points;
  }

  init = () => {
    this.#renderPage();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearPage();
        this.#renderPage();
        break;

      case UpdateType.MAJOR:
        this.#clearPage({resetSortType: true});
        this.#renderPage();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType){
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;

      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;

      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPage();
    this.#renderPage();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#mainPageComponents.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) =>this.#renderPoint(point));
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#mainPageComponents.element, RenderPosition.BEFOREBEGIN);
  };

  #renderPage = () => {
    const points = this.points;
    const pointsCount = points.length;

    render(this.#mainPageComponents, this.#pageContainer);

    this.#renderSort();

    if (pointsCount === 0){
      render( this.#messageComponent, this.#mainPageComponents.element);
    }

    this.#renderPoints(points.slice(0, Math.min(pointsCount)));

  };

  #clearPage = ({resetSortType = false} = {}) => {
    //const pointCount = this.points.length;

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#messageComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
