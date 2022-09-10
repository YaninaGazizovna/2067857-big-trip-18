import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../fish/data.js';

const noPointTextType = {
  [FilterType.EVERYTHING]:'Click New Event to create your first point',
  [FilterType.FUTURE]:'There are no future events now',
  [FilterType.PAST]:'There are no past events now'
};

const MessageElementTemplate = (filterType) => {
  const noPointTextValue = noPointTextType[filterType];

  return (
    `<p class="trip-events__msg"> ${noPointTextValue} </p>`
  );
};

export default class MessageView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return MessageElementTemplate(this.#filterType );
  }
}
