import WindowBehaviour from "./app-window-behaviour.js";
import AppWindow from "./app-window.js";
import DomDefaults from "../../static/dom-defaults.js";
import Utils from "../../utils/utils.js";

class CreateWindow {
  windowContent = null;
  windowOptions = null;
  metaData = null;

  AppDefaultOptions = {
    height: 400,
    width: 700,
    type: "application",
  };
  DialogDefaultOptions = {
    height: 100,
    width: 200,
    type: "dialog",
  };

  dialogTypes = {
    openAppDialog: DomDefaults.openAppDialog("test"),
  };

  async application(appData) {
    /* 
      You can provide an app instance or an config file url
      In practice you would nearly always 

    */

    if (typeof appData == "string") {
      this.fileLocation = appData;
      [this.title, this.iconLocation] = await Utils.getAppProperties(appData);
    } else {
      this.title = appData.title;
      this.iconLocation = appData.iconLocation;
      this.fileLocation = appData.fileLocation;
    }

    this.windowOptions = this.AppDefaultOptions;
    this.windowContent = `<iframe id='${this.title}' class='app-iframe' style="height: ${this.windowOptions.height}px; width: ${this.windowOptions.width}px;" src='${this.fileLocation}'></iframe>`;

    return this;
  }
  dialog(dialogType) {
    this.windowContent = this.dialogTypes[dialogType];
    this.windowOptions = this.DialogDefaultOptions;

    return this;
  }

  async initWindow() {
    let window = new AppWindow({
      title: this.title,
      iconLocation: this.iconLocation,
      height: this.windowOptions.height,
      width: this.windowOptions.width,
      type: this.windowOptions.type,
    });
    window.initTemplate();
    window.render(this.windowContent);

    let windowBehaviour = new WindowBehaviour();
    windowBehaviour.init(window);
  }
}

export default CreateWindow;
