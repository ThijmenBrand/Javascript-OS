class CreateWindow {
  constructor(attrs) {
    this.attrs = attrs;
  }

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

  async createApplication() {
    let appFiles = await Utils.discoverAppFiles(this.attrs.title);

    let utils = new WindowUtils(this.attrs.title, appFiles);
    let iframe = utils.init();

    this.initWindow(iframe, this.AppDefaultOptions);
  }
  createDialog() {
    let html = "<h1>test123</h1>";

    this.initWindow(html, this.DialogDefaultOptions);
  }

  initWindow(windowContent, windowOptions) {
    let window = new AppWindow({
      title: this.attrs.title,
      options: {
        icon: this.attrs.icon,
        height: windowOptions.height,
        width: windowOptions.width,
        type: windowOptions.type,
      },
    });
    window.init();
    window.render(windowContent);

    let windowBehaviour = new WindowBehaviour();
    windowBehaviour.init(window);
  }
}
