import { render, RenderPosition,remove } from '../framework/render.js';
import FormCreationView from '../view/form-creation-view.js';
import { UserAction, UpdateType, } from '../fish/data.js';

export default class NewPointPresenter {
  #mainPageComponents = null;
  #formCreationComponent = null;
  #destroyCallback = null;
  #changeData = null;
  #pointModel = null;

  constructor (mainPageComponents, changeData,pointModel){
    this.#mainPageComponents = mainPageComponents;
    this.#changeData = changeData;
    this.#pointModel = pointModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];

    if (this.#formCreationComponent !== null) {
      return;
    }

    this.#formCreationComponent = new FormCreationView(destinations,offers);

    this.#formCreationComponent.setFormSaveHandler(this.#handleFormSaving);
    this.#formCreationComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#formCreationComponent, this.#mainPageComponents, RenderPosition.BEFOREBEGIN);

    document.addEventListener('keydown', this.#onEscapeKeyDown);
  };

  destroy = () => {
    if (this.#formCreationComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#formCreationComponent);
    this.#formCreationComponent = null;

    document.removeEventListener('keydown', this.#onEscapeKeyDown);
  };


  #handleFormSaving = (points) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      points
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #onEscapeKeyDown = (evt) =>{
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

}
