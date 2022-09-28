import MainPagePresenter from './presenter/main-page-presenter.js';

const tripEventsSection = document.querySelector('.trip-events');
const infoSection = document.querySelector('.trip-main');

const mainPagePresenter = new MainPagePresenter(infoSection,tripEventsSection);

mainPagePresenter.init();
