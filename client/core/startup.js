const registeredApps = [
  {
    title: "file explorer",
    iconLocation: "userFiles/C/Program-files/file-explorer/file-explorer.svg",
    ExecuteLocation:
      "userFiles/C/Program-files/file-explorer/file-explorer.html",
    type: "app",
  },
  {
    title: "app compiler",
    iconLocation:
      "userFiles/C/Program-files/app-compiler/app-compiler-icon.svg",
    ExecuteLocation: "userFiles/C/Program-files/app-compiler/app-compiler.html",
    type: "app",
  },
];

class Startup {
  constructor(options) {
    this.apps = [];
    this.dockApps = options.dockApps;
  }

  initOperatingSystem() {
    CommunicationSocket.listenToCommunication();
    this.initIcons();
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

  initIcons() {
    registeredApps.forEach(async (app) => {
      new IconBehaviour(new AppIcon(app));
    });
  }
}
