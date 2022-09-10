import { render, RenderPosition,remove } from '../framework/render.js';
import FormCreationView from '../view/form-creation-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType, } from '../fish/data.js';

export default class NewPointPresenter {
  #mainPageComponents = null;
  #formCreationComponent = null;
  #destroyCallback = null;
  #changeData = null;

  constructor (mainPageComponents, changeData){
    this.#mainPageComponents = mainPageComponents;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#formCreationComponent !== null) {
      return;
    }

    this.#formCreationComponent = new FormCreationView();

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

      { id: nanoid(), ...points },
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
