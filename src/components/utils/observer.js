export default class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(item) {
    this.observers.push(item);
  }

  unsubscribw(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast() {
    this.observers.forEach((element) => {
      element.sayHello();
    });
  }

}
