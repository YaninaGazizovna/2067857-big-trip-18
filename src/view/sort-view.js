import AbstractView from '../framework/view/abstract-view.js';

const createSortElementTemplate = (sort, isDisabled) =>{
  const {
    name
  } = sort;

  isDisabled = name === 'offers' || name === 'event' ;

  return `<div class="trip-sort__item  trip-sort__item--${ name }">
            <input id="sort-${ name }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${ name }" ${ isDisabled ? 'disabled' : '' }>
              <label class="trip-sort__btn" for="sort-${ name }">${ name }</label>
          </div>`;
};

const sortElementTemplate = (sortItems) => {
  const sortTemplate = sortItems.map((sort) => createSortElementTemplate(sort)).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

             ${ sortTemplate }

            </form>`;
};

export default class SortView extends AbstractView {
  #sort = null;

  constructor(sort) {
    super();
    this.#sort = sort;
  }

  get template(){
    return sortElementTemplate(this.#sort);
  }
}
