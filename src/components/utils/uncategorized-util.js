// U1 Функция выбора preposition
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

export const choosePreposition = (eventType) => {
  return prepositiion[eventType.replace(/[^A-Za-zА-Яа-яЁё]/g, ``).toLowerCase()]; // удаляем пробелы тире и все из типа точки
};
// U1 ENDED


// U2 Делает лэттэр кейс в названиях типов точек
export const makeLetterCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
// U2 EDNDED
