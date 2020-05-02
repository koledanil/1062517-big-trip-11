// INT 1 Имопрты
// ==== INT 11 Импортируем вспомогательные функции из утилит
import {render, RenderPosition} from "../../components/utils/render.js";

// ==== INT 12 Импортируем компоненты интерфейса сортировка, стоимость, главное меню, фильтры
import BoardComponent from "../../components/web-ui/board.js";
import SortListComponent from "../../components/web-ui/sort.js";
import FullInfoComponent from "../../components/web-ui/info.js";
import TripCostComponent from "../../components/web-ui/cost.js";
import MainMenuComponent from "../../components/web-ui/menu.js";
import FilterListComponent from "../../components/web-ui/filter.js";
import EmptyStateComponent from "../../components/web-ui/empty-state.js";


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
  }

  show() {
    // МА3 Рендерим интерфейс
    // ==== МА31 Рендерим минмальные интерфейсные штуки
    const pageHeader = document.querySelector(`body`);
    const board = new BoardComponent();
    render(pageHeader, board, RenderPosition.BEFOREEND);
    // ^^^ board был добавлен так как у меня обработчики вешались на документ,
    // и крепить их к какомут-то элементу стремно, поэтому был добавлен board и
    // сюда будут крепиться все обаботчики документа (добавление обрабов в конце)

    const header = document.querySelector(`.trip-main`);
    const events = document.querySelector(`.trip-events`);
    const control = document.querySelector(`.trip-main__trip-controls`);

    render(control, new FilterListComponent(this._filterList, this._filterSelectedDefault), RenderPosition.AFTERBEGIN);
    render(control, new MainMenuComponent(this._menulist, this._menuSelectedByDefault), RenderPosition.AFTERBEGIN);
    render(header, new FullInfoComponent(this._fullInfoArr), RenderPosition.AFTERBEGIN);
    const commonInfo = header.querySelector(`.trip-info`);
    render(commonInfo, new TripCostComponent(), RenderPosition.BEFOREEND);

    // ==== МА31 Если в овтете сервера поинтс не пустые, то мы выводим их, если пустые то выводим заглушку
    if (this._fullInfoArr.length > 0) {
      render(events, new SortListComponent(this._sortList, this._sortListSelectedDefault), RenderPosition.AFTERBEGIN);

    //   renderAllPoints(this._fullInfoArr, days);
    } else {
      const tripEvents = document.querySelector(`.trip-events`);
      render(tripEvents, new EmptyStateComponent(this._emptyStateWelecomeMsg), RenderPosition.BEFOREEND);
    }
  }
}
