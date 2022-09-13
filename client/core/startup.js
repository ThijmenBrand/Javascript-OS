import Utils from "../utils/utils.js";
import CommunicationSocket from "./socket.js";

class Startup {
  constructor(options) {
    this.apps = [];
    this.dockApps = options.dockApps;
  }

  initOperatingSystem() {
    new CommunicationSocket();
    Utils.updateTime();

    onresize = (event) => {
      let pageWidth = window.innerWidth;
      $("#display-too-small").css(
        "display",
        pageWidth >= 1000 ? "none" : "block"
      );
    };
    setInterval(() => {
      Utils.updateTime();
    }, 1000);
  }
}

export default Startup;
