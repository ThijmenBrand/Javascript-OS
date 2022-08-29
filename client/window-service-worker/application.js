/*
    TODO: basis config maken voor een app wanneer er geen config file. Als die er wel is die toepassen
*/
class Application {
  constructor(options) {
    this.attrs = {
      title: options.title,
      icon: options.icon,
    };
    this.type = "Application";
    this.application = this.createApplication();
  }
  async createApplication() {
    let appFiles = await this.discoverAppFiles();

    let utils = new WindowUtils(this.attrs.title, appFiles);
    let iframe = utils.init();

    let window = new AppWindow({
      title: this.attrs.title,
      options: { icon: this.attrs.icon, height: 400, width: 700, type: "app" },
    });
    window.init();
    window.render(iframe);

    let windowBehaviour = new WindowBehaviour();
    windowBehaviour.init(window);
  }
}
