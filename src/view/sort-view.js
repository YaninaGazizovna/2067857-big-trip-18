import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../fish/data.js';

const createSortElementTemplate = () => {

  const sortTypeTemplate = () => Object.values(SortType).map((name) => {
    const isDisabled = name === 'offers' || name === 'event';
    const checked = (name === 'day') ? 'checked' : '';

    return `<div class="trip-sort__item  trip-sort__item--${ name }">
            <input id="sort-${ name }" class="trip-sort__input  visually-hidden" type="radio" ${ checked } name="trip-sort" value="sort-${ name }" ${ isDisabled ? 'disabled' : '' }>
              <label class="trip-sort__btn" for="sort-${ name }">${ name }</label>
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
  #sort = null;

  constructor(sort) {
    super();
    this.#sort = sort;
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.querySelector('.trip-sort__input').addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortTypeChange();
  };

  get template(){
    return sortElementTemplate(this.#sort);
  }
}
