// MA 11 Имопртируем данные
// ==== MA 12 Имопртируем подписи для интерфейса и данные сервера
import {interfaceSettings} from "./const.js";
import {demoItem1} from "./mock/item-demo.js";

// ==== MA 13 Импортируем вспомогательные функции из утилит
import {replace} from "../src/components/utils/render.js";

// ==== MA 14 Импортируем компоненты одной точки маршрута и формы редактирования
import ItemComponent from "./components/trip-event/item.js";
import EditFormComponent from "./components/trip-event/form.js";


// ==== MA 16 Импортируем контроллер
import BoardController from "./components/controllers/board.js";
import UIController from "./components/controllers/interface.js";

new UIController(interfaceSettings.filterlist, // имена фильтров
    interfaceSettings.defaultParametrs.FILTER_SELECTED_BY_DEFAULT, // имена фильтров выбранные по умолчанию
    interfaceSettings.menulist, // названия пунктов меню
    interfaceSettings.defaultParametrs.MENU_SELECTED_BY_DEFAULT, // пункт меню по умолчанию
    interfaceSettings.sortlist, // названия сортировок
    interfaceSettings.defaultParametrs.SORT_SELECTED_BY_DEFAULT, // сортировка по умолчанию
    demoItem1.points, // кусок данных с сервера, который отвечает за точки пользователя
    interfaceSettings.defaultParametrs.WELCOME_MSG_EMPTY_SCREEN).show(); // сообщение по умолчанию если точек нет


// МА4 Открытие / закрытие формы редактирования точки
// ==== МА42 Закрытие формы
const closeEditForm = () => {
  const formId = editFormElement.getAttribute(`data-id`);
  replace(editFormElement, new ItemComponent(demoItem1.points[formId]).getElement(), editFormElement);
  editFormElement = null;
  // board.removeBoardKeyEventListener(closeEditFormHandler);
};

// ==== МА43 Открытие формы
let editFormElement = null;
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
    closeEditForm();
  }
  // ^^^ проверяет наличие открытых форм редактирования точки. Если есть открытая форма редактирования, то он ее закроет, а потом только откроет новую

  if (eventContainer) {
    const eventId = eventContainer.getAttribute(`data-id`);
    editFormElement = new EditFormComponent(demoItem1.points[eventId], demoItem1.offers, demoItem1.destination).getElement();
    replace(eventContainer, editFormElement, eventContainer);
    board.addBoardKeyEventListener(closeEditFormHandler);
    // ^^^ этот обработчик вешается внутри компонента board но на документ
  }

  if (formContainer) {
    window.dateBuffer = `undefined`;
    // ^^^ Параметр используется в trip-item.js TIT 5. Без присвоения ему андефайн после 2-го открытия-закрытия формы редактирования пропадает дата слева
    // у первой точки. Изначально он используется для хранения даты предыдущей точки, чтобы сравнивать эту дату с датой новой точки и решать
    // надо слева выводить дату или не надо. Если дата новой точки и дата в буфере равны, то выводится дата только у первой точки, остальные точки с этой же датой
    // получают дату слева.
    closeEditForm();
  }
};

// ==== MA44 Определение клавиши
const closeEditFormHandler = (evt) => {
  const allFields = document.querySelectorAll(`.event__input`);

  if (evt.key === `Escape` && evt.target.type !== `text`) {
    closeEditForm();
  }

  if (evt.key === `Escape` && evt.target.type === `text`) {
    allFields.forEach((item) => {
      item.blur();
    });
  }
};

// ==== MA45 Запускаем слушателей
// board.addBoardClickEventListener(renderEditFormHandler);
