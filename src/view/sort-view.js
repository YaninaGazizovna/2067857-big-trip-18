import AbstractView from '../framework/view/abstract-view.js';
import {
  SortType
} from '../data.js';

const createSortElementTemplate = () => {

  const sortTypeTemplate = (currentSortType) => Object.values(SortType).map((name) => {
    const isDisabled = name === 'offers' || name === 'event';

    return `<div class="trip-sort__item  trip-sort__item--${ name }">
            <input id="sort-${ name }"data-sort-type="${ name }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${ name }" ${ isDisabled ? 'disabled' : '' }>
              <label class="trip-sort__btn" data-sort-type="${ name }" for="sort-${ name }" ${ currentSortType === name ? 'checked' : ''}> ${ name }</label>
          </div>`;
  }).join('');

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
  #currentSortType = null;

  constructor (currentSortType){
    super();

    this.#currentSortType = currentSortType;
  }

  get template() {
    return sortElementTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);

  };

  #sortTypeChangeHandler = (evt) => {
    const inputElement = this.element.querySelectorAll('input');

    if (evt.target.dataset.sortType === 'offers' || evt.target.dataset.sortType === 'event') {
      return;
    }
    inputElement.forEach((element) => {
      if (evt.target.dataset.sortType === element.dataset.sortType) {

        element.checked = true;
      }
    });

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
