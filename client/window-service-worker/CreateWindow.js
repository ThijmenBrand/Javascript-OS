class CreateWindow {
  constructor(attrs) {
    this.attrs = attrs;
  }

  windowContent = null;
  windowOptions = null;

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

  async application() {
    let appFiles = await Utils.discoverAppFiles(this.attrs.title);

    let utils = new WindowUtils(this.attrs.title, appFiles, {
      height: this.AppDefaultOptions.width,
      width: this.AppDefaultOptions.width,
    });
    this.windowContent = utils.init();

    this.windowOptions = this.AppDefaultOptions;

    return this;
  }
  dialog(dialogType) {
    this.windowContent = this.dialogTypes[dialogType];
    this.windowOptions = this.DialogDefaultOptions;

    return this;
  }

  async initWindow() {
    let window = new AppWindow({
      title: this.attrs.title,
      options: {
        icon: this.attrs.icon,
        height: this.windowOptions.height,
        width: this.windowOptions.width,
        type: this.windowOptions.type,
      },
    });
    window.init();
    window.render(this.windowContent);

    let windowBehaviour = new WindowBehaviour();
    windowBehaviour.init(window);
  }
}
