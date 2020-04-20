import {demoItem} from "./mock/item-demo.js";
import {demoItem1} from "./mock/item-demo.js";

// импортируем файлы
import {mainMenu} from "./components/main-menu.js"; // основное меню сайта
import {tripContainer} from "./components/trip-container.js"; // Контейнер для маршрута
import {tripCost} from "./components/trip-cost.js"; // Стоимость путеществия
import {tripDay} from "./components/trip-day.js"; // 1 день путешествия и список точек
import {tripFilters} from "./components/trip-filters.js"; // фильтрация
import {createTripEditForm} from "./components/trip-form.js"; // Форма редактирования точки
import {tripItemInfo} from "./components/trip-info.js"; // Информация о путешествии и маршрут
import {createItemMarkup} from "./components/trip-item.js"; // Точка в маршруте
// import {deleteDate} from "./components/trip-item.js";
import {tripSort} from "./components/trip-sort.js"; // Сортировка путешествия

import {createListDestinationsTemplate} from "./components/form-event-list/destination-list.js";
import {makeListTransferEvent} from "./components/form-event-list/events-list.js";

// функция рендеринга
const render = (container, html, place = `beforeend`) => {
  const createTemplate = () => html;
  container.insertAdjacentHTML(place, createTemplate());
};

// выводит все точки которые находятся в тестовом запросе
const renderAllPoints = (arr, container) => {
  for (let i = 0; i < arr.length; i++) {
    const result = createItemMarkup(arr[i]);
    render(container, result);
  }
};

// находим элементы, к-ые есть сразу у нас
const header = document.querySelector(`.trip-main`);
const navMenu = header.querySelector(`#nav-menu`);
const mainFilters = header.querySelector(`#filters`);
const events = document.querySelector(`.trip-events`);


render(navMenu, mainMenu, `afterend`);
render(mainFilters, tripFilters, `afterend`);

render(header, tripItemInfo(demoItem), `afterbegin`);

// находим элемент, который появляется в процессе добавления
const commonInfo = header.querySelector(`.trip-info`);
render(commonInfo, tripCost);

render(events, tripSort);
render(events, tripContainer);

// находим элемент, который появляется в процессе добавления
const days = events.querySelector(`.trip-days`);
render(days, tripDay);

// находим элемент, который появляется в процессе добавления
const dayList = days.querySelector(`.trip-events__list`);

render(dayList, createTripEditForm(demoItem1.points[8], demoItem1.offers, demoItem1.destination)); // отрисовывает открытым поинт что указан
renderAllPoints(demoItem1.points, days);

let destinationList = document.querySelector(`#destination-list-1`);
render(destinationList, createListDestinationsTemplate(demoItem1.destination));

let eventTypeList = document.querySelector(`.event__type-list`);

render(eventTypeList, makeListTransferEvent(demoItem1.offers));

// deleteDate(demoItem1.points);
