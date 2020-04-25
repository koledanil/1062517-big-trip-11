import {createElement} from "../utils.js";

// TSO 1 Создает один тип сортировки
const createSortType = (sortType) => {
  return (`<div class="trip-sort__item  trip-sort__item--${sortType}">
  <input id="sort-${sortType}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" checked>
  <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-${sortType}">
    ${sortType}
  </label>
</div>`);
};
// TSO 1 конец


// TSO 2 Делает список таких типов сортировки на базе массива
const createSortList = (arr) => {
  return arr.map((it) => createSortType(it)).join(`\n`);
};
// TSO 2 конец


// TSO 3 выводит лист сортировок в меню
const createSortListMarkup = (arr) => {
  const sortList = createSortList(arr);

  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
<span class="trip-sort__item  trip-sort__item--day">Day</span>
${sortList}
<span class="trip-sort__item  trip-sort__item--offers">Offers</span>
</form>`);
};
// TSO 3 конец


// TSO 4 Делаем класс
export default class SortList {
  constructor(item) {
    this._item = item;
    this._element = null;
  }

  getTemplate() {
    return createSortListMarkup(this._item);
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
