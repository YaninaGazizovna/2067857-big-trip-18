import {
  render
} from '../render.js';

import FormCreationView from '../view/form-creation-view.js';
import DestinationView from '../view/destination-view.js';
import FormEditionView from '../view/form-edition-view.js';
import MainPageView from '../view/main-page-view.js';


export default class MainPagePresenter {
  #mainPageComponents = new MainPageView();
  #pointModel = null;
  #pageContainer = null;
  #boardPoint = [];

  init = (pageContainer, pointModel,) => {
    this.#pageContainer = pageContainer;
    this.#pointModel = pointModel;

    this.#boardPoint = [...this.#pointModel.points];

    render(this.#mainPageComponents, this.#pageContainer);
    render(new FormCreationView(this.#boardPoint[0]), this.#mainPageComponents.element);

    for (let i = 0; i < this.#boardPoint.length; i++) {
      render(new DestinationView(this.#boardPoint[i]), this.#mainPageComponents.element);
    }

    render(new FormEditionView(this.#boardPoint[0]), this.#mainPageComponents.element);
  };
}
