import { render, replace } from '../framework/render.js';
import FormEditionView from '../view/form-edition-view.js';
import DestinationView from '../view/destination-view.js';

export default class PointPresenter {
  #point = null;

  #formEditionComponent = null;
  #destinationComponent = null;
  #mainPageComponents = null;

  constructor (mainPageComponents){
    this.#mainPageComponents = mainPageComponents;
  }

  init = (point) => {
    this.#point = point;

    this.#destinationComponent = new DestinationView(point);
    this.#formEditionComponent = new FormEditionView(point);

    this.#destinationComponent.setDestinationEditHandler(this.#replaceDestinationToEdition);
    this.#formEditionComponent.setFormSaveHandler(this.#replaceEditionToDestination);
    this.#formEditionComponent.setRollupEditHandler(this.#replaceEditionToDestination);

    render(this.#destinationComponent, this.#mainPageComponents);
  };

  #replaceDestinationToEdition = () => {
    this.#setDestinationEditHandler();
  };

  #replaceEditionToDestination = () => {
    this.#setFormSaveHandler();
  };

  #onEscapeKeyDown = (evt) =>{
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditionToDestination();
      document.removeEventListener('keydown', this.#onEscapeKeyDown);
    }
  };

  #setDestinationEditHandler = () => {
    replace(this.#formEditionComponent, this.#destinationComponent);
    document.addEventListener('keydown', this.#onEscapeKeyDown);
  };

  #setFormSaveHandler = () => {
    replace(this.#destinationComponent, this.#formEditionComponent);
    document.removeEventListener('keydown', this.#onEscapeKeyDown);
  };

}
