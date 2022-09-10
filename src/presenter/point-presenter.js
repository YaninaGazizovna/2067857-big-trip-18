import { render, replace, remove } from '../framework/render.js';
import FormEditionView from '../view/form-edition-view.js';
import DestinationView from '../view/destination-view.js';
import {UserAction, UpdateType} from '../fish/data.js';
import { isDatesEqual } from '../util.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #point = null;

  #formEditionComponent = null;
  #destinationComponent = null;
  #mainPageComponents = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;


  constructor (mainPageComponents, changeData, changeMode){
    this.#mainPageComponents = mainPageComponents;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

  }

  init = (point) => {
    this.#point = point;

    const prevDestinationComponent = this.#destinationComponent;
    const prevFormEditionComponent = this.#formEditionComponent;

    this.#destinationComponent = new DestinationView(point);
    this.#formEditionComponent = new FormEditionView(point);

    this.#destinationComponent.setDestinationEditHandler(this.#handleEditClick);
    this.#formEditionComponent.setFormSaveHandler(this.#handleFormSaving);
    this.#formEditionComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#formEditionComponent.setRollupEditHandler(this.#handleRollupClick);
    this.#destinationComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if(prevDestinationComponent === null || prevFormEditionComponent === null) {
      render(this.#destinationComponent, this.#mainPageComponents);
      return;
    }

    if (this.#mode === Mode.DEFAULT){
      replace(this.#destinationComponent, prevDestinationComponent);
    }

    if(this.#mode === Mode.EDITING){
      replace(this.#formEditionComponent, prevFormEditionComponent);
    }

    remove(prevDestinationComponent);
    remove(prevFormEditionComponent);
  };

  destroy = () => {
    remove(this.#destinationComponent);
    remove(this.#formEditionComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#formEditionComponent.reset(this.#point);
      this.#replaceEditionToDestination();
    }
  };

  #handleEditClick = () => {
    this.#replaceDestinationToEdition();
  };

  #handleFormSaving = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
    !isDatesEqual(this.#point.dateTo, update.dateTo);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceEditionToDestination();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleRollupClick = () => {
    this.#formEditionComponent.reset(this.#point);
    this.#replaceEditionToDestination();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #onEscapeKeyDown = (evt) =>{
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#formEditionComponent.reset(this.#point);
      this.#replaceEditionToDestination();
    }
  };

  #replaceDestinationToEdition = () => {
    replace(this.#formEditionComponent, this.#destinationComponent);
    document.addEventListener('keydown', this.#onEscapeKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditionToDestination = () => {
    replace(this.#destinationComponent, this.#formEditionComponent);
    document.removeEventListener('keydown', this.#onEscapeKeyDown);
    this.#mode = Mode.DEFAULT;
  };

}
