import moment from 'moment';
import {choosePreposition, createElement, makeLetterCase} from "../utils.js";


// TFO 1 Выводим все допы, которые доступны для данного направления
// ===== TFO 11 Делаем шаблон одного офера
const makeOffer = (offerTitle, offerPrice, checked = ``) => {
  return (`<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerTitle}-1" type="checkbox" name="event-${offerTitle}" ${checked}>
  <label class="event__offer-label" for="event-offer-${offerTitle}-1">
    <span class="event__offer-title">${offerTitle}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
  </label>
</div>`);
};
// ===== TFO 11 Конец

// ===== TFO 12 По типу точки делает список офферов для нее и выделяет те, что были выбраны юзером
const createOfferTemplate = (arr, allOffersArr, eventType) => {

  const offerUserArray = [];
  let listOffers = null;

  arr.offers.map((it) => { // делаем из объекта ОФЕРЫ ВЫБР ПОЛЬЗОВАТЕЛЕМ массив
    offerUserArray.push(it.title);
  });

  allOffersArr.map((it) => { // ВЫВОДИМ все оферы которые у нас есть в данном типе ивента
    if (it.type === eventType) {
      listOffers = it.offers;
    }
  });

  listOffers.map((it) => { // СРЕДИ всех оферов ивента выделяем именно те которые выбраны юзером и дописываем значение checked для них
    for (let i = 0; i < offerUserArray.length; i++) {
      if (it.title === offerUserArray[i]) {
        it[`checked`] = `checked`;
      }
    }
  });

  return listOffers.map((it) => makeOffer(it.title, it.price, it.checked)).join(`\n`); // передаем результат в разметку
};
// ===== TFO 12 Конец

// ===== TFO 13 Берет результат TFO12 и формирует финальную разметку
const showOfferList = (offers) => {
  return (`
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

  <div class="event__available-offers">
    ${offers}
  </div>
</section>
  `);
};
// /////////// ЗАКОНЧИЛИ TFO 1 ВЫВОДИТЬ ДОПЫ /////////////


// TFO 2 Вывод фоток для данного направления
// ===== TFO 21 Создаем шаблон с одной фоткой
const makeDestinationImages = (link, description) => {
  return (`
  <img class="event__photo" src="${link}" alt="${description}">
  `);
};
// ===== TFO 21 Конец

// ===== TFO 22 Делаем нужное к-во шаблоно в на базе массива
const makeDestinationTemplate = (arr) => {
  return arr.map((it) => makeDestinationImages(it.src, it.description)).join(`\n`);
};
// ===== TFO 22 Конец
// /////////// ЗАКОНЧИЛИ TFO 2 ДОБАВЛЕНИЕ ФОТОК СОЛГЛАСНО НАПРАВЛЕНИЮ /////////////


// TFO 3 Выводим описание направления
// ===== TFO 31 Берем из овтета сервра Напрлавение из данных пользователя и по нему находим инфу в описании направлений данное направление
const findDestination = (userDestination, eventallDestinationsArr) => {
  let destination = {};
  for (let i = 0; i < eventallDestinationsArr.length; i++) {

    if (eventallDestinationsArr[i].name === userDestination) {
      destination = eventallDestinationsArr[i];
    }
  }
  return destination;
};
// ===== TFO 31 Конец
// /////////// ЗАКОНЧИЛИ TFO 3 ДОБАВЛЕНИЕ ОПИСАНИЯ НАПРАВЛЕНИЯ /////////////


// TFO 4 Выводим список предложений направлений для поля Направление
// ===== TFO 41 Формируем шаблон для одной записи в спике
const createListDestinations = (destinationName) => {
  return (`<option value="${destinationName}"></option>`);
};
// ===== TFO 41 Конец

// ===== TFO 42 Формируем шаблон для одной записи в спике
const createDestinationsList = (arr) => {
  return arr.map((it) => createListDestinations(it.name)).join(`\n`);
};
// ===== TFO 42 Конец
// /////////// ЗАКОНЧИЛИ TFO 4 ВЫВОДИТЬ СПИСОК ПРЕДЛОЖЕНИЙ НАПРАВЛЕНИЙ /////////////


// TFO 5 Выводим список типов точек доступнхы для выбора
// ===== TFO 51 Формирует один пункт списка
const makeItemTransfer = (eventType) => {
  const eventTypeLetterCase = makeLetterCase(eventType);
  return (`
    <div class="event__type-item">
    <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
    <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventTypeLetterCase}</label>
  </div>
    `);
};

// ===== TFO 52 Формирует финальный список типов и разбивает его на два типа
const makeListTransferEvent = (allOffersArr) => {

  let tranfersItems = [];
  let activityItems = [];

  for (let i = 0; i < allOffersArr.length; i++) {
    if (allOffersArr[i].type === `restaurant` || allOffersArr[i].type === `sightseeing` || allOffersArr[i].type === `check-in`) {
      activityItems.push(allOffersArr[i].type);
    } else {
      tranfersItems.push(allOffersArr[i].type);
    }
  }

  const itemTransferList = tranfersItems.map((it) => makeItemTransfer(it)).join(`\n`);
  const itemActivityList = activityItems.map((it) => makeItemTransfer(it)).join(`\n`);
  return (`
    <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${itemTransferList}
          </fieldset>
<fieldset class="event__type-group">
${itemActivityList}
</fieldset>
    `);
};
// ===== TFO 52 Конец
// /////////// ЗАКОНЧИЛИ TFO 5 ВЫВОДИТЬ СПИСОК ТИПОВ ТОЧЕК /////////////


// TFO 6 Основная функция которая формирует разметку формы
const createEditFormMarkup = (arr, allOffersArr, allDestinationsArr) => {
  const eventTypeOriginal = arr.type; // эта переменная нужна чтобы работало Check-in дальше по коду мы удалем --, чтобы работал словарь choosePreposition
  const eventType = makeLetterCase(eventTypeOriginal);
  const preposition = choosePreposition(eventType);
  const dateFromFull = arr.date_from;
  const dateToFull = arr.date_to;
  const timeFrom = moment(dateFromFull).format(`MM/DD/YY HH:MM`);
  const timeTo = moment(dateToFull).format(`MM/DD/YY HH:MM`);
  const basePrice = arr.base_price;

  const areOffers = arr.offers.length > 0; // проверяем длинну ответа по офферам
  const offers = areOffers ? showOfferList(createOfferTemplate(arr, allOffersArr, eventTypeOriginal)) : ``; // если оферы есть то отрисоываем их (включая)

  const destinationName = arr.destination.name; // берем направление из пользовательских данных
  const destinationInfo = findDestination(destinationName, allDestinationsArr); // находим направление выбранное пользователем в данных сервера
  const destinationDescription = destinationInfo.description;
  const destinationPhotos = makeDestinationTemplate(destinationInfo.pictures);
  const destinationList = createDestinationsList(allDestinationsArr);

  const typeList = makeListTransferEvent(allOffersArr);

  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="${eventType} icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  
      <div class="event__type-list">
      ${typeList}
      </div>
    </div>
  
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${eventType} ${preposition}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${destinationList}
      </datalist>
    </div>
  
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}">
    </div>
  
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro; 
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>
  
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
${offers}
  
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationDescription}</p>
  
      <div class="event__photos-container">
        <div class="event__photos-tape">
          
          ${destinationPhotos}
        </div>
      </div>
    </section>
  </section>
  </form>`);
};
// TFO 6 Конец
// /////////// ЗАКОНЧИЛИ TFO 6 ФОРМИРОВАНИЕ РАЗМЕТКИ ФОРМЫ /////////////

// TFO 7 Создаем класс
export default class EditForm {
  constructor(item, arrOffers, arrDestination) {
    this._arrOffers = arrOffers;
    this._arrDestination = arrDestination;
    this._item = item;
    this._element = null;
  }

  getTemplate() {
    return createEditFormMarkup(this._item, this._arrOffers, this._arrDestination);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
