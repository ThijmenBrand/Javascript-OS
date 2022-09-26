import { windows } from "../app-regestry/window/app-window.js";

class RootUtils {
  closeWindow(targetWindow) {
    let targetWin = windows.find((window) => window.title == targetWindow);

    targetWin.destroy();
  }
}

export default RootUtils;
