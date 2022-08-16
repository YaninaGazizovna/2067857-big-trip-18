import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import MainPagePresenter from './presenter/main-page-presenter.js';
import {
  render
} from './render.js';
import PointModel from './model/model.js';


const tripControls = document.querySelector('.trip-main__trip-controls');

const tripEventsSection = document.querySelector('.trip-events');

const pointModel = new PointModel();
const mainPagePresenter = new MainPagePresenter();


render(new FilterView(), tripControls);
render(new SortView(), tripEventsSection);

mainPagePresenter.init(tripEventsSection, pointModel);
