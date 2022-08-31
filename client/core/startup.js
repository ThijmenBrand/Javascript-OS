class Startup {
  constructor(options) {
    this.apps = [];
    this.dockApps = options.dockApps;
  }

  initOperatingSystem() {
    CommunicationSocket.listenToCommunication();
    this.getAllApps();
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

  getAllApps() {
    $.get("./php/getAppDefaultAppDirectories.php", (result) => {
      result = JSON.parse(result);

      Array.from(result).forEach((val) => apps.push(val.split("//")[1]));

      this.initApps();
    });
  }
  initApps() {
    this.dockApps.forEach(async (app) => {
      const html = DomDefaults.appIcon(app);

      $("#normal-apps").append(html);
    });
  }
}
