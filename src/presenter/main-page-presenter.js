import {
  render
} from '../render.js';

import FormCreationView from '../view/form-creation-view.js';
import DestinationView from '../view/destination-view.js';
import FormEditionView from '../view/form-edition-view.js';
import MainPageView from '../view/main-page-view.js';


export default class MainPagePresenter {
  mainPageComponents = new MainPageView();

  init = (pageContainer, pointModel,) => {
    this.pageContainer = pageContainer;
    this.pointModel = pointModel;

    this.boardPoint = [...this.pointModel.getPoints()];

    render(this.mainPageComponents, this.pageContainer);
    render(new FormCreationView(this.boardPoint[0]), this.mainPageComponents.getElement());

    for (let i = 0; i < this.boardPoint.length; i++) {
      render(new DestinationView(this.boardPoint[i]), this.mainPageComponents.getElement());
    }

    render(new FormEditionView(this.boardPoint[0]), this.mainPageComponents.getElement());
  };
}
