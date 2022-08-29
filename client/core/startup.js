class Startup {
  constructor(options) {
    this.apps = [];
    this.dockApps = options.dockApps;
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
