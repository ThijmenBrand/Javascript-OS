import CreateWindow from "../app-regestry/window/app-window-creation.js";
import FileSystem from "./file-system.js";

class Core {
  constructor() {
    this.fileSystem = new FileSystem();
    this.appRegistry = new CreateWindow();
  }
}

export default Core;
