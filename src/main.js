// MA 11 Имопртируем данные
// ==== MA 12 Имопртируем подписи для интерфейса и данные сервера
import {interfaceSettings} from "./const.js";
import {demoItem1} from "./mock/item-demo.js";

// ==== MA 16 Импортируем контроллер
import BoardController from "./components/controllers/board.js";
import UIController from "./components/controllers/interface.js";

new UIController(interfaceSettings.filterlist, // имена фильтров
    interfaceSettings.defaultParametrs.FILTER_SELECTED_BY_DEFAULT, // имена фильтров выбранные по умолчанию
    interfaceSettings.menulist, // названия пунктов меню
    interfaceSettings.defaultParametrs.MENU_SELECTED_BY_DEFAULT, // пункт меню по умолчанию
    interfaceSettings.sortlist, // названия сортировок
    interfaceSettings.defaultParametrs.SORT_SELECTED_BY_DEFAULT, // сортировка по умолчанию
    demoItem1.points, // кусок данных с сервера, который отвечает за точки пользователя
    interfaceSettings.defaultParametrs.WELCOME_MSG_EMPTY_SCREEN).show(); // сообщение по умолчанию если точек нет

new BoardController(demoItem1.points, demoItem1.offers, demoItem1.destination).show();


