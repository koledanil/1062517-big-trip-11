import {createElement} from "../utils.js";

export const tripCost = `
<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
</p>
`;

// TCO 1 формирует разметку со стоимостью
const createTripCostMarkup = (totalSum = 0) => {
  let result = null;
  if (totalSum !== 0) {
    result = `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
  </p>`;
  } else {
    result = `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
</p>`;
  }

  return result;
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
