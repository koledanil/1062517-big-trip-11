// BRD 1 Имопрт
// ==== BRD 11 Импортируем вспомогательные функции из утилит
// import {render, replace, RenderPosition} from "../../components/utils/render.js";
import ItemController from "../../components/controllers/item.js";


// BRD 4 Экспорт контролера
export default class BoardController {
  constructor(arrPoints, arrOffers, arrDestination) {
    this._arrPoints = arrPoints;
    this._arrOffers = arrOffers;
    this._arrDestination = arrDestination;
    this._points = [];
    this._openedForm = null;
    this._addClickListerers();
  }

  show() {
    this._arrPoints.map((it)=>{
      const itemController = new ItemController(it, this._arrOffers, this._arrDestination);
      this._points.push(itemController);
      itemController.show();
    });
  }

  _addClickListerers() {
    document.addEventListener(`click`, (evt) =>{
      const eventContainer = evt.target.closest(`.point`);
      const isFormOpened = document.querySelector(`.event--edit`);

      if (this._openedForm !== null && isFormOpened && evt.target.className !== `event__rollup-btn btn-collapse-form`) {
        this._points[this._openedForm].closeEditForm();
      }

      if (evt.target.closest(`.point`)) {
        const id = eventContainer.getAttribute(`data-id`);
        this._points[id].containerItem = eventContainer;
        this._points[id].openEditForm();
        this._openedForm = id;
      }

      if (evt.target.className === `event__rollup-btn btn-collapse-form`) {
        const formContainer = evt.target.closest(`.trip-events__item`).getAttribute(`data-id`);
        this._points[formContainer].closeEditForm();
        this._openedForm = formContainer;
      }
    });
  }

}


