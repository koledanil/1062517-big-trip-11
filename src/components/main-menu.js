import {createElement} from "../utils.js";

// MME 1 Создает один пункт меню
const cteateOneMenuItem = (menuItem) => {
  return (` <a class="trip-tabs__btn trip-tabs__btn--active" href="#">${menuItem}</a>`);
};
// MME 1 конец


// MME 2 Делает список пунктов меню
const createMenuList = (arr) => {
  return arr.map((it) => cteateOneMenuItem(it)).join(`\n`);
};
// MME 2 конец


// MME 3 выводит список меню
const createMainMenuMarkup = (arr) => {
  const menuList = createMenuList(arr);

  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menuList}
  </nav>`);
};
// MME 3 конец


// MME 4 класс
export default class MainMenu {
  constructor(item) {
    this._item = item;
    this._element = null;
  }

  getTemplate() {
    return createMainMenuMarkup(this._item);
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
