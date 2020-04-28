import {createElement} from "../utils.js";

// MME 1 Создает один пункт меню
const cteateOneMenuItem = (menuItem, isChecked) => {
  return (` <a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${menuItem}</a>`);
};
// MME 1 конец trip-tabs__btn--active


// MME 2 Делает список пунктов меню
const createMenuList = (arr, MENU_SELECTED_BY_DFLT) => {
  return arr.map((it, i) => cteateOneMenuItem(it, i === MENU_SELECTED_BY_DFLT)).join(`\n`);
};
// MME 2 конец


// MME 3 выводит список меню
const createMainMenuMarkup = (arr, MENU_SELECTED_BY_DFLT) => {
  const menuList = createMenuList(arr, MENU_SELECTED_BY_DFLT);

  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menuList}
  </nav>`);
};
// MME 3 конец


// MME 4 класс
export default class MainMenu {
  constructor(item, MENU_SELECTED_BY_DFLT) {
    this._item = item;
    this._element = null;
    this._menuDflt = MENU_SELECTED_BY_DFLT;
  }

  getTemplate() {
    return createMainMenuMarkup(this._item, this._menuDflt);
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
