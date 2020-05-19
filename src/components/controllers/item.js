// BRD 1 Имопрт
// ==== BRD 11 Импортируем вспомогательные функции из утилит
import {render, replace, RenderPosition} from "../../components/utils/render.js";

// ==== BRD 12 Импортируем компоненты одной точки маршрута и формы редактирования
import PointComponent from "../../components/trip-event/item.js";
import PointFormComponent from "../../components/trip-event/form.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class ItemController {
  constructor(arrPoints, arrOffers, arrDestination, onDataChange, onViewChange) {
    this._arrPoints = arrPoints;
    this._arrOffers = arrOffers;
    this._arrDestination = arrDestination;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._pointComponent = null;
    this._pointEditForm = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point) {
    const days = document.querySelector(`.trip-days`);
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditForm;

    this._pointComponent = new PointComponent(point);
    this._pointEditForm = new PointFormComponent(point, this._arrOffers, this._arrDestination);

    if (oldPointEditComponent && oldPointComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._pointEditForm, oldPointEditComponent);
    } else {
      render(days, this._pointComponent, RenderPosition.BEFOREEND);
    }
    
    this._pointComponent.setOpenFormClickListener(() => {
      // this._pointEditForm.recoveryListeners();
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditForm.setCloseFormClickListener(()=>{
      this._replaceEditToPoint();
    });

    this._pointEditForm.setFavoriteClickListener(()=>{
      this._onDataChange(this, point, Object.assign({}, point, {
        base_price: 4000,
      }));
    });

    // this._pointEditForm.setSelectPointTypeListener(()=>{
    //   console.log(`sdfsdfsdf`);
    // })

    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }
  // end render

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replaceEditToPoint() { // закрывашка
    // this._taskEditComponent.reset();
    replace(this._pointComponent, this._pointEditForm);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _replacePointToEdit() { // открывашка
    this._onViewChange();
    replace(this._pointEditForm, this._pointComponent);
    this._mode = Mode.EDIT;
  }

}
