import MainPagePresenter from './presenter/main-page-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/model.js';
import FilterModel from './model/filter-model.js';

const tripControls = document.querySelector('.trip-main__trip-controls');

const tripEventsSection = document.querySelector('.trip-events');

const pointModel = new PointModel();
const filterModel = new FilterModel();

const mainPagePresenter = new MainPagePresenter(tripEventsSection, pointModel,filterModel);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointModel);

mainPagePresenter.init();
filterPresenter.init();
