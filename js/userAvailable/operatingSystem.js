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
    openApplication: (args) => {
      this.#message = {
        method: "Communication.openAppRequest",
        params: args,
      };
      this.#send();
    },
    sendToApplication: (args) => {
      this.#message = {
        method: "Communication.sendToApplication",
        params: args,
      };
      this.#send();
    },
    showFilesInDir: (dir) => {
      this.#message = {
        method: "Communication.showFilesInDir",
        params: dir,
      };
      this.#send();
    },
    openFile: (dir) => {
      this.#message = {
        method: "Communication.openFile",
        params: dir,
      };
      this.#send();
    },
  };
}
