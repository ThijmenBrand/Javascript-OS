class operatingSystem {
  //CommunicationSocket
  static #app() {
    let scripts = document
      .getElementById("os-script")
      .getAttribute("data-app-script");

    return scripts;
  }
  static listeningImplementation(callback) {
    window.onmessage = (e) => {
      if (e.data.target != this.#app()) return;
      callback(e.data.content);
    };
  }
  static #message = {
    method: null,
    params: null,
  };
  static #send() {
    window.top.postMessage(this.#message, "https://thijmenbrand.nl");
  }
  static call = {
    openDialog: () => {
      this.#message = {
        method: "openDialog",
        params: "",
      };
      this.#send();
    },
    openApplication: (targetApplication) => {
      this.#message = {
        method: "openApp",
        params: targetApplication,
      };
      this.#send();
    },
  };
  //File things
  static #baseFilePath =
    "https://www.thijmenbrand.nl/website/desktop-website/php/index.php/";
  static async showFilesInDIR(dir = "") {
    let targetDir = "../userFiles/" + dir;
    return await $.get(
      this.#baseFilePath + `filesystem/showUserFiles?dir=${targetDir}`,
      (res) => res
    );
  }
  static async openUserFile(dir) {
    return await $.get(
      this.#baseFilePath + `filesystem/openFile?dir=${dir}`,
      (res) => res
    );
  }
}
