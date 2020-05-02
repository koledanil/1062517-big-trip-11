// ==== MA 13 Импортируем вспомогательные функции из утилит
import {render, replace, RenderPosition} from "../../components/utils/render.js";


// ==== MA 14 Импортируем компоненты одной точки маршрута и формы редактирования
import ItemComponent from "../../components/trip-event/item.js";
import EditFormComponent from "../../components/trip-event/form.js";

const renderAllPoints = (container, arr) => {
  for (let i = 0; i < arr.length; i++) {
    render(container, new ItemComponent(arr[i]), RenderPosition.BEFOREEND);
  }
};


let editFormElement = null;
// МА4 Открытие / закрытие формы редактирования точки
// ==== МА41 Закрытие формы
const closeEditForm = (arrPoints) => {
  const formId = editFormElement.getAttribute(`data-id`);
  replace(editFormElement, new ItemComponent(arrPoints[formId]).getElement(), editFormElement);
  editFormElement = null;
};


export default class BoardController {
  constructor(arrPoints, arrOffers, arrDestination) {
    this._arrPoints = arrPoints;
    this._arrOffers = arrOffers;
    this._arrDestination = arrDestination;
  }

  show() {
    // ==== МА42 Закрытие по кнопке
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
    const days = document.querySelector(`.trip-days`);
    renderAllPoints(days, this._arrPoints);

    // ==== МА43 Открытие формы
    const renderEditFormHandler = (evt) => {
      const formContainer = evt.target.className === `event__rollup-btn btn-collapse-form`;
      const eventContainer = evt.target.closest(`.point`);
      // ^^^ сначала я выбирал в качестве цели тэг li trip-events__item. Это привело к тому что после клика
      // происходило появление формы (но она заменялась в li и у li оставлся тот же тэг trip-events__item),
      // что привело к тому что слушаетлль продолжал работать и в открытой форме (в консеоль сыпались ошибки)). поэтому я добавил к каждой
      // точке тэг  point и листенер теперь срабатывает только на тэг point

      const openedForm = document.querySelector(`.event--edit`);
      if (openedForm && eventContainer) {
        window.dateBuffer = `undefined`;
        closeEditForm(this._arrPoints);
      }
      // ^^^ проверяет наличие открытых форм редактирования точки. Если есть открытая форма редактирования, то он ее закроет, а потом только откроет новую

      if (eventContainer) {
        const eventId = eventContainer.getAttribute(`data-id`);
        editFormElement = new EditFormComponent(this._arrPoints[eventId], this._arrOffers, this._arrDestination).getElement();

        replace(eventContainer, editFormElement, eventContainer);
        document.addEventListener(`keydown`, closeEditFormHandler);
      }

      if (formContainer) {
        window.dateBuffer = `undefined`;
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
