import { render } from './framework/render.js';
import MainPagePresenter from './presenter/main-page-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button.js';

const tripControls = document.querySelector('.trip-main__trip-controls');

const tripEventsSection = document.querySelector('.trip-events');
const mainPageSection = document.querySelector('.page-body__container');

const pointModel = new PointModel();
const filterModel = new FilterModel();
const newPointButton = new NewPointButtonView();

const mainPagePresenter = new MainPagePresenter(tripEventsSection, pointModel,filterModel);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointModel);

const handleNewPointFormClose = () => {
  newPointButton.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  mainPagePresenter.createTask(handleNewPointFormClose);
  newPointButton.element.disabled = true;
};

render(newPointButton,mainPageSection);
newPointButton.setClickHandler(handleNewPointButtonClick);

mainPagePresenter.init();
filterPresenter.init();
