import {
  render
} from '../render.js';

import CreationView from '../view/form-creating-view.js';
import DestinationView from '../view/destination-view.js';
import EditionView from '../view/form-edition-view.js';
import MainPageView from '../view/main-page-view.js';

export default class MainPagePresenter {
  mainPageComponents = new MainPageView();

  init = (pageContainer) => {
    this.pageContainer = pageContainer;

    render(this.mainPageComponents, this.pageContainer);
    render(new CreationView(), this.mainPageComponents.getElement());

    render(new DestinationView(), this.mainPageComponents.getElement());

    for (let i = 0; i < 2; i++) {
      render(new DestinationView(), this.mainPageComponents.getElement());
    }

    render(new EditionView(), this.mainPageComponents.getElement());
  };
}
