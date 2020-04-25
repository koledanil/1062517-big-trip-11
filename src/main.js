// MA 1 Имопртируем данные
import {demoItem1} from "./mock/item-demo.js";

// MA 2 Имопртируем подписи для интерфейса
import {sortList, menuList, filterList, FILTER_SELECTED_BY_DFLT} from "./const.js";

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


// МА6 Рендерим все точки из ответа сервера
const renderAllPoints = (arr, container) => {
  for (let i = 0; i < arr.length; i++) {
    renderDom(container, new ItemComponent(arr[i]).getElement(), RenderPosition.BEFOREEND);
  }
};


// МА7 Рендерим компоненты
const header = document.querySelector(`.trip-main`);
const events = document.querySelector(`.trip-events`);
const control = document.querySelector(`.trip-main__trip-controls`);
const days = events.querySelector(`.trip-days`);
const dayList = days.querySelector(`.trip-events__list`);

renderDom(control, new FilterListComponent(filterList, FILTER_SELECTED_BY_DFLT).getElement(), RenderPosition.AFTERBEGIN);
renderDom(control, new MainMenuComponent(menuList).getElement(), RenderPosition.AFTERBEGIN);
renderDom(header, new FullInfoComponent(demoItem1.points).getElement(), RenderPosition.AFTERBEGIN);

// находим элемент, который появляется в процессе добавления
const commonInfo = header.querySelector(`.trip-info`);
renderDom(commonInfo, new TripCostComponent().getElement(), RenderPosition.BEFOREEND);
renderDom(events, new SortListComponent(sortList).getElement(), RenderPosition.AFTERBEGIN);

// render(dayList, createTripEditForm(demoItem1.points[2], demoItem1.offers, demoItem1.destination)); // отрисовывает открытым поинт что указан
renderDom(dayList, new EditFormComponent(demoItem1.points[2], demoItem1.offers, demoItem1.destination).getElement(), RenderPosition.BEFOREEND);
renderAllPoints(demoItem1.points, days);
