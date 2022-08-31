/*
    TODO: basis config maken voor een app wanneer er geen config file. Als die er wel is die toepassen
*/
class Application {
  constructor(options) {
    this.attrs = {
      title: options.title,
      icon: options.icon,
      height: options.height || 400,
      width: options.width || 700,
    };
    this.type = "Application";
    this.application = this.createApplication();
  }
  async createApplication() {
    let appFiles = await this.discoverAppFiles();

    let utils = new WindowUtils(this.attrs.title, appFiles, "test123");
    let iframe = utils.init();

    let window = new AppWindow({
      title: this.attrs.title,
      options: {
        icon: this.attrs.icon,
        height: this.attrs.height,
        width: this.attrs.width,
        type: "app",
      },
    });
    window.init();
    window.render(iframe);

    let windowBehaviour = new WindowBehaviour();
    windowBehaviour.init(window);
  }
}
