import AbstractComponent from "../../../src/components/abstract/abstract-component.js";

// MME 1 Создает один пункт меню
const cteateOneMenuItem = (menuItem, isChecked) => {
  return (` <a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${menuItem}</a>`);
};
// MME 1 конец trip-tabs__btn--active


// MME 2 Делает список пунктов меню
const createMenuList = (arr, menuSelectedDefault) => {
  return arr.map((it, i) => cteateOneMenuItem(it, i === menuSelectedDefault)).join(`\n`);
};
// MME 2 конец


// MME 3 выводит список меню
const createMainMenuMarkup = (arr, menuSelectedDefault) => {
  const menuList = createMenuList(arr, menuSelectedDefault);

  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menuList}
  </nav>`);
};
// MME 3 конец

// MME 4 наследуем от абстрактного класса
export default class MainMenu extends AbstractComponent {
  constructor(item, menuSelectedDefault) {
    super();
    this._item = item;
    this._menuDefault = menuSelectedDefault;
  }
  getTemplate() {
    return createMainMenuMarkup(this._item, this._menuDefault);
  }
}
