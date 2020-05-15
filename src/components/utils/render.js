

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

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};


// U5 Замена элемента на другой элемент
export const replace = (parent, newElement, oldElement) => {
  const isExistElements = !!(parent && newElement && oldElement);


  if (isExistElements && parent.contains(oldElement)) {
    parent.parentNode.replaceChild(newElement, oldElement);
  }

};
// U5 End
