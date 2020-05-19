// ТIT 1 Имопрты
import moment from 'moment';
import {choosePreposition, makeLetterCase} from "../../../src/components/utils/uncategorized-util.js";
import AbstractComponent from "../../../src/components/abstract/abstract-component.js";

// TIT 2 Разметка одного дополнительного офера
const createOfferMarkup = (offerTitle, offerPrice) => {
  return (`
  <li class="event__offer">
        <span class="event__offer-title">${offerTitle}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
       </li>
  `);
};
// TIT 2 ENDED


// TIT 3 На базе разметки генерируем столько оферо сколько пришло в ответе
const createOfferTemplate = (arr) => {
  return arr.map((it) => createOfferMarkup(it.title, it.price)).join(`\n`);
};
// TIT 3 ENDED


// TIT 4 Функция высчитавает продолжительность события используется momemnt js
const calcDuration = (dateToFull, dateFromFull) => {
  const now = moment(dateToFull);
  const then = moment(dateFromFull);

  const ms = moment(now, `DD/MM/YYYY HH:mm:ss`).diff(moment(then, `DD/MM/YYYY HH:mm:ss`));
  const duration = moment.duration(ms);

  const durDays = Math.floor(duration.asDays());
  const durHours = moment.utc(ms).format(`hh`);
  const durMinutes = moment.utc(ms).format(`mm`);

  const areDays = Math.floor(duration.asDays()) > 0;
  const resultDays = areDays ? `${durDays}D` : ``;

  const areHours = moment.utc(ms).format(`hh`) > 0;
  const resultHours = areHours ? `${durHours}H` : ``;

  const areMinutes = moment.utc(ms).format(`mm`) > 0;
  const resultMinutes = areMinutes ? `${durMinutes}M` : ``;

  return `${resultDays} ${resultHours} ${resultMinutes}`;
};
// TIT 4 ENDED


// TIT 5 Функция сравнивает новую дату пользовательской точки из массива с предыдыдушей если дата не повторяется то дата отображается в размтке, если дата повторяется то дата не показывается в разметке
const compareDate = (date) => {
  let result = ``;
  const currentDate = moment(date).format(`DD MM`);
  if (currentDate !== window.dateBuffer) {
    result = ``;
  } else {
    result = `visually-hidden`;
  }

  window.dateBuffer = currentDate;
  return result;
};
// TIT 5 ENDED


// ТIT 5 Функция к-ая занимается формирование финального вида точки
const createItemMarkup = (arr) => {
  const isHided = compareDate(arr.date_from);
  const eventType = makeLetterCase(arr.type);
  const preposition = choosePreposition(eventType);
  const destinationName = arr.destination.name;
  const dataId = arr.id;

  const dateFromFull = arr.date_from;
  const dateToFull = arr.date_to;
  const timeFrom = new Date(dateFromFull).getUTCHours() + `:` + (`0` + new Date(dateFromFull).getUTCMinutes()).slice(-2);
  const timeTo = new Date(dateToFull).getUTCHours() + `:` + (`0` + new Date(dateToFull).getUTCMinutes()).slice(-2);
  const duration = calcDuration(dateToFull, dateFromFull);

  const dateStageMonthYear = moment(arr.date_from).format(`MMM YYYY`);
  const dateStageDay = moment(arr.date_from).format(`D`);
  const dateStageDayWeek = moment(arr.date_from).format(`ddd`);

  const basePrice = arr.base_price;
  const areOffers = arr.offers.length > 0; // проверяем длинну ответа по офферам
  const offers = areOffers ? createOfferTemplate(arr.offers) : `No offers choosen`; // если оферы есть то отрисоываем их

  // foundTemplate.setAttribute('data-id', index);
  return (`<li class="trip-events__item day point" data-id="${dataId}"><div class="day__info"><span class="day__counter ${isHided}">${dateStageDay}</span>
 <time class="day__date ${isHided}" datetime="${dateFromFull}">${dateStageMonthYear}</time>
    <span class="day__date day__week ${isHided}">${dateStageDayWeek}</span>
  </div>
  <ul class="trip-events__list"></ul>
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="${eventType} icon">
    </div>
    <h3 class="event__title">${eventType} ${preposition} ${destinationName}</h3>
    <div class="event__schedule">
      <p class="event__time"><time class="event__start-time" datetime="${dateFromFull}">${timeFrom}</time>&mdash;<time class="event__end-time" datetime="${dateToFull}">${timeTo}</time></p>
      <p class="event__duration">${duration}</p>
    </div>
    <p class="event__price">&euro;&nbsp;<span class="event__price-value">${basePrice}</span></p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
     ${offers}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
};
// ТIT 5 ENDED


// TIT 6 наследуем от абстрактного класса
export default class TripItem extends AbstractComponent {
  constructor(item) {
    super();
    this._item = item;
  }
  getTemplate() {
    return createItemMarkup(this._item);
  }

  setOpenFormClickListener(handler) {
    this.getElement().querySelector(`.event`).closest(`li`)
    .addEventListener(`click`, handler);
  }
}
