import AbstractView from '../framework/view/abstract-view.js';

const createFilterElementTemplate = (filter, isChecked) => {
  const {
    name
  } = filter;

  return `<div class="trip-filters__filter">
      <input id="filter-${ name }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${ name }" ${ isChecked ? 'checked' : '' }>
         <label class="trip-filters__filter-label" for="filter-${ name }">${ name } </label>
    </div>`;
};

const createFiltersTemplate = (filterItems) => {
  const filterTemplate = filterItems.map((filter) => createFilterElementTemplate(filter)).join('');

  return `<div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">

    ${ filterTemplate }

    <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
    </div>`;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
