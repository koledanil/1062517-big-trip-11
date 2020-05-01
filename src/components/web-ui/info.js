import moment from 'moment';
import AbstractComponent from "../../../src/components/abstract/abstract-component.js";
const AMOUNT_DESTINATION_IN_INFO = 3;

// Информация о путешествии и маршрут
// TIN 1 Находит среди всех точек последнюю точку и берет из нее FROM_TO
const prepareDate = (arr) => {
  let result = null;
  arr.map((it) => {
    result = it.date_to;
  });
  return result;
};
// TIN 1 ENDED


// TIN 2 Определяет продолжнительность путешествия. Также ЕСЛИ даты идут в одном месяце, то отобржает так APR, WED 8—FRI 17. Если начало и конец в разных то APR, WED 8— MAY, FRI 17.
const checkDates = (arr) => {
  const sDateOriginal = arr[0].date_from;
  let result = `Duration of your awesome trip`;
  if (sDateOriginal !== undefined) {
    const startDate = moment(arr[0].date_from);
    const endDate = moment(prepareDate(arr));

    if (startDate.format(`MMM`) === endDate.format(`MMM`)) {
      const readySatrtDate = startDate.format(`MMM, ddd D`);
      const readyEndDate = endDate.format(`ddd D`);
      result = `${readySatrtDate}&mdash;${readyEndDate}`;
    } else {
      const readySatrtDate = moment(arr[0].date_from).format(`MMM, ddd D`);
      const readyEndDate = moment(prepareDate(arr)).format(`MMM, ddd D`);
      result = `${readySatrtDate} &mdash; ${readyEndDate}`;
    }
  }
  return result;
};
// TIN2 ENDED


// TIN 3 Формирует список наших маршрутов Город -- Город -- Город или Город--...--Город
const createRoute = (arr) => {
  let desitanions = [];
  let result = null;
  arr.map((it) => {
    desitanions.push(it.destination.name);
  });

  if (desitanions.length > AMOUNT_DESTINATION_IN_INFO) {
    result = `${desitanions[0]} &mdash; ... &mdash; ${desitanions[desitanions.length - 1]}`;
  }

  if (desitanions.length <= AMOUNT_DESTINATION_IN_INFO) {
    result = `${desitanions[0]} &mdash; ${desitanions[1]} &mdash; ${desitanions[2]}`;
  }

  if (desitanions.length < AMOUNT_DESTINATION_IN_INFO) {
    result = `Your awesome trip`;
  }

  return result;
};
// TIN 3 ENDED


// TIN 4 Основная фукнция
const createInfoFullMarkup = (arr) => {
  let duration = null;
  let route = null;

  if (arr.length !== 0) {
    duration = checkDates(arr); // расчитываем длительность поездки
    route = createRoute(arr);
  } else {
    route = `Awesome trip`;
    duration = `go around the World`;
  }


  return (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${route}</h1>
    <p class="trip-info__dates">${duration}</p>
  </div>
</section>`);

};
// TIN4 ENDED


// TIN 5 наследуем от абстрактного класса
export default class TripFullInfo extends AbstractComponent {
  constructor(item) {
    super();
    this._item = item;
  }
  getTemplate() {
    return createInfoFullMarkup(this._item);
  }
}
