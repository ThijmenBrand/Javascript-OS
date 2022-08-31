class WindowRegister {
  static async openApp(app, dataRequest = false, content = "") {
    await new CreateWindow({
      title: app,
      icon: `apps/${app}/app-icon.svg`,
    })
      .application()
      .then((e) => e.initWindow());

    if (dataRequest) sendDataToApp(app, dataRequest);
  }

  static openDialog(params = null) {
    new CreateWindow({
      title: "Dialog",
    })
      .dialog("openAppDialog")
      .initWindow();
  }
}
