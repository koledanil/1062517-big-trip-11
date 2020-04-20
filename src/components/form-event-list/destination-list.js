
const makeListDestinations = (destinationName) => {
  return (`<option value="${destinationName}"></option>`);
};

export const createListDestinationsTemplate = (arr) => {
  const listDestinationMarkup = arr.map((it) => makeListDestinations(it.name)).join(`\n`);
  return listDestinationMarkup;

};

