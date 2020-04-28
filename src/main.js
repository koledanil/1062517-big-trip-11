// MA 11 Имопртируем данные
// ==== MA 12 Имопртируем подписи для интерфейса и данные сервера
import {interfaceSettings} from "./const.js";
import {demoItem1} from "./mock/item-demo.js";

// ==== MA 13 Импортируем вспомогательные функции из утилит
import {renderDom, RenderPosition} from "./utils.js";

// ==== MA 14 Импортируем компоненты одной точки маршрута, блока данных, формы редактирования
import ItemComponent from "./components/trip-item.js";
import FullInfoComponent from "./components/trip-info.js";
import EditFormComponent from "./components/trip-form.js";

// ==== MA 15 Импортируем компоненты интерфейса сортировка, стоимость, главное меню, фильтры
import SortListComponent from "./components/trip-sort.js";
import TripCostComponent from "./components/trip-cost.js";
import MainMenuComponent from "./components/main-menu.js";
import FilterListComponent from "./components/trip-filters.js";
import EmptyStateComponent from "./components/empty-state.js";


// МА2 Функция вывода всех точек
const renderAllPoints = (arr, container) => {
  for (let i = 0; i < arr.length; i++) {
    renderDom(container, new ItemComponent(arr[i]).getElement(), RenderPosition.BEFOREEND);
  }
};


// МА3 Рендерим интерфейс
// ==== МА31 Рендерим минмальные интерфейсные штуки
const header = document.querySelector(`.trip-main`);
const events = document.querySelector(`.trip-events`);
const control = document.querySelector(`.trip-main__trip-controls`);
const days = events.querySelector(`.trip-days`);

renderDom(control, new FilterListComponent(interfaceSettings.filterlist, interfaceSettings.defaultParametrs.FILTER_SELECTED_BY_DEFAULT).getElement(), RenderPosition.AFTERBEGIN);
renderDom(control, new MainMenuComponent(interfaceSettings.menulist, interfaceSettings.defaultParametrs.MENU_SELECTED_BY_DEFAULT).getElement(), RenderPosition.AFTERBEGIN);
renderDom(header, new FullInfoComponent(demoItem1.points).getElement(), RenderPosition.AFTERBEGIN);
const commonInfo = header.querySelector(`.trip-info`);
renderDom(commonInfo, new TripCostComponent().getElement(), RenderPosition.BEFOREEND);

// ==== МА31 Если в овтете сервера поинтс не пустые, то мы выводим их, если пустые то выводим заглушку
if (demoItem1.points.length > 0) {
  renderDom(events, new SortListComponent(interfaceSettings.sortlist, interfaceSettings.defaultParametrs.SORT_SELECTED_BY_DEFAULT).getElement(), RenderPosition.AFTERBEGIN);

  renderAllPoints(demoItem1.points, days);
} else {
  const tripEvents = document.querySelector(`.trip-events`);
  renderDom(tripEvents, new EmptyStateComponent(interfaceSettings.defaultParametrs.WELCOME_MSG_EMPTY_SCREEN).getElement(), RenderPosition.BEFOREEND);
}


// МА4 Открытие / закрытие формы редактирования точки
// ==== МА42 Закрытие формы
const closeEditForm = () => {
  const formId = editFormElement.getAttribute(`data-id`);
  editFormElement.parentNode.replaceChild(new ItemComponent(demoItem1.points[formId]).getElement(), editFormElement);
  editFormElement = null;
  document.removeEventListener(`keydown`, closeEditFormHandler);
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
  if (openedForm) {
    window.dateBuffer = `undefined`;
    closeEditForm();
  }
// ^^^ проверяет наличие открытых форм редактирования точки. Если есть открытая форма редактирования, то он ее закроет, а потом только откроет новую


  if (eventContainer) {
    const eventId = eventContainer.getAttribute(`data-id`);
    editFormElement = new EditFormComponent(demoItem1.points[eventId], demoItem1.offers, demoItem1.destination).getElement();
    eventContainer.parentNode.replaceChild(editFormElement, eventContainer);
    document.addEventListener(`keydown`, closeEditFormHandler);
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
document.addEventListener(`click`, renderEditFormHandler);


