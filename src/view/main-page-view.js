import { createElement } from '../render.js';

const mainPageTemplate = () => ' <ul class="trip-events__list"></ul>';

export default class MainPageView {
  #element = null;
  getTemplate() {
    return mainPageTemplate;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
