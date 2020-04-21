
const makeListDestinations = (destinationName) => {
  return (`<option value="${destinationName}"></option>`);
};

export const createListDestinationsTemplate = (arr) => {
  return arr.map((it) => makeListDestinations(it.name)).join(`\n`);

};

