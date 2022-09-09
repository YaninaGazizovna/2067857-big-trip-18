import { render, RenderPosition,remove } from '../framework/render.js';
import FormCreationView from '../view/form-creation-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType, } from '../fish/data.js';

export default class NewPointPresenter {
  #mainPageComponents = null;
  #formEditionComponent = null;
  #destroyCallback = null;
  #changeData = null;

  constructor (mainPageComponents, changeData){
    this.#mainPageComponents = mainPageComponents;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#formEditionComponent !== null) {
      return;
    }

    this.#formEditionComponent = new FormCreationView();

    this.#formEditionComponent.setFormSaveHandler(this.#handleFormSaving);
    this.#formEditionComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#formEditionComponent, this.#mainPageComponents, RenderPosition.BEFOREBEGIN);

    document.addEventListener('keydown', this.#onEscapeKeyDown);
  };

  destroy = () => {
    if (this.#formEditionComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#formEditionComponent);
    this.#formEditionComponent = null;

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
