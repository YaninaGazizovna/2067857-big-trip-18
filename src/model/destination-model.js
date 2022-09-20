import Observable from '../framework/observable.js';
import { UpdateType } from '../fish/data.js';

export default class DestinationModel extends Observable {
  #destinationApiService = null;

  #destinations = [];

  get destinations (){
    return this.#destinations;
  }

  init = async () => {
    try {
      this.#destinations = await this.#destinationApiService.destinations;
      //console.log(this.#destinations);
    }

    catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };

  constructor(destinationApiService) {
    super();
    this.#destinationApiService = destinationApiService;
  }

  // updateDestination = async(updateType, update) => {
  //   const index = this.destinations.findIndex((destination) => destination.id === update.id);

  //   if (index === -1) {
  //     throw new Error ('Can\'t update unexisting point');
  //   }

  //   try {
  //     const response = await this.#destinationApiService.updatePoint(update);
  //     const updatedPoint = this.#adaptToClient(response);

  //     this.#destinations = [
  //       ...this.#destinations.slice(0, index),
  //       updatedPoint,
  //       ...this.#destinations.slice(index + 1),
  //     ];

  //     this._notify(updateType, updatedPoint);
  //   }

  //   catch(err) {
  //     throw new Error('Can\'t update point');
  //   }

  //   this._notify(updateType, update);
  // };

  // addPoint = (updateType, update) => {
  //   this.#points = [
  //     update,
  //     ...this.#points,
  //   ];

  //   this._notify(updateType, update);
  // };

  // deletePoint = (updateType, update) => {
  //   const index = this.#points.findIndex((point) => point.id === update.id);

  //   if (index === -1) {
  //     throw new Error('Can\'t delete unexisting point');
  //   }

  //   this.#points = [
  //     ...this.#points.slice(0, index),
  //     ...this.#points.slice(index + 1),
  //   ];

  //   this._notify(updateType);
  // };

}
