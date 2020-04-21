import moment from 'moment';
const AMOUNT_DESTINATION_IN_INFO = 3;

// Информация о путешествии и маршрут
// TIN 01 Находит среди всех точек последнюю точку и берет из нее FROM_TO
const prepareDate = (arr) => {
  let result = null;
  arr.map((it) => {
    result = it.date_to;
  });
  return result;
};

// TIN 02 Определяет продолжнительность путешествия. Также ЕСЛИ даты идут в одном месяце
// то отобржает так APR, WED 8—FRI 17. Если начало и конец в разных то APR, WED 8— MAY, FRI 17.
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

// TIN 03 Формирует список наших маршрутов Город -- Город -- Город или Город--...--Город
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


export const tripItemInfo = (arr) => {
  const duration = checkDates(arr); // расчитываем длительность поездки
  const route = createRoute(arr);


  return (`
  <section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${route}</h1>
    <p class="trip-info__dates">${duration}</p>
  </div>
</section>
  `);

};
