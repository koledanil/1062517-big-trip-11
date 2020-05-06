/* eslint-disable no-console */
import AbstractComponent from "../../../src/components/abstract/abstract-component.js";

export const SortType = {
  RPICE: `price`,
  TIME: `time`,
  EVENT: `event`,
};

// TSO 1 Создает один тип сортировки
const createSortType = (sortType, isChecked) => {
  return (`<div class="trip-sort__item  trip-sort__item--${sortType}">
  <input id="sort-${sortType}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${isChecked ? `checked` : ``}>
  <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase " data-sort-type="${sortType}" for="sort-${sortType}">
    ${sortType}
  </label>
</div>`);
};
// TSO 1 конец


// TSO 2 Делает список таких типов сортировки на базе массива
const createSortList = (arr, sordSelectedDefault) => {
  return arr.map((it, i) => createSortType(it, i === sordSelectedDefault)).join(`\n`);
};
// TSO 2 конец


// TSO 3 выводит лист сортировок в меню
const createSortListMarkup = (arr, sordSelectedDefault) => {
  const sortList = createSortList(arr, sordSelectedDefault);

  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
<span class="trip-sort__item  trip-sort__item--day">Day</span>
${sortList}
<span class="trip-sort__item  trip-sort__item--offers">Offers</span>
</form>`);
};
// TSO 3 конец


// TSO 4 наследуем от абстрактного класса
export default class SortList extends AbstractComponent {
  constructor(item) {
    super();
    this._item = item;
    this._currentSortType = 1;

  }
  getTemplate() {
    return createSortListMarkup(this._item, this._sortDefault);
  }
}
