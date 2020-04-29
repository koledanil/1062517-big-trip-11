import {createElement} from "../utils.js";

// EST 1 Создаем шаблон для emptu state
const createEmptyStateMarkup = (welcomeMsg) => {
  getComputedStyle(document.documentElement).getPropertyValue(`--line-color-visible`);
  document.documentElement.style.setProperty(`--line-color-visible`, `rgba(255, 255, 255, 0`);

  return (`<p class="trip-events__msg">${welcomeMsg}</p>`);
};
// конец EST 1


// EST 2  Делаем класс
export default class EmptyState {
  constructor(item, welcomeMsgSelectedDefault) {
    this._item = item;
    this._element = null;
    this._msgDefault = welcomeMsgSelectedDefault;
  }

  getTemplate() {
    return createEmptyStateMarkup(this._item, this._msgDefault);
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
