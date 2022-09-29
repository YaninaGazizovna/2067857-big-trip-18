import AbstractView from '../framework/view/abstract-view.js';

const mainPageTemplate = () => '<ul class="trip-events__list"></ul>';

export default class MainPageView extends AbstractView{
  get template() {
    return mainPageTemplate();
  }
}
