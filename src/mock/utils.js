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

export const choosePreposition1 = (eventType) => {
  return prepositiion[eventType.replace(/[^A-Za-zА-Яа-яЁё]/g, ``).toLowerCase()]; // удаляем пробелы тире и все из типа точки
};


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
