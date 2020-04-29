import {createElement} from "../utils.js";

// TFI 1 Создает один пунтк фильтра
const createFilterItem = (filterItem, isChecked) => {
  return (` <div class="trip-filters__filter">
  <input id="filter-${filterItem}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterItem}" ${isChecked ? `checked` : ``}>
  <label class="trip-filters__filter-label" for="filter-${filterItem}">${filterItem}</label>
</div>`);
};
// TFI 1 Конец


// TFI 2 Делает список фильтров на базе массива
const createFilterList = (arr, filterSelectedDefault) => {
  return arr.map((it, i) => createFilterItem(it, i === filterSelectedDefault)).join(`\n`);
};
// TFI 2 конец


// TFI 3 выводит лист фильтров
const createFilterListMarkup = (arr, filterSelectedDefault) => {
  const filterList = createFilterList(arr, filterSelectedDefault);

  return (`<form class="trip-filters" action="#" method="get">
     ${filterList}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
};
// TSO 3 конец


// TSO 4  Делаем класс
export default class FilterList {
  constructor(item, filterSelectedDefault) {
    this._item = item;
    this._element = null;
    this._filterDefault = filterSelectedDefault;
  }

  getTemplate() {
    return createFilterListMarkup(this._item, this._filterDefault);
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
