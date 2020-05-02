import AbstractComponent from "../abstract/abstract-component.js";

// BRD 1 Создаем шаблон разметки
const createBoardMarkup = () => {
  return (`<main class="page-body__page-main  page-main">
<div class="page-body__container">
    <section class="trip-events">
      <ul class="trip-days">
        <h2 class="visually-hidden">Trip events</h2>
          <div class="day__info">
        
          </div>
          <ul class="trip-events__list"></ul>
        
      </ul>
   

      <!-- Сортировка -->

      <!-- Контент -->
    </section>
</div>
</main>`);
};

// BRD 2 Наследуем класс
export default class BoardComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createBoardMarkup();
  }

  addBoardClickEventListener(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  addBoardKeyEventListener(handler) {
    document.addEventListener(`keydown`, handler);
  }

  removeBoardKeyEventListener(handler) {
    document.addEventListener(`keydown`, handler);
  }
}

