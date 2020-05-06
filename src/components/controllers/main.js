/* eslint-disable no-console */
import moment from 'moment';

export default class MainController {
  constructor(uiController, boardController, uidata, userdata) {
    this._uiData = uidata;
    this._userData = userdata;
    this._sortedUserData = this._userData[0].slice();

    this._UIController = uiController;
    this._UIController.show();
    this._BoardController = boardController;
    this._BoardController.showPoints();
    this._BoardController.show();

    this._UIController.sortEventsListener((evt)=>{
      this.sortEvents(evt);
    });

    this._UIController.filterEventsListener((evt)=>{
      this.filterEvents(evt);
    });
  }

  filterEvents(evt) {
    const target = evt.target.id;
    const currentDate = moment();
    const futureEvents = [];
    const pastEvents = [];

    this._sortedUserData.map((it) => {
      const compareDate = currentDate < moment(it.date_from);
      if (compareDate) {
        futureEvents.push(it);
      } else if (currentDate > moment(it.date_from)) {
        pastEvents.push(it);
      }
    });

    switch (target) {
      case `filter-Future`:
        this._BoardController.showPoints(futureEvents);
        return;
      case `filter-Everything`:
        this._BoardController.showPoints(this._userData[0]);
        return;
      case `filter-Past`:
        this._BoardController.showPoints(pastEvents);
        return;
    }
  }

  sortEvents(evt) {
    if (evt.target.className === `trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase `) {
      const sortType = evt.target.getAttribute(`data-sort-type`);
      switch (sortType) {
        case `price` :
          const sortedEvents = this._sortedUserData.sort((a, b) => b.base_price - a.base_price);
          this._BoardController.showPoints(sortedEvents);
          return;

        case `time`:
          const sortedTime = this._sortedUserData.sort((a, b) => {
            let firstDate = moment(a.date_from).unix();
            let secondDate = moment(b.date_from).unix();
            return secondDate - firstDate;
          });
          this._BoardController.showPoints(sortedTime);
          return;

        case `event`:
          this._BoardController.showPoints(this._userData[0]);
          return;
      }


      this._BoardController.showPoints();
    }
  }
}
