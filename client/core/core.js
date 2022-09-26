import CreateWindow from "../app-regestry/window/app-window-creation.js";
import FileSystem from "./file-system.js";
import RootUtils from "./root-utils.js";
import Settings from "./settings.js";

class Core {
  constructor() {
    this.fileSystem = new FileSystem();
    this.appRegistry = new CreateWindow();
    this.settings = new Settings();
    this.rootUtils = new RootUtils();
  }
}

export default Core;
