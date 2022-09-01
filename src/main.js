import FilterView from './view/filter-view.js';
import MainPagePresenter from './presenter/main-page-presenter.js';
import { render } from './framework/render.js';
import PointModel from './model/model.js';
import { generateFilter } from './fish/filter.js';

const tripControls = document.querySelector('.trip-main__trip-controls');

const tripEventsSection = document.querySelector('.trip-events');

const pointModel = new PointModel();

const mainPagePresenter = new MainPagePresenter(tripEventsSection, pointModel);

const filters = generateFilter(pointModel.points);

render(new FilterView(filters), tripControls);

mainPagePresenter.init();
