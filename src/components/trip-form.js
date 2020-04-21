import moment from 'moment';

const prepositiion = {
  drive: `to`,
  checkin: `in`,
  sightseeing: `in`,
  flight: `to`,
  taxi: `to`,
  bus: `to`,
  transport: `to`,
  restaurant: `in`,
  ship: `to`,
  train: `to`
};

// /////////// ВЫВОДИМ ДОПЫ /////////////
// Данная функция шаблонизирует один офер
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

// Данная функция получает тип точки и согласно типу точки ищет ВСЕ допы для данной точки
// Также она делает чекнутыми все офферы которые были выбраны юзером
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

// Данная функция уже берет результаты createOfferTemplate и вставляет в разметку
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
// /////////// ЗАКОНЧИЛИ ВЫВОДИТЬ ДОПЫ /////////////


// /////////// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ, КОТОРЫЕ ПЕРЕШЛИ ИЗ ITEM-DEMO /////////////
// Переводит названия из нижнего регистра в лэттер регистр
const makeLetterCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Подставляет корректный препозишин на основании типа поездки
const choosePreposition = (eventType) => {

  return prepositiion[eventType.replace(/[^A-Za-zА-Яа-яЁё]/g, ``).toLowerCase()]; // удаляем пробелы тире и все из типа точки
};
// /////////// КОНЕЦ ВСПОМОГАТЕЛЬНЫМ ФУНКЦИИЯМ, КОТОРЫЕ ПЕРЕШЛИ ИЗ ITEM-DEMO /////////////


// /////////// ЭТО ФУНКЦИЯ ОТВЕЧАЕТ ЗА ОТОБРАЖАЕТ ОПИСАНИЕ НАВПРАЛЕНИЯ /////////////
// создаем шаблон строки с фоткой
const makeDestinationImages = (link, description) => {
  return (`
  <img class="event__photo" src="${link}" alt="${description}">
  `);
};
// выводим шаблон строки в разметку
const makeDestinationTemplate = (arr) => {
  return arr.map((it) => makeDestinationImages(it.src, it.description)).join(`\n`);
};

// Эта функция берет Направление из данных пользователя, и находит в данных сервера инфу по этому направлению
const findDestination = (userDestination, eventallDestinationsArr) => {
  let destination = {};
  for (let i = 0; i < eventallDestinationsArr.length; i++) {

    if (eventallDestinationsArr[i].name === userDestination) {
      destination = eventallDestinationsArr[i];
    }
  }
  return destination;
};


// /////////// ЭТО ОСНОВНАЯ ФУНКЦИЯ КОТОРАЯ ДЕЛАЕТ ВСЮ РАБОТУ /////////////
export const createTripEditForm = (arr, allOffersArr, allDestinationsArr) => {
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

  return (`
  <form class="trip-events__item  event  event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="${eventType} icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  
      <div class="event__type-list">
      </div>
    </div>
  
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${eventType} ${preposition}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
      <datalist id="destination-list-1">
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
  </form>
  `);
};
// /////////// КОНЕЦ ЭТО ОСНОВНАЯ ФУНКЦИЯ КОТОРАЯ ДЕЛАЕТ ВСЮ РАБОТУ /////////////
