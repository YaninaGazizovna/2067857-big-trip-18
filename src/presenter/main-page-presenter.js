import {
  render
} from '../render.js';
import FormEditionView from '../view/form-edition-view.js';
import MainPageView from '../view/main-page-view.js';
import DestinationView from '../view/destination-view.js';
import MessageView from '../message-view.js';

export default class MainPagePresenter {

  #mainPageComponents = new MainPageView();
  #messageComponent = new MessageView();
  #pointModel = null;
  #pageContainer = null;
  #boardPoint = [];

  constructor (pageContainer, pointModel){
    this.#pageContainer = pageContainer;
    this.#pointModel = pointModel;

  }

  init = () => {
    this.#boardPoint = [...this.#pointModel.points];
    this.#renderPage();

  };

  #renderPage = () => {
    render(this.#mainPageComponents, this.#pageContainer);

    for (let i = 0; i < this.#boardPoint.length; i++) {
      this.#renderPoint(this.#boardPoint[i]);
    }

    if (this.#boardPoint.length === 0){
      render( this.#messageComponent, this.#mainPageComponents.element);
    }
  };

  #renderPoint = (point) => {
    const destinationComponent = new DestinationView(point);
    const formEditionComponent = new FormEditionView(point);

    const replaceDestinationToEdition = () => {
      this.#mainPageComponents.element.replaceChild(formEditionComponent.element, destinationComponent.element);
    };

    const replaceEditionToDestination = () => {
      this.#mainPageComponents.element.replaceChild(destinationComponent.element, formEditionComponent.element);
    };

    const onEscapeKeyDown = (evt) =>{
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditionToDestination();
        document.removeEventListener('keydown', onEscapeKeyDown);
      }
    };

    destinationComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceDestinationToEdition();
      document.addEventListener('keydown', onEscapeKeyDown);
    });

    formEditionComponent.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditionToDestination();
      document.removeEventListener('keydown', onEscapeKeyDown);
    });

    formEditionComponent.element.querySelector('.event__rollup-btn').addEventListener('click',()=>{
      replaceEditionToDestination();
    });

    render(destinationComponent, this.#mainPageComponents.element);
  };
}
