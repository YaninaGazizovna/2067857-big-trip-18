import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizeHour,
  humanizeStartDate,
  formatHoursMinutes,
  differenceMinutes
} from '../util.js';
import {
  destinations,
  offer,
} from '../fish/point.js';

const destinationElementTemplate = (points) => {
  const {
    dateFrom,
    dateTo,
    type,
    basePrice,
    destination,
    isFavorite,
  } = points;

  const destinationNameTemplate = destinations.find((el) => (el.id === destination)).name;
  const pointOfferType = offer.filter((el) => (el.type === type));

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn'
    : 'event__favorite-btn--active';

  const selectedOffers = pointOfferType.map((el) => `<li class="event__offer">
      <span class="event__offer-title">${el.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${el.price}</span>
    </li>`).join('');

  const createDifferenceTimeFormat = () => {
    const differenceResult = differenceMinutes(dateFrom, dateTo);
    const humanizeDifferenceFormat = formatHoursMinutes(differenceResult);

    return humanizeDifferenceFormat;
  };

  return `<ul class="trip-events__list">
            <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${ dateFrom }">${ humanizeStartDate(dateFrom) }</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${ type }.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${ type } ${ destinationNameTemplate }</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime ="${ dateFrom }">${ humanizeHour(dateFrom) }</time>
                    &mdash;
                    <time class="event__end-time" datetime="${ dateTo }">${ humanizeHour(dateTo) }</time>
                  </p>
                  <p class="event__duration">${ createDifferenceTimeFormat() }</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${ basePrice }</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">

                    ${ selectedOffers }

                </ul>
                <button class="event__favorite-btn  ${ favoriteClassName }" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
                  </ul>`;
};

export default class DestinationView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return destinationElementTemplate(this.#point);
  }

  setDestinationEditHandler = (callback) => {
    this._callback.destinationEdit = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#destinationEditHandler);
  };

  #destinationEditHandler = (evt) => {
    evt.preventDefault();
    this._callback.destinationEdit();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click',this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) =>{
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
