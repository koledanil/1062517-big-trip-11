// BRD 1 Имопрт
// ==== BRD 11 Импортируем вспомогательные функции из утилит
import {render, replace, RenderPosition} from "../../components/utils/render.js";

// ==== BRD 12 Импортируем компоненты одной точки маршрута и формы редактирования
import ItemComponent from "../../components/trip-event/item.js";
import EditFormComponent from "../../components/trip-event/form.js";

// BRD 2 Функция рендера всех точек из прихода
const renderAllPoints = (container, arr) => {
  container.innerHTML = ``;
  window.dateBuffer = null;
  for (let i = 0; i < arr.length; i++) {
    render(container, new ItemComponent(arr[i]), RenderPosition.BEFOREEND);
  }
};


// BRD 3 Функция закрыти формы редактирования
let editFormElement = null;
const closeEditForm = (arrPoints) => {
  const formId = editFormElement.getAttribute(`data-id`);
  replace(editFormElement, new ItemComponent(arrPoints[formId]).getElement(), editFormElement);
  editFormElement = null;
};


// BRD 4 Экспорт контролера
export class TripController {
  constructor(arrPoints, arrOffers, arrDestination) {
    this._arrPoints = arrPoints;
    this._arrOffers = arrOffers;
    this._arrDestination = arrDestination;
  }

  showPoints(arr = this._arrPoints) {
    const days = document.querySelector(`.trip-days`);
    renderAllPoints(days, arr);
  }

  show() {
    // BRD 41 Реакция на нажатие ЕСК
    const closeEditFormHandler = (evt) => {
      const allFields = document.querySelectorAll(`.event__input`);

      if (evt.key === `Escape` && evt.target.type !== `text`) {

        closeEditForm(this._arrPoints);
        document.removeEventListener(`keydown`, closeEditFormHandler);
      }

      if (evt.key === `Escape` && evt.target.type === `text`) {
        allFields.forEach((item) => {
          item.blur();
        });
      }
    };

    // BRD 42 Открывает форму по клику и закрывает другие
    const renderEditFormHandler = (evt) => {
      const formContainer = evt.target.className === `event__rollup-btn btn-collapse-form`;
      const eventContainer = evt.target.closest(`.point`);
      // ^^^ сначала я выбирал в качестве цели тэг li trip-events__item. Это привело к тому что после клика
      // происходило появление формы (но она заменялась в li и у li оставлся тот же тэг trip-events__item),
      // что привело к тому что слушаетлль продолжал работать и в открытой форме (в консеоль сыпались ошибки)). поэтому я добавил к каждой
      // точке тэг  point и листенер теперь срабатывает только на тэг point

      const openedForm = document.querySelector(`.event--edit`);
      if (openedForm && eventContainer) {
        window.dateBuffer = null;
        closeEditForm(this._arrPoints);
      }
      // ^^^ проверяет наличие открытых форм редактирования точки. Если есть открытая форма редактирования, то он ее закроет, а потом только откроет новую

      if (eventContainer) {
        const eventId = eventContainer.getAttribute(`data-id`);
        editFormElement = new EditFormComponent(this._arrPoints[eventId], this._arrOffers, this._arrDestination);
        replace(eventContainer, editFormElement.getElement(), eventContainer);
        editFormElement.favoriteEventListener();

        document.addEventListener(`keydown`, closeEditFormHandler);
      }

      if (formContainer) {
        window.dateBuffer = null;
        // ^^^ Параметр используется в trip-item.js TIT 5. Без присвоения ему андефайн после 2-го открытия-закрытия формы редактирования пропадает дата слева
        // у первой точки. Изначально он используется для хранения даты предыдущей точки, чтобы сравнивать эту дату с датой новой точки и решать
        // надо слева выводить дату или не надо. Если дата новой точки и дата в буфере равны, то выводится дата только у первой точки, остальные точки с этой же датой
        // получают дату слева.
        closeEditForm(this._arrPoints);
        document.removeEventListener(`keydown`, closeEditFormHandler);
      }
    };
    document.addEventListener(`click`, renderEditFormHandler);
  }
}


// const ys = new ItemContoller()
