import { windows } from "../app-regestry/window/app-window.js";
import Core from "./core.js";
import Utils from "../utils/utils.js";

class Kernel {
  constructor() {
    this.#listenToCommunication();
  }
  #listenToCommunication() {
    window.onmessage = (event) => {
      if (event.origin != "https://thijmenbrand.nl")
        throw new Error("Origin is not trusted!");
      let senderApp = event.path[0].document.activeElement.id;

      if (!windows.find((win) => win.title === senderApp)) return;

      this.#processMethod(event.data.method, event.data.params, senderApp);
    };
  }

  #processMethod(method, params, targetApp) {
    let core = new Core();

    switch (method) {
      //File stuff
      case "testCommand":
        this.#sendDataToApp(targetApp, "test123", "system");
        break;
      case "filesInDir":
        core.fileSystem
          .showFilesInDir(params)
          .then((res) => this.#sendDataToApp(targetApp, res, "system"));
        break;
      case "openFile":
        core.fileSystem
          .openFile(params)
          .then((res) => this.#sendDataToApp(targetApp, res, "system"));
        break;

      //App stuff
      case "openApp":
        core.appRegistry
          .application(params)
          .then((e) => e.initWindow())
          .finally(() => this.#sendDataToApp(targetApp, true, "system"));
        break;
      case "sendDataToApp":
        this.#sendDataToApp(params.target, params.data, targetApp);
    }
  }

  async #sendDataToApp(app, data, sender) {
    if (!sender || !app) throw new Error("No app or sender specified!");
    let content = {
      sender: sender,
      return: data,
    };

    Utils.waitForElm(app).then((res) => {
      setTimeout(() => res.contentWindow.postMessage(content, "*"), 200);
    });
  }
}

export default Kernel;
