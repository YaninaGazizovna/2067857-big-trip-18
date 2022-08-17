import { createElement } from '../render.js';
import {
  EVENT_TYPE,
  DESTINATION_NAME,
} from '../fish/data.js';
import {
  destinations,
  offer,
} from '../fish/point.js';
import { humanizeDate } from '../util.js';

const createTypeEditTemplate = (currentType) => EVENT_TYPE.map((type) =>
  `<div class="event__type-item">
   <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === 'checked'}>
   <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${type}</label>
   </div>`).join('');

const editDestinationNamesListTemplate = () => (
  DESTINATION_NAME.map((name) =>
    `<option value="${name}"></option>`));

const EditionFormElementTemplate = (points) => {
  const {
    basePrice ,
    dateFrom,
    dateTo,
    type,
    destination,
    offers,
  } = points;

  const typeEditTemplate = createTypeEditTemplate(type);
  const destinationNameListTemplate = editDestinationNamesListTemplate(destination);
  const destinationNameTemplate = destinations.find((el) => (el.id === destination)).name;
  const descriptionTemplate = destinations.find((el) => (el.id === destination)).description;

  const pointOfferType = offer.filter((el) => (el.type === type));

  const PointOfferTemplate = pointOfferType.map((el) => {
    const checked = (offers === el.id ) ? 'checked' : '';

    return ` <div class="event__offer-selector">
              <input class="event__offer-checkbox visually-hidden" id="event-offer-luggage-1" type="checkbox" ${ checked } name="event-offer-luggage">
              <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title"> ${ el.title } </span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price"> ${ el.price } </span>
              </div>`;
  });

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${ type }.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${ typeEditTemplate }

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                    ${ type }
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${ destinationNameTemplate }" list="destination-list-1">
                    <datalist id="destination-list-1">

                    ${ destinationNameListTemplate }

                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ humanizeDate(dateFrom) }">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ humanizeDate(dateTo) }">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${ basePrice }">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${PointOfferTemplate}

                      </div>
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${ descriptionTemplate }</p>
                  </section>
                </section>
              </form>
            </li>`;
};

export default class FormEditionView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return EditionFormElementTemplate(this.point);
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
