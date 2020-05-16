// BRD 1 Имопрт
// ==== BRD 11 Импортируем вспомогательные функции из утилит
import {render, replace, RenderPosition} from "../../components/utils/render.js";

// ==== BRD 12 Импортируем компоненты одной точки маршрута и формы редактирования
import ItemComponent from "../../components/trip-event/item.js";
import EditFormComponent from "../../components/trip-event/form.js";


// BRD 4 Экспорт контролера
export default class ItemController {
  constructor(point, arrOffers, arrDestination) {
    this._point = point;
    this._arrOffers = arrOffers;
    this._arrDestination = arrDestination;
    this._ItemFormComponent = new EditFormComponent(this._point, this._arrOffers, this._arrDestination);
   

    this._ItemFormElement = this._ItemFormComponent.getElement();

    this._bindEscHandler = this.closeEscHandler.bind(this);
    this._containerItem = document.querySelector(`.trip-days`);
    this._onDataChange = null;
  }

  set containerItem(value) {
    this._containerItem = value;
  }

  set onDataChangeFn(fn) {
    this._onDataChange = fn;
  }

  _closeEditForm(old, newOne) {
    replace(old, newOne, old);
  }

  _isEsc(evt) {
    let escClose = null;
    if (evt.key === `Escape` && evt.target.type !== `text`) {
      escClose = true;
    }

    if (evt.key === `Escape` && evt.target.type === `text`) {
      escClose = false;
    }

    return escClose;
  }


  closeEscHandler(evt) {
    const allFields = document.querySelectorAll(`.event__input`);
    const condition = this._isEsc(evt);

    if (condition) {
      this._closeEditForm(this._ItemFormElement, this._ItemElement);
      document.removeEventListener(`keydown`, this._bindEscHandler);
    }

    if (!condition) {
      allFields.forEach((it) => {
        it.blur();
      });
      this._closeEditForm(this._ItemFormElement, this._ItemElement);
      document.removeEventListener(`keydown`, this._bindEscHandler);
    }
  }

  openEditForm() {
    replace(this._containerItem, this._ItemFormElement, this._containerItem);
    document.addEventListener(`keydown`, this._bindEscHandler);
    this._ItemFormComponent.addFavoriteListener(()=>{
      this._onDataChange(this, this._point, Object.assign({}, this._point, {base_price: 1923}));
    });
  }

  closeEditForm() {
    this._closeEditForm(this._ItemFormElement, this._ItemElement);
    document.removeEventListener(`keydown`, this._bindEscHandler);
  }

  show(point) {
    this._ItemComponent = new ItemComponent(point);
    this._ItemElement = this._ItemComponent.getElement();
    // отрисовка точки
    const days = document.querySelector(`.trip-days`);
    render(days, this._ItemComponent, RenderPosition.BEFOREEND);
  }
}

