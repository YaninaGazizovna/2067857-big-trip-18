import {
  createElement
} from './render.js';

const MessageElementTemplate = () => (
  `<div class="page-body__container">
        <section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
          <p class="trip-events__msg">Click New Event to create your first point</p>
        </section>`
);

export default class MessageView {
  #element = null;

  getTemplate() {
    return MessageElementTemplate(this.point);
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
