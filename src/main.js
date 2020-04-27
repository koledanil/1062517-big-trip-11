// MA 1 Имопртируем данные
import {demoItem1} from "./mock/item-demo.js";

// MA 2 Имопртируем подписи для интерфейса
import {sortList, menuList, filterList,
  FILTER_SELECTED_BY_DFLT,
  SORT_SELECTED_BY_DFLT,
  MENU_SELECTED_BY_DFLT,
  WELCOME_MSG_EMPTY_SCREEN} from "./const.js";

// MA 3 Импортируем вспомогательные функции из утилит
import {renderDom, RenderPosition} from "./utils.js";

// MA 4 Импортируем компоненты одной точки маршрута, блока данных, формы редактирования
import ItemComponent from "./components/trip-item.js";
import FullInfoComponent from "./components/trip-info.js";
import EditFormComponent from "./components/trip-form.js";

// MA 5 Импортируем компоненты интерфейса сортировка, стоимость, главное меню, фильтры
import SortListComponent from "./components/trip-sort.js";
import TripCostComponent from "./components/trip-cost.js";
import MainMenuComponent from "./components/main-menu.js";
import FilterListComponent from "./components/trip-filters.js";
import EmptyStateComponent from "./components/empty-state.js";


// МА6 Рендерим все точки из ответа сервера
const renderAllPoints = (arr, container) => {
  for (let i = 0; i < arr.length; i++) {
    renderDom(container, new ItemComponent(arr[i]).getElement(), RenderPosition.BEFOREEND);
  }
};

// МА7 Рендерим минмальные интерфейсные штуки
const header = document.querySelector(`.trip-main`);
const events = document.querySelector(`.trip-events`);
const control = document.querySelector(`.trip-main__trip-controls`);
const days = events.querySelector(`.trip-days`);
// const dayList = days.querySelector(`.trip-events__list`);

renderDom(control, new FilterListComponent(filterList, FILTER_SELECTED_BY_DFLT).getElement(), RenderPosition.AFTERBEGIN);
renderDom(control, new MainMenuComponent(menuList, MENU_SELECTED_BY_DFLT).getElement(), RenderPosition.AFTERBEGIN);
renderDom(header, new FullInfoComponent(demoItem1.points).getElement(), RenderPosition.AFTERBEGIN);
const commonInfo = header.querySelector(`.trip-info`);
renderDom(commonInfo, new TripCostComponent().getElement(), RenderPosition.BEFOREEND);

// ==== МА7.1 Если в овтете сервера поинтс не пустые, то мы выводим их, если пустые то выводим заглушку
if (demoItem1.points.length > 0) {
  renderDom(events, new SortListComponent(sortList, SORT_SELECTED_BY_DFLT).getElement(), RenderPosition.AFTERBEGIN);

  renderAllPoints(demoItem1.points, days);
} else {
  const tripEvents = document.querySelector(`.trip-events`);
  renderDom(tripEvents, new EmptyStateComponent(WELCOME_MSG_EMPTY_SCREEN).getElement(), RenderPosition.BEFOREEND);
}

const renderEditFormHandler = (evt) => {
  const formContainer = evt.target.className === `event__rollup-btn btn-collapse-form`;
  const eventContainer = evt.target.closest(`.point`);
  // ^^^ сначала я выбирал в качестве цели тэг li trip-events__item. Это привело к тому что после клика
  // происходило появление формы (но она заменялась в li и у li оставлся тот же тэг trip-events__item),
  // что привело к тому что слушаетлль продолжал работать и в открытой форме (в консеоль сыпались ошибки)). поэтому я добавил к каждой
  // точке тэг  point и листенер теперь срабатывает только на тэг point

  if (eventContainer) {
    const eventId = eventContainer.getAttribute(`data-id`);
    const editFromElement = new EditFormComponent(demoItem1.points[eventId], demoItem1.offers, demoItem1.destination).getElement();
    eventContainer.parentNode.replaceChild(editFromElement, eventContainer);
  }

  if (formContainer) {
    window.dateBuffer = `undefined`;
    // ^^^ Параметр используется в trip-item.js TIT 5. Без присвоения ему андефайн после 2-го открытия-закрытия формы редактирования пропадает дата слева
    // у первой точки. Изначально он используется для хранения даты предыдущей точки, чтобы сравнивать эту дату с датой новой точки и решать
    // надо слева выводить дату или не надо. Если дата новой точки и дата в буфере равны, то выводится дата только у первой точки, остальные точки с этой же датой
    // получают дату слева.
    const openedEditForm = document.querySelector(`.event--edit`);
    const formId = openedEditForm.getAttribute(`data-id`);
    openedEditForm.parentNode.replaceChild(new ItemComponent(demoItem1.points[formId]).getElement(), openedEditForm);
  }

};

window.addEventListener(`click`, renderEditFormHandler);
