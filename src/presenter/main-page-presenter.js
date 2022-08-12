import {
  render
} from '../render.js';

import FormCreationView from '../view/form-creation-view.js';
import DestinationView from '../view/destination-view.js';
import FormEditionView from '../view/form-edition-view.js';
import MainPageView from '../view/main-page-view.js';

const DESTINATION_VIEW_COUNT = 2;

export default class MainPagePresenter {
  mainPageComponents = new MainPageView();

  init = (pageContainer) => {
    this.pageContainer = pageContainer;

    render(this.mainPageComponents, this.pageContainer);
    render(new FormCreationView(), this.mainPageComponents.getElement());

    render(new DestinationView(), this.mainPageComponents.getElement());

    for (let i = 0; i < DESTINATION_VIEW_COUNT; i++) {
      render(new DestinationView(), this.mainPageComponents.getElement());
    }

    render(new FormEditionView(), this.mainPageComponents.getElement());
  };
}
