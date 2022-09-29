import AbstractView from '../framework/view/abstract-view.js';

const headerTemplate = () => '<div class="trip-main"></div>';

export default class HeaderView extends AbstractView{
  get template() {
    return headerTemplate;
  }
}
