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

// const getRepeatArray = (array) => {
//   let newArr = [].concat(array);
//   for (let k, j = 0; j < array.length; ++j) {
//     for (k = j + 1; k < array.length; ++k) {
//       if (newArr[j] === newArr[k]) {
//         array[j] = array[j];
//         array[k] = ``;
//       }

//     }
//   }
//   // console.log(array);
// };

// export const deleteDate = (arr) => {
//   let moment = require(`moment`);
//   let dateFrom = [];
//   arr.map((it)=> {
//     let correctDate = moment(it.date_from).format(`dddd DD MM`);
//     dateFrom.push(correctDate);
//   });

//   let result = getRepeatArray(dateFrom);
//   return result;
// };

// let moment = require(`moment`);
// window.ys = moment(`2020-02-06T14:46:23.146Z`).format(`DD MM`);

// Функция сравнивает новую дату пользовательской точки из массива с предыдыдушей
// если дата не повторяется то дата отображается в размтке, если дата повторяется
// то дата не показывается в разметке
const compareDate = (date) => {
  let result = ``;
  let moment = require(`moment`);
  let currentDate = moment(date).format(`DD MM`);

  if (currentDate !== window.ys) {
    result = ``;
  } else {
    result = `visually-hidden`;
  }
  window.ys = currentDate;
  return result;
};

// ТI 06 Функция к-ая занимается формирование финального вида точки
export const createItemMarkup = (arr) => {
  let isHided = compareDate(arr.date_from);
  let moment = require(`moment`);
  let eventType = makeLetterCase(arr.type);
  let preposition = choosePreposition(eventType);
  let destinationName = arr.destination.name;


  let dateFromFull = arr.date_from;
  let dateToFull = arr.date_to;
  let timeFrom = new Date(dateFromFull).getUTCHours() + `:` + (`0` + new Date(dateFromFull).getUTCMinutes()).slice(-2);
  let timeTo = new Date(dateToFull).getUTCHours() + `:` + (`0` + new Date(dateToFull).getUTCMinutes()).slice(-2);
  let duration = calcDuration(dateToFull, dateFromFull);

  let dateStageMonthYear = moment(arr.date_from).format(`MMM YY`);
  let dateStageDay = moment(arr.date_from).format(`D`);
  let dateStageDayWeek = moment(arr.date_from).format(`ddd`);


  let basePrice = arr.base_price;
  let areOffers = arr.offers.length > 0; // проверяем длинну ответа по офферам
  const offers = areOffers ? createOfferTemplate(arr.offers) : `No offers choosen`; // если оферы есть то отрисоываем их

  return (`
<li class="trip-events__item day">

  <div class="day__info">
    <span class="day__counter ${isHided}">${dateStageDay}</span>
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
