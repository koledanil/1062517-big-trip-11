import AbstractComponent from "../../../src/components/abstract/abstract-component.js";

// TSO 1 Создает один тип сортировки
const createSortType = (sortType, isChecked) => {
  return (`<div class="trip-sort__item  trip-sort__item--${sortType}">
  <input id="sort-${sortType}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${isChecked ? `checked` : ``}>
  <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-${sortType}">
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
  constructor(item, sordSelectedDefault) {
    super();
    this._item = item;
    this._sortDefault = sordSelectedDefault;
  }
  getTemplate() {
    return createSortListMarkup(this._item, this._sortDefault);
  }
}