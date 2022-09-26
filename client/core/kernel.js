import { windows } from "../app-regestry/window/app-window.js";
import Core from "./core.js";
import Utils from "../utils/utils.js";

let events = [];

class Kernel {
  constructor() {
    this.#listenToCommunication();
  }
  #listenToCommunication() {
    window.onmessage = (event) => {
      if (event.origin != "https://thijmenbrand.nl")
        throw new Error("Origin is not trusted!");
      let senderApp = event.data.origin;

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

      //Settings
      case "changeBackground":
        core.settings.setApplicationBackground(params);
        break;

      //App stuff
      case "openApp":
        core.appRegistry
          .application(params)
          .then((e) => e.initWindow())
          .finally(() => this.#sendDataToApp(targetApp, true, "system"));
        break;
      case "selectFile":
        core.appRegistry
          .application("userFiles/D/desktop/file-explorer.thijm")
          .then((e) => e.initWindow())
          .finally(() =>
            this.#sendDataToApp("Explorer", "selectFile", targetApp)
          );
        break;
      case "sendData":
        this.#sendDataToApp(params.target, params.data, targetApp);
        break;
      case "closeSelf":
        core.rootUtils.closeWindow(targetApp);
        break;
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
