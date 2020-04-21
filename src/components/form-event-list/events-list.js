// /////////// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ, КОТОРЫЕ ПЕРЕШЛИ ИЗ ITEM-DEMO /////////////
// Переводит названия из нижнего регистра в лэттер регистр
const makeLetterCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// /////////// КОНЕЦ ВСПОМОГАТЕЛЬНЫМ ФУНКЦИИЯМ, КОТОРЫЕ ПЕРЕШЛИ ИЗ ITEM-DEMO /////////////


const makeItemTransfer = (eventType) => {
  const eventTypeLetterCase = makeLetterCase(eventType);
  return (`
    <div class="event__type-item">
    <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
    <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventTypeLetterCase}</label>
  </div>
    `);
};

export const makeListTransferEvent = (allOffersArr) => {
  let tranfersItems = [];
  let activityItems = [];

  for (let i = 0; i < allOffersArr.length; i++) {
    if (allOffersArr[i].type === `restaurant` || allOffersArr[i].type === `sightseeing` || allOffersArr[i].type === `check-in`) {
      activityItems.push(allOffersArr[i].type);
    } else {
      tranfersItems.push(allOffersArr[i].type);
    }
  }

  const itemTransferList = tranfersItems.map((it) => makeItemTransfer(it)).join(`\n`);
  const itemActivityList = activityItems.map((it) => makeItemTransfer(it)).join(`\n`);
  return (`
    <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${itemTransferList}
          </fieldset>
<fieldset class="event__type-group">
${itemActivityList}
</fieldset>
    `);
};
