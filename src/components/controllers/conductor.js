// INT 1 Имопрты
// ==== INT 11 Импортируем вспомогательные функции из утилит
import {render, RenderPosition} from "../utils/render.js";

// ==== INT 12 Импортируем компоненты интерфейса сортировка, стоимость, главное меню, фильтры
import BoardComponent from "../web-ui/board.js";
import SortListComponent from "../web-ui/sort.js";
import FullInfoComponent from "../web-ui/info.js";
import TripCostComponent from "../web-ui/cost.js";
import MainMenuComponent from "../web-ui/menu.js";
import FilterListComponent from "../web-ui/filter.js";
import EmptyStateComponent from "../web-ui/empty-state.js";

// INT 2 Экспортируем контроллера
export default class UIController {
  constructor(filterList,
      filterSelectedDefault,
      menulist,
      menuSelectedByDefault,
      sortList,
      sortListSeletedDefault,
      fullInfoArr,
      emptyStateWelecomeMsg) {
    this._filterList = filterList;
    this._filterSelectedDefault = filterSelectedDefault;
    this._menulist = menulist;
    this._menuSelectedByDefault = menuSelectedByDefault;
    this._sortList = sortList;
    this._sortListSelectedDefault = sortListSeletedDefault;
    this._fullInfoArr = fullInfoArr;
    this._emptyStateWelecomeMsg = emptyStateWelecomeMsg;
    this._sortType = null;

    this._FilterListComponent = new FilterListComponent(this._filterList, this._filterSelectedDefault);
    this._MainMenuComponent = new MainMenuComponent(this._menulist, this._menuSelectedByDefault);
    this._FullInfoComponent = new FullInfoComponent(this._fullInfoArr);
    this._TripCostComponent = new TripCostComponent();
    this._SortListComponent = new SortListComponent(this._sortList, this._sortListSelectedDefault);
    this._EmptyStateComponent = new EmptyStateComponent(this._emptyStateWelecomeMsg);
  }

  show() {
    // INT 21 Рендерим интерфейс приложения
    const pageHeader = document.querySelector(`body`);
    const board = new BoardComponent();
    render(pageHeader, board, RenderPosition.BEFOREEND);
    // ^^^ board был добавлен так как у меня обработчики вешались на документ,
    // и крепить их к какомут-то элементу стремно, поэтому был добавлен board и
    // сюда будут крепиться все обаботчики документа (добавление обрабов в конце)

    const header = document.querySelector(`.trip-main`);
    const events = document.querySelector(`.trip-events`);
    const control = document.querySelector(`.trip-main__trip-controls`);

    render(control, this._FilterListComponent, RenderPosition.AFTERBEGIN);
    render(control, this._MainMenuComponent, RenderPosition.AFTERBEGIN);
    render(header, this._FullInfoComponent, RenderPosition.AFTERBEGIN);
    const commonInfo = header.querySelector(`.trip-info`);
    render(commonInfo, this._TripCostComponent, RenderPosition.BEFOREEND);

    // INT 22 Определяет нужна заглушка или нет
    if (this._fullInfoArr.length > 0) {
      render(events, this._SortListComponent, RenderPosition.AFTERBEGIN);
      // this._SortListComponent.setSortTypeChangeHandler();
    } else {
      const tripEvents = document.querySelector(`.trip-events`);
      render(tripEvents, this._EmptyStateComponent, RenderPosition.BEFOREEND);
    }
  }

  sortEventsListener(fn) {
    document.querySelector(`.trip-events__trip-sort`).addEventListener(`click`, fn);
  }

  filterEventsListener(fn) {
    document.querySelector(`.trip-filters`).addEventListener(`click`, fn);
  }

}
