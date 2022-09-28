import AbstractView from '../framework/view/abstract-view.js';

const createFilterElementTemplate = (filter, currentFilterType) => {
  const {
    name,
    type
  } = filter;

  return `<div class="trip-filters__filter">
      <input id="filter-${ name }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${ type }" ${type === currentFilterType ? 'checked' : ''}>
         <label class="trip-filters__filter-label" for="filter-${ name }">${ name } </label>
    </div>`;
};

const createFiltersTemplate = (filterItems, currentFilterType) => {
  const filterTemplate = filterItems.map((filter) => createFilterElementTemplate(filter,currentFilterType)).join('');

  return `
  <div class="trip-main__trip-controls  trip-controls">
          <div class="trip-controls__filters">
            <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">

    ${ filterTemplate }

    <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
        </div>
        </div>

    `;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters,currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
