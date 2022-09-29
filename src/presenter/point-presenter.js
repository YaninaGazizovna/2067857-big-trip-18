import { render, replace, remove } from '../framework/render.js';
import FormEditionView from '../view/form-edition-view.js';
import DestinationView from '../view/destination-view.js';
import { UserAction, UpdateType, Mode,isEscapeKey } from '../data.js';
import { isDatesEqual } from '../util.js';

export default class PointPresenter {
  #point = null;
  #pointModel = null;
  #formEditionComponent = null;
  #destinationComponent = null;
  #mainPageComponents = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  constructor (mainPageComponents, changeData, changeMode,pointModel){
    this.#mainPageComponents = mainPageComponents;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#pointModel = pointModel;
  }

  init = (point) => {
    this.#point = point;
    const destinations = [...this.#pointModel.destinations];
    const offers = [...this.#pointModel.offers];

    const prevDestinationComponent = this.#destinationComponent;
    const prevFormEditionComponent = this.#formEditionComponent;

    this.#destinationComponent = new DestinationView(point);
    this.#formEditionComponent = new FormEditionView(point,offers, destinations);

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
      replace(this.#destinationComponent, prevFormEditionComponent);
      this.#mode = Mode.DEFAULT;
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

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#formEditionComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#formEditionComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#destinationComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#formEditionComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formEditionComponent.shake(resetFormState);
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
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #onEscapeKeyDown = (evt) =>{
    if(isEscapeKey(evt)) {
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

