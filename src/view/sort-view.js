import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../fish/data.js';

const createSortElementTemplate = () => {

  const sortTypeTemplate = () => Object.values(SortType).map((name) => {
    const isDisabled = name === 'offers' || name === 'event';
    const checked = (name === 'day') ? 'checked' : '';

    return `<div class="trip-sort__item  trip-sort__item--${ name }">
            <input id="sort-${ name }" ${checked} class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${ name }" ${ isDisabled ? 'disabled' : '' }>
              <label class="trip-sort__btn" data-sort-type="${ name }" for="sort-${ name }">${ name }</label>
          </div>`;}).join('');

  return sortTypeTemplate;
};

const sortElementTemplate = () => {
  const sortTemplate = createSortElementTemplate();

  return ` <section class="trip-events">
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">

             ${ sortTemplate() }

            </form>
            </section>`;
};

export default class SortView extends AbstractView {
  get template(){
    return sortElementTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
