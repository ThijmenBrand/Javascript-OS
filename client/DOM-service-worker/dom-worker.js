class DomWorkerUtils {
  static elementExistsOnDom(element) {
    let elementExists = element;

    typeof element == "string" &&
      (elementExists = document.getElementById(element));

    if (!elementExists) throw new Error("provided element does not exist");

    return elementExists;
  }
}

class DomWorker {
  domElement;

  constructor() {
    this.domElement = "";
  }

  init(element) {
    this.domElement = DomWorkerUtils.elementExistsOnDom(element);

    return this;
  }

  mount(content) {
    this.domElement.innerHTML += content;
  }

  destroy() {
    this.domElement.remove();
  }
}
