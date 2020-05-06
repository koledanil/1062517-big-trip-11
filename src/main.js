// MA 11 Имопртируем данные
// ==== MA 12 Имопртируем подписи для интерфейса и данные сервера
import {interfaceSettings} from "./const.js";
import {demoItem1} from "./mock/item-demo__with-points.js";
// import {demoItem1} from "./mock/item-demo__wo-points.js"; <--- раскоментировать чтобы увидеть заглушку когда нет точек

// ==== MA 16 Импортируем контроллер
import BoardController from "./components/controllers/board.js";
import UIController from "./components/controllers/interface.js";
import MainController from "./components/controllers/main.js";


const UIdata = [interfaceSettings.filterlist, // имена фильтров
  interfaceSettings.defaultParametrs.FILTER_SELECTED_BY_DEFAULT, // имена фильтров выбранные по умолчанию
  interfaceSettings.menulist, // названия пунктов меню
  interfaceSettings.defaultParametrs.MENU_SELECTED_BY_DEFAULT, // пункт меню по умолчанию
  interfaceSettings.sortlist, // названия сортировок
  interfaceSettings.defaultParametrs.SORT_SELECTED_BY_DEFAULT, // сортировка по умолчанию
  demoItem1.points, // кусок данных с сервера, который отвечает за точки пользователя
  interfaceSettings.defaultParametrs.WELCOME_MSG_EMPTY_SCREEN];

const UserData = [demoItem1.points, demoItem1.offers, demoItem1.destination];

const ui = new UIController(...UIdata);
const board = new BoardController(...UserData);


new MainController(ui, board, UIdata, UserData);
