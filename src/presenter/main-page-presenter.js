import { render } from '../framework/render.js';
import MainPageView from '../view/main-page-view.js';
import MessageView from '../view/message-view.js';
import PointPresenter from './point-presenter.js';

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
    const pointPresenter = new PointPresenter(this.#mainPageComponents.element);
    pointPresenter.init(point);
  };
}
