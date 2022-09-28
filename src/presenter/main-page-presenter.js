import { render, RenderPosition,remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import MainPageView from '../view/main-page-view.js';
import HeaderView from '../view/header-view.js';
import NewPointButtonView from '../view/new-point-button.js';
import MessageView from '../view/message-view.js';
import LoadingView from '../view/loading-view.js';
import PointModel from '../model/model.js';
import FilterModel from '../model/filter-model.js';
import PointPresenter from './point-presenter.js';
import TripInfoPresenter from './trip-info-presenter.js';
import FilterPresenter from './filter-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import SortView from '../view/sort-view.js';
import { sortByPointPrice, sortByPointDuration, sortByPointDate,filter } from '../util.js';
import { SortType, UserAction, UpdateType, FilterType, TimeLimit, AUTHORIZATION, END_POINT } from '../data.js';
import PointApiService from '../point-api-service.js';

export default class MainPagePresenter {

  #mainPageComponents = new MainPageView();
  #headerComponent = new HeaderView();
  #loadingComponent = new LoadingView();
  #newPointButton = new NewPointButtonView();

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #tripInfoPresenter = null;
  #filterPresenter = null;

  #pointModel = new PointModel(new PointApiService(END_POINT, AUTHORIZATION));
  #filterModel = new FilterModel();

  #pageContainer = null;
  #mainContainer = null;
  #messageComponent = null;

  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor (mainContainer,pageContainer){
    this.#pageContainer = pageContainer;
    this.#mainContainer = mainContainer;

    this.#filterPresenter = new FilterPresenter(this.#headerComponent.element, this.#filterModel, this.#pointModel);
    this.#newPointPresenter = new NewPointPresenter(this.#mainPageComponents.element, this.#handleViewAction,this.#pointModel);

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points (){
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType){
      case SortType.PRICE:
        return filteredPoints.sort(sortByPointPrice);

      case SortType.TIME:
        return filteredPoints.sort(sortByPointDuration);

      case SortType.DAY:
        return filteredPoints.sort(sortByPointDate);
    }

    return filteredPoints;
  }

  init = () => {
    this.#renderPage();
    this.#filterPresenter.init();
    this.#pointModel.init()
      .finally(() => {
        render(this.#newPointButton,this.#headerComponent.element);
        this.#newPointButton.setClickHandler(this.#handleNewPointButtonClick);
      });
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(callback);
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

      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPage();
        break;
    }
  };

  #handleViewAction = async(actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType){
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;

      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;

      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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

  #handleNewPointFormClose = () => {
    this.#newPointButton.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.createPoint(this.#handleNewPointFormClose);
    this.#newPointButton.element.disabled = true;
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#mainPageComponents.element, RenderPosition.AFTERBEGIN);
  };

  #renderInfo = (destinations, offers)=>{
    const points = this.#pointModel.points;
    this.#tripInfoPresenter = new TripInfoPresenter(this.#headerComponent.element,this.#pointModel);
    this.#tripInfoPresenter.init(points,destinations,offers);
  };

  #renderPoint = (point,destinations) => {
    const pointPresenter = new PointPresenter(this.#mainPageComponents.element, this.#handleViewAction, this.#handleModeChange,this.#pointModel);
    pointPresenter.init(point,destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#mainPageComponents.element, RenderPosition.BEFOREBEGIN);
  };

  #renderPage = () => {
    render(this.#headerComponent, this.#mainContainer);
    render(this.#mainPageComponents, this.#pageContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointsCount = points.length;

    this.#renderSort();

    if (pointsCount === 0){
      this.#messageComponent = new MessageView(this.#filterType);
      render( this.#messageComponent, this.#mainPageComponents.element);
    }

    this.#renderPoints(points.slice(0, Math.min(pointsCount)));
    this.#renderInfo(points.slice(0, 0));

  };

  #clearPage = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#tripInfoPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    remove(this.#loadingComponent);

    remove(this.#sortComponent);
    remove(this.#messageComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };
}
