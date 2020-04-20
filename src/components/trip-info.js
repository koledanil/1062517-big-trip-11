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
  let moment = require(`moment`);
  let sDateOriginal = arr[0].date_from;
  let result = `Duration of your awesome trip`;

  if (sDateOriginal !== undefined) {
    let startDate = moment(arr[0].date_from);
    let endDate = moment(prepareDate(arr));

    if (startDate.format(`MMM`) === endDate.format(`MMM`)) {
      let readySatrtDate = startDate.format(`MMM, ddd D`);
      let readyEndDate = endDate.format(`ddd D`);
      result = `${readySatrtDate}&mdash;${readyEndDate}`;
    } else {
      let readySatrtDate = moment(arr[0].date_from).format(`MMM, ddd D`);
      let readyEndDate = moment(prepareDate(arr)).format(`MMM, ddd D`);
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

  if (desitanions.length > 3) {
    result = `${desitanions[0]} &mdash; ... &mdash; ${desitanions[desitanions.length - 1]}`;
  }

  if (desitanions.length <= 3) {
    result = `${desitanions[0]} &mdash; ${desitanions[1]} &mdash; ${desitanions[2]}`;
  }

  if (desitanions.length < 3) {
    result = `Your awesome trip`;
  }

  return result;
};


export const tripItemInfo = (arr) => {
  let duration = checkDates(arr); // расчитываем длительность поездки
  let route = createRoute(arr);


  return (`
  <section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${route}</h1>
    <p class="trip-info__dates">${duration}</p>
  </div>
</section>
  `);

};
// let startDate = moment(arr[0].date_from).format("ddd, MMM D");
// let endDate = moment(prepareDate(arr)).format("ddd, MMM D");
