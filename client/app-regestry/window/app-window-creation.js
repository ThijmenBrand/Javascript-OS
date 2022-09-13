import WindowBehaviour from "./app-window-behaviour.js";
import AppWindow from "./app-window.js";
import DomDefaults from "../../dom/dom-defaults.js";

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
    this.metaData = appData;
    this.windowOptions = this.AppDefaultOptions;
    this.windowContent = `<iframe id='${appData.title}' class='app-iframe' style="height: ${this.windowOptions.height}px; width: ${this.windowOptions.width}px;" src='${appData.ExecuteLocation}'></iframe>`;

    return this;
  }
  dialog(dialogType) {
    this.windowContent = this.dialogTypes[dialogType];
    this.windowOptions = this.DialogDefaultOptions;

    return this;
  }

  async initWindow() {
    let window = new AppWindow({
      title: this.metaData.title,
      iconLocation: this.metaData.iconLocation,
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
