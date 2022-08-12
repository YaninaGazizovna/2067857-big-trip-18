import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import MainPagePresenter from './presenter/main-page-presenter.js';
import {
  render
} from './render.js';

const tripControls = document.querySelector('.trip-main__trip-controls');

const tripEventsSection = document.querySelector('.trip-events');

const mainPagePresenter = new MainPagePresenter();

render(new FilterView(), tripControls);
render(new SortView(), tripEventsSection);

mainPagePresenter.init(tripEventsSection);
