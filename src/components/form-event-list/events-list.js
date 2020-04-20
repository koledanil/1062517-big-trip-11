// /////////// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ, КОТОРЫЕ ПЕРЕШЛИ ИЗ ITEM-DEMO /////////////
// Переводит названия из нижнего регистра в лэттер регистр
const makeLetterCase = (str) => {
  const result = str.charAt(0).toUpperCase() + str.slice(1);
  return result;
};

// /////////// КОНЕЦ ВСПОМОГАТЕЛЬНЫМ ФУНКЦИИЯМ, КОТОРЫЕ ПЕРЕШЛИ ИЗ ITEM-DEMO /////////////


const makeItemTransfer = (eventType) => {
  let eventTypeLetterCase = makeLetterCase(eventType);
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

// export const makeListTransferEvent = () => {
//     return (`
//       <fieldset class="event__type-group">
//               <legend class="visually-hidden">Transfer</legend>

//               <div class="event__type-item">
//                 <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
//                 <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
//                 <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
//                 <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
//                 <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
//                 <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
//                 <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
//               </div>

//               <div class="event__type-item">
//                 <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
//                 <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
//               </div>
//             </fieldset>
//       `);
//   };


// const makeListActivityEvent = () => {
//   return (`
//     <fieldset class="event__type-group">

//   </fieldset>
//     `);
// };
