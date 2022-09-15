class Utils {
  static createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    return div.firstChild;
  }
  static getBlobURL(code, type) {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  }
  static async discoverAppFiles(app) {
    let test = await $.post("./php/discoverAppFiles.php", {
      filePath: `../apps/${app}/src`,
    });
    return JSON.parse(test);
  }
  static updateTime() {
    let currentDate = new Date();
    let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
    $("#current-date-time").text(
      currentDate.toDateString() + " " + currentTime
    );
  }
  static async genericFunction(method, params) {
    window.eval.call(window, method)(params);
  }
  static generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  static async getAppProperties(appLocation) {
    let appCode = await fetch(appLocation).then((res) => res.text());
    let tmp = document.createElement("html");
    tmp.innerHTML = appCode;

    let appTitle = tmp.querySelector("meta[name='title']").content;
    let appIcon = tmp.querySelector("meta[name='icon']").content;

    return [appTitle, appIcon];
  }
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

export default Utils;
