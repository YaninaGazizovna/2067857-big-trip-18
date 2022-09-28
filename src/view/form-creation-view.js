import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {
  humanizeDate,
} from '../util.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/confetti.css';

const BLANK_POINT = {
  basePrice: 0,
  destination: 0,
  type:'taxi',
  destinationNameTemplate:'',
  offers:[],
};

const createTypeTemplate = (type, checked) => (
  `<div class="event__type-item">
    <input
      id="event-type-${ type }"
      class="event__type-input visually-hidden"
      type="radio"
      name="event-type"
      value="${ type }"
      ${ checked ? 'checked' : ''}
    >
    <label class="event__type-label event__type-label--${ type }" for="event-type-${ type }">${ type }</label>
  </div>
`);

const createPointTypeTemplate = (types, type) => {
  const typesTemplate = types.map((item) => createTypeTemplate(item, item === type)).join('');
  const icon = type
    ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">`
    : '';

  return (`
    <div class="event__type-wrapper">
      <label class="event__type event__type-btn" for="event-type-toggle">
        <span class="visually-hidden">Choose event type</span>
        ${icon}
      </label>
      <input class="event__type-toggle visually-hidden" id="event-type-toggle" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${ typesTemplate }
        </fieldset>
      </div>
    </div>
  `);
};

const destinationNames = [];

const createDestinationTemplate = (type, pointDestination, destinations) => {

  const createPointOptionsTemplate = destinations.map(({ name }) => `<option value="${ name }"></option>`).join('');
  const destination = destinations.find((item) => pointDestination?.id === item.id);

  return (`<div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination">
        ${ type || ''}
      </label>
      <input
        class="event__input event__input--destination"
        id="event-destination"
        type="text" pattern="${ destinationNames.join('|') }
        name="event-destination"
        value="${ destination?.name || ''}"
        list="destination-list"
        required>
      <datalist id="destination-list">
        ${ createPointOptionsTemplate }
      </datalist>
    </div>
  `);
};

const createOfferTemplate = ({id, title, price}, checked) => (`
  <div class="event__offer-selector">
    <input
      class="event__offer-checkbox visually-hidden"
      id="event-offer-${id}"
      type="checkbox"
      name="event-offer-${id}"

      ${checked ? 'checked' : ''}
    >
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`);

const createDestinationSection = (pointDestination, destinations) => {
  const destination = destinations.find((item) => item.id === pointDestination?.id);

  if (!destination) {
    return '';
  }

  const picturesTemplate = destination?.pictures?.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('') || '';

  return (`
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination ? destination.description : ''}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${picturesTemplate}
        </div>
      </div>
    </section>
  `);
};

const createOffersSection = (eventOffers, offers) => {
  if (!offers?.length) {
    return '';
  }

  const offerIdsNumber = eventOffers.map(({id}) => id);

  const offersTemplate = offers.map((offer) => createOfferTemplate(offer, offerIdsNumber.includes(offer.id))).join('');

  return (`
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${ offersTemplate }
      </div>
    </section>
  `);
};

const creationFormElementTemplate = (points,destinations,offers) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    type,
    destination: pointDestination,
    offers: pointOffers,
    isDisabled,
    isSaving,
    isDeleting,
  } = points;

  const types = offers.map((offer) => offer.type);
  const offerByType = offers.find((item) => item.type === type);
  const typeTemplate = createPointTypeTemplate(types,type);

  const destinationTemplate = createDestinationTemplate(type, pointDestination, destinations);

  const offersTemplate = createOffersSection(pointOffers, offerByType?.offers);
  const destinationSection = createDestinationSection(pointDestination, destinations);

  destinations.forEach((el) => destinationNames.push(el.name));

  const isSubmitDisabled = isDisabled | !dateFrom | !dateTo | !basePrice | !pointDestination;

  return (
    `<li class="trip-events__item">
     <form class="event event--edit" action="#" method="post" ${isDisabled ? 'disabled' : ''}>
      <header class="event__header">
      ${ typeTemplate }

      ${ destinationTemplate }

      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value= "${ humanizeDate(dateFrom) }">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ humanizeDate(dateTo) }">
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-
      -1">
        <span class="visually-hidden">Price</span>

        ${ basePrice } &euro;

      </label>
      <input class="event__input  event__input--price" pattern="[1-9]+" id="event-price-1" type="number"  name="event-price" value="">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit"${ isSubmitDisabled ? 'disabled' : ''}>${ isSaving ? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" type="reset">${ isDeleting ? 'Deleting...' : 'Delete' }</button>
  </header>
  <section class="event__details">
    ${ offersTemplate }
    ${destinationSection }
  </section>
</form>
</li>`);
};

export default class FormCreationView extends AbstractStatefulView {
  #datepicker = null;
  #destinations = null;
  #offers = null;

  constructor(offers, destinations,point = BLANK_POINT) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this._state = FormCreationView.parsePointToState(point);

    this.#setInnerHandlers();
  }

  get template() {
    return creationFormElementTemplate(this._state, this.#destinations, this.#offers);
  }

  setFormSaveHandler = (callback) => {
    this._callback.formSave = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSaveHandler);
  };

  #formSaveHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSave(FormCreationView.parseStateToPoint(this._state));
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(FormCreationView.parseStateToPoint(this._state));
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__type-input').forEach((i) =>
      i.addEventListener('click', this.#typeToggleHandler));
    this.#setDatepicker();
    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) => input.addEventListener('click', this.#offerClickHandler));
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSaveHandler(this._callback.formSave);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.#setDatepicker();
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: Number(evt.target.value),
    });
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === evt.target.value),
    });
  };

  #datesChangeHandler = ([userDateFrom,userDateTo]) => {
    this.updateElement({
      dateFrom: userDateFrom,
      dateTo:userDateTo
    });
  };

  #offerClickHandler = (evt) => {
    evt.preventDefault();
    let offers = [...this._state.offers];

    const offerId = Number(evt.target.id.replace('event-offer-', ''));

    if (evt.target.checked) {
      const offersByType = this.#offers.find((item) => item.type === this._state.type).offers;
      const offer = offersByType.find(({id}) => offerId === id);
      offers.push(offer);
    }
    else {
      offers = this._state.offers.filter(({id}) => id !== offerId);
    }

    this.updateElement({
      offers,
    });
  };

  #setDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelectorAll('.event__input--time'),
      {
        enableTime: true,
        mode: 'range',
        minDate: 'today',
        dateFormat: 'j/m/y / h:i',
        onChange: this.#datesChangeHandler,
      },
    );
  };

  reset = (points) => {
    this.updateElement(
      FormCreationView.parsePointToState(points)
    );
  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const points = {
      ...state
    };

    delete points.isDisabled;
    delete points.isSaving;
    delete points.isDeleting;

    return points;
  };
}
