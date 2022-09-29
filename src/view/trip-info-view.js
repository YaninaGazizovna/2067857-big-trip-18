import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { sortByPointDate, humanizeDates } from '../util.js';
import { MAXIMUM_CITIES_COUNT } from '../data.js';

const createTripInfoTemplate = (points, offers) => {

  const getTitle = () => {
    const cities = points
      .map(({destination}) => destination?.name)
      .reduce((items, city) => {
        if (items[items.length - 1] !== city) {
          items.push(city);
        }
        return items;
      }, []);

    if (cities.length < MAXIMUM_CITIES_COUNT) {
      return cities.join(' - ');
    }
    return `${cities[0]} - ... - ${cities[cities.length - 1]}`;
  };

  const datesCreation = () => {
    const endDates = points.map((point) => point.dateTo);
    const endDate = endDates.sort(sortByPointDate)[endDates.length - 1];
    const startDates = points.map((point) => point.dateFrom);
    const startDate = startDates.sort(sortByPointDate)[startDates.length - 1];

    return `${humanizeDates(startDate)} - ${humanizeDates(endDate)}`;
  };

  const totalPriceCreation = () => {
    const offerPrice = () => offers.map((el) => el.offers.map((elem) => elem.price ));
    const pointBasePrice = points.map((el) => el.basePrice);

    const count = (arr) => arr.reduce((acc, num) => acc + num, 0);

    return (count(offerPrice()[0]) + count(pointBasePrice));

  };

  return `<section class="trip-main__trip-info trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${ getTitle() }</h1>
    <p class="trip-info__dates">${ datesCreation()}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${ totalPriceCreation() }</span>
  </p>
</section>`;
};

export default class TripInfoView extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #offers = null;

  constructor(point,destinations,offers) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#point, this.#destinations, this.#offers);
  }
}
