import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {
  humanizeDate,
} from '../util.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/confetti.css';

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

  const pointOptionsTemplate = destinations.map(({ name }) => `<option value="${ name }"></option>`).join('');
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
        ${ pointOptionsTemplate }
      </datalist>
    </div>
  `);
};

const createOfferTemplate = ({id, title, price}, checked) => (`
  <div class="event__offer-selector">
    <input
      class="event__offer-checkbox visually-hidden"
      id="event-offer-${ id }"
      type="checkbox"
      name="event-offer-${ id }"

      ${ checked ? 'checked' : ''}
    >
    <label class="event__offer-label" for="event-offer-${ id }">
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

const EditionFormElementTemplate = (points,destinations, offers) => {
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
  const typeEditTemplate = createPointTypeTemplate(types,type);

  const destinationTemplate = createDestinationTemplate(type, pointDestination, destinations);

  const offersTemplate = createOffersSection(pointOffers, offerByType?.offers);
  const destinationSection = createDestinationSection(pointDestination, destinations);

  destinations.forEach((el) => destinationNames.push(el.name));

  const isSubmitDisabled = isDisabled | !dateFrom | !dateTo | !basePrice | !pointDestination;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                        ${ typeEditTemplate }
                        ${ destinationTemplate }
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
                    <input class="event__input  event__input--price" id="event-price-1" type="number" pattern="[0-9]+" name="event-price" value="${ basePrice }">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? 'disabled' : ''}>${ isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset">${ isDeleting ? 'Deleting...' : 'Delete' }</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                         ${ offersTemplate }
                         ${destinationSection }
                </section>
              </form>
            </li>`;
};

export default class FormEditionView extends AbstractStatefulView {
  #datepicker = null;
  #destinations = null;
  #offers = null;

  constructor(point, offers, destinations) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this._state = FormEditionView.parsePointToState(point);

    this.#setInnerHandlers();
  }

  get template() {
    return EditionFormElementTemplate(this._state, this.#destinations, this.#offers);
  }

  setFormSaveHandler = (callback) => {
    this._callback.formSave = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSaveHandler);
  };

  #formSaveHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSave(FormEditionView.parseStateToPoint(this._state));
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(FormEditionView.parseStateToPoint(this._state));
  };

  setRollupEditHandler = (callback) => {
    this._callback.rollupEdit = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupEditHandler);
  };

  #rollupEditHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupEdit(FormEditionView.parsePointToState(this._state));
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__type-input').forEach((i) =>
      i.addEventListener('click', this.#typeToggleHandler));
    this.#setDatepicker();
    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) => input.addEventListener('click', this.#offerClickHandler));
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSaveHandler(this._callback.formSave);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setRollupEditHandler(this._callback.rollupEdit);
    this.#setDatepicker();
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === evt.target.value),
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: Number(evt.target.value),
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

  #datesChangeHandler = ([userDateFrom,userDateTo]) => {
    this.updateElement({
      dateFrom: userDateFrom,
      dateTo:userDateTo
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

  reset = (point) => {
    this.updateElement(
      FormEditionView.parsePointToState(point)
    );
  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = {
      ...state
    };
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
