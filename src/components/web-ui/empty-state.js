import AbstractComponent from "../../../src/components/abstract/abstract-component.js";

// EST 1 Создаем шаблон для emptu state
const createEmptyStateMarkup = (welcomeMsg) => {
  getComputedStyle(document.documentElement).getPropertyValue(`--line-color-visible`);
  document.documentElement.style.setProperty(`--line-color-visible`, `rgba(255, 255, 255, 0`);

  return (`<p class="trip-events__msg">${welcomeMsg}</p>`);
};
// конец EST 1

// EST 2 наследуем от абстрактного класса
export default class EmptyState extends AbstractComponent {
  constructor(item, welcomeMsgSelectedDefault) {
    super();
    this._msgDefault = welcomeMsgSelectedDefault;
    this._item = item;
  }
  getTemplate() {
    return createEmptyStateMarkup(this._item, this._msgDefault);
  }
}
