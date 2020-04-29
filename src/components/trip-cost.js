import {createElement} from "../utils.js";

export const tripCost = `
<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
</p>
`;

// TCO 1 формирует разметку со стоимостью
const createTripCostMarkup = (totalSum = 0) => {

  return (`<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum === 0 ? 0 : totalSum}</span>
  </p>`);

};
// TCO 1 конец

// TCO 2 Делаем класс
export default class TripTotalCost {
  constructor(item) {
    this._item = item;
    this._element = null;
  }

  getTemplate() {
    return createTripCostMarkup(this._item);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
// TCO 2 конец
