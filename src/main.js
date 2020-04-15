import {demoItem} from "./mock/item-demo.js";


// импортируем файлы
import {mainMenu} from "./components/main-menu.js"; // основное меню сайта
import {tripContainer} from "./components/trip-container.js"; // Контейнер для маршрута
import {tripCost} from "./components/trip-cost.js"; // Стоимость путеществия
import {tripDay} from "./components/trip-day.js"; // 1 день путешествия и список точек
import {tripFilters} from "./components/trip-filters.js"; // фильтрация
// import {tripEditForm} from "./components/trip-form.js"; // Форма редактирования точки
import {tripInfo} from "./components/trip-info.js"; // Информация о путешествии и маршрут
import {createItemMarkup} from "./components/trip-item.js"; // Точка в маршруте
import {tripSort} from "./components/trip-sort.js"; // Сортировка путешествия

// CONSTANT
// const EVENT_COUNT = 1;

// функция рендеринга
const render = (container, html, place = `beforeend`) => {
  const createTemplate = () => html;
  container.insertAdjacentHTML(place, createTemplate());
};

// const renderListItems = (container, html, place = `beforeend`) => {
//   for (let i = 0; i < EVENT_COUNT; i++) {
//     render(container, html, place);
//   }
// };

// находим элементы, к-ые есть сразу у нас
const header = document.querySelector(`.trip-main`);
const navMenu = header.querySelector(`#nav-menu`);
const mainFilters = header.querySelector(`#filters`);
const events = document.querySelector(`.trip-events`);


render(navMenu, mainMenu, `afterend`);
render(mainFilters, tripFilters, `afterend`);

render(header, tripInfo, `afterbegin`);

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

// render(dayList, tripEditForm);
for (let i = 0; i < demoItem.length; i++) {
  const result = createItemMarkup(demoItem[i]);
  render(dayList, result);
}
