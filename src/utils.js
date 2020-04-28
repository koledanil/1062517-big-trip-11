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


// U3 Делает дом-элемент
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
// U3 ENDED


// U4 Выводит элемент в структуру
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderDom = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
// U4 ENDED

