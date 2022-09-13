class Communication {
  //File system
  static async showFilesInDir(path = "") {
    let targetDir = "../userFiles/" + path;
    let result = await $.get(
      `https://www.thijmenbrand.nl/website/desktop-website/php/index.php/filesystem/showUserFiles?dir=${targetDir}`,
      (res) => res
    );

    return result;
  }
  static async openFile(args) {
    let targetDir = "../userFiles/" + args.params;
    let result = await $.get(
      `https://www.thijmenbrand.nl/website/desktop-website/php/index.php/filesystem/openFile?dir=${targetDir}`,
      (res) => res
    );

    CommunicationSocket.sendDataToApp(args.requestingApp, result, "system");
  }

  //App stuff
  static openAppRequest(args) {
    let targetApp = args.params.targetApp;

    let targetAppFound = registeredApps.find((app) => app.title === targetApp);

    if (!targetAppFound) throw new Error("app not found");

    new CreateWindow().application(targetAppFound).initWindow();
  }
  static sendToApplication(args) {
    let targetApp = args.params.targetApp;
    let message = args.params.message || null;

    let targetAppFound = registeredApps.find((app) => app.title === targetApp);

    if (!targetAppFound) throw new Error("app not found");

    CommunicationSocket.sendDataToApp(
      targetAppFound.title,
      message,
      args.requestingApp
    );
  }
}
