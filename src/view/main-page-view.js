import { createElement } from '../render.js';

const mainPageTemplate = () => ' <ul class="trip-events__list"></ul>';

export default class MainPageView {
  getTemplate() {
    return mainPageTemplate;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
