class DomWorkerUtils {
  static elementExistsOnDom(element, throwErr = true) {
    let elementExists = element;

    typeof element == "string" &&
      (elementExists = document.getElementById(element));

    if (!elementExists && throwErr)
      throw new Error("provided element does not exist");

    return elementExists;
  }
  static waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.getElementById(selector)) {
        return resolve(document.getElementById(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.getElementById(selector)) {
          resolve(document.getElementById(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }
}

class DomWorker {
  domElement;

  constructor() {
    this.domElement = "";
  }

  static init(element) {
    this.domElement = DomWorkerUtils.elementExistsOnDom(element);

    return this;
  }

  static mount(content) {
    this.domElement.innerHTML += content;
  }

  static destroy() {
    this.domElement.remove();
  }
}
