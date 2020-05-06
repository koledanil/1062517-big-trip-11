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

    this._UIController.sortPointsListener((evt)=>{
      this.sortEvents(evt);
    });
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
            // const ys = dateA - dateB;
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
