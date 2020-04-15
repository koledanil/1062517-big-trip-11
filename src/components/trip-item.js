
// TI 01 Разметка одного дополнительного офера
const createOfferMarkup = (offerTitle, offerPrice) => {
  return (`
  <li class="event__offer">
        <span class="event__offer-title">${offerTitle}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
       </li>
  `);
};

// TI 02 На базе разметки генерируем столько оферо сколько пришло в ответе
const createOfferTemplate = (arr) => {
  const offerMarkup = arr.map((it) => createOfferMarkup(it.title, it.price)).join(`\n`);
  return offerMarkup;
};

// TI 03 Функция которая делает лэттэ кейс
const makeLetterCase = (str) => {
  const result = str.charAt(0).toUpperCase() + str.slice(1);
  return result;
};

// TI 04 Функция выбирает prepositiion
const choosePreposition = (eventType) => {

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
  const result = prepositiion[eventType.replace(/[^A-Za-zА-Яа-яЁё]/g, ``).toLowerCase()]; // удаляем пробелы тире и все из типа точки
  return result;
};


// TI 05 Функция высчитавает продолжительность события используется momemnt js
const calcDuration = (dateToFull, dateFromFull) => {
  let moment = require(`moment`);
  let now = moment(dateToFull);
  let then = moment(dateFromFull);

  let ms = moment(now, `DD/MM/YYYY HH:mm:ss`).diff(moment(then, `DD/MM/YYYY HH:mm:ss`));
  let duration = moment.duration(ms);

  let durDays = Math.floor(duration.asDays());
  let durHours = moment.utc(ms).format(`hh`);
  let durMinutes = moment.utc(ms).format(`mm`);

  let areDays = Math.floor(duration.asDays()) > 0;
  let resultDays = areDays ? `${durDays}D` : ``;

  let areHours = moment.utc(ms).format(`hh`) > 0;
  let resultHours = areHours ? `${durHours}H` : ``;

  let areMinutes = moment.utc(ms).format(`mm`) > 0;
  let resultMinutes = areMinutes ? `${durMinutes}M` : ``;

  let result = `${resultDays} ${resultHours} ${resultMinutes}`;
  return result;
};

// ТI 06 Функция к-ая занимается формирование финального вида точки
export const createItemMarkup = (arr) => {
  let eventType = makeLetterCase(arr.type);
  let preposition = choosePreposition(eventType);
  let destinationName = arr.destination.name;
  let dateFromFull = arr.date_from;
  let dateToFull = arr.date_to;
  let timeFrom = new Date(dateFromFull).getUTCHours() + `:` + (`0` + new Date(dateFromFull).getUTCMinutes()).slice(-2);
  let timeTo = new Date(dateToFull).getUTCHours() + `:` + (`0` + new Date(dateToFull).getUTCMinutes()).slice(-2);
  let duration = calcDuration(dateToFull, dateFromFull);
  let basePrice = arr.base_price;
  let areOffers = arr.offers.length > 0; // проверяем длинну ответа по офферам
  const offers = areOffers ? createOfferTemplate(arr.offers) : `No offers choosen`; // если оферы есть то отрисоываем их


  return (`
<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="${eventType} icon">
    </div>
    <h3 class="event__title">${eventType} ${preposition} ${destinationName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFromFull}">${timeFrom}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateToFull}">${timeTo}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
     ${offers}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
`);
};


