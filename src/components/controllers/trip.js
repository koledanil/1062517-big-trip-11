// utils
import {render, RenderPosition} from "../../components/utils/render.js";

// ==== BRD 12 Импортируем компоненты одной точки маршрута и формы редактирования
// import ItemComponent from "../../components/trip-event/item.js";

// контроллер точки
import PointController from "../../components/controllers/item.js";

// компоненты
import BoardComponent from "../web-ui/board.js";
import SortListComponent from "../web-ui/sort.js";
import FullInfoComponent from "../web-ui/info.js";
import TripCostComponent from "../web-ui/cost.js";
import MainMenuComponent from "../web-ui/menu.js";
import FilterListComponent from "../web-ui/filter.js";
import EmptyStateComponent from "../web-ui/empty-state.js";

const renderPoints = (points, arrPoints, arrOffers, arrDestination, onDataChange, onViewChange) =>{
  return points.map((point) => {
    const pointController = new PointController(arrPoints, arrOffers, arrDestination, onDataChange, onViewChange);
    pointController.render(point);
    return pointController;
  });
};

// BRD 4 Экспорт контролера
export default class BoardController {
  constructor(arrPoints, arrOffers, arrDestination,
      filterList,
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

    this._arrPoints = arrPoints;
    this._arrOffers = arrOffers;
    this._arrDestination = arrDestination;

    this._points = [];
    this._pointsControllers = [];

    this._FilterListComponent = new FilterListComponent(this._filterList, this._filterSelectedDefault);
    this._MainMenuComponent = new MainMenuComponent(this._menulist, this._menuSelectedByDefault);
    this._FullInfoComponent = new FullInfoComponent(this._fullInfoArr);
    this._TripCostComponent = new TripCostComponent();
    this._SortListComponent = new SortListComponent(this._sortList, this._sortListSelectedDefault);
    this._EmptyStateComponent = new EmptyStateComponent(this._emptyStateWelecomeMsg);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(points) {
    this._renderHeaderUI();

    if (points === null) { // выбрасывает заглушку
      const events = document.querySelector(`.trip-events`);
      render(events, this._EmptyStateComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    this._points = points;

    const newPoints = renderPoints(points, this._arrPoints, this._arrOffers, this._arrDestination, this._onDataChange, this._onViewChange);
    this._pointsControllers = this._pointsControllers.concat(newPoints);
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._arrPoints.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));
    taskController.render(this._points[index]);
  }

  _onViewChange() {
    this._pointsControllers.forEach((it) => it.setDefaultView());
  }

  _renderHeaderUI() {
    // INT 21 Рендерим интерфейс приложения
    const pageHeader = document.querySelector(`body`);
    const board = new BoardComponent();
    render(pageHeader, board, RenderPosition.BEFOREEND);

    const header = document.querySelector(`.trip-main`);
    // const events = document.querySelector(`.trip-events`);
    const control = document.querySelector(`.trip-main__trip-controls`);

    render(control, this._FilterListComponent, RenderPosition.AFTERBEGIN);
    render(control, this._MainMenuComponent, RenderPosition.AFTERBEGIN);
    render(header, this._FullInfoComponent, RenderPosition.AFTERBEGIN);
    const commonInfo = header.querySelector(`.trip-info`);
    render(commonInfo, this._TripCostComponent, RenderPosition.BEFOREEND);
  }

}
//
