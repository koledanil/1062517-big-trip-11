// BRD 1 Имопрт
// ==== BRD 11 Импортируем вспомогательные функции из утилит
// import {render, replace, RenderPosition} from "../../components/utils/render.js";
import ItemController from "../../components/controllers/item.js";


// BRD 4 Экспорт контролера
export default class TripController {
  constructor(arrPoints, arrOffers, arrDestination) {
    this._arrPoints = arrPoints;
    this._arrOffers = arrOffers;
    this._arrDestination = arrDestination;
    this._pointsData = [];
    this._points = [];
    this._openedForm = null;
    this._addClickListeners();
    // this._onDataChange = null;
  }

  // set onDataChange(value) {
  //   this._onDataChange = value;
  // };

  show() {
    this._arrPoints.map((it)=>{
      this._pointsData.push(it);
      const itemController = new ItemController(it, this._arrOffers, this._arrDestination);
      this._points.push(itemController);
      itemController.show(it);
    });
  }


  _addClickListeners() {
    document.addEventListener(`click`, (evt) =>{
      const eventContainer = evt.target.closest(`.point`);
      const isFormOpened = document.querySelector(`.event--edit`);
      if (evt.target.closest(`.point`)) {
        if (this._openedForm !== null && isFormOpened && evt.target.className !== `event__rollup-btn btn-collapse-form`) {
          this._points[this._openedForm].closeEditForm();
        }

        if (evt.target.closest(`.point`)) {
          const id = eventContainer.getAttribute(`data-id`);
          this._points[id].containerItem = eventContainer;
          this._points[id].openEditForm();
          this._points[id].onDataChangeFn = this._onDataChange.bind(this);
          this._openedForm = id;
        }
      }

      if (evt.target.className === `event__rollup-btn btn-collapse-form`) {
    
        const formContainer = evt.target.closest(`.trip-events__item`).getAttribute(`data-id`);
        this._points[formContainer].closeEditForm();
        this._openedForm = formContainer;
      }
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._pointsData.findIndex((it) => it === oldData);
    console.log(index, `значение найдено в среди точек`);

    if (index === -1) {
      return;
    }
    

    // const updatedController = new ItemController(newData, this._arrOffers, this._arrDestination);
    
    this._arrPoints = [].concat(this._arrPoints.slice(0, index), newData, this._arrPoints.slice(index + 1));

    // console.log(this._points, `контроллер ${index} обновлен`)
    taskController.show(this._arrPoints[index]);
  }
}


