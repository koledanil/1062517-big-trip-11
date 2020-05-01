import AbstractComponent from "../../../src/components/abstract/abstract-component.js";

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


// TCO 2 наследуем от абстрактного класса 
export default class TripTotalCost extends AbstractComponent {
  getTemplate() {
    return createTripCostMarkup();
  }
}
