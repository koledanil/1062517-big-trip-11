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
const createFilterList = (arr, FILTER_SELECTED_BY_DFLT) => {

  return arr.map((it, i) => createFilterItem(it, i === FILTER_SELECTED_BY_DFLT)).join(`\n`);
};
// TFI 2 конец


// TFI 3 выводит лист фильтров
const createFilterListMarkup = (arr, FILTER_SELECTED_BY_DFLT) => {
  const filterList = createFilterList(arr, FILTER_SELECTED_BY_DFLT);

  return (`<form class="trip-filters" action="#" method="get">
     ${filterList}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
};
// TSO 3 конец


// TSO 4  Делаем класс
export default class FilterList {
  constructor(item, FILTER_SELECTED_BY_DFLT) {
    this._item = item;
    this._element = null;
    this._filterDflt = FILTER_SELECTED_BY_DFLT;
  }

  getTemplate() {
    return createFilterListMarkup(this._item, this._filterDflt);
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
