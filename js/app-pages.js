let apps = [];

/*
  TODO: make a communcation socket between app and the software
*/

function showAllAppDock() {
  let allAppsElementIsVisible = $("#all-apps-container").hasClass(
    "all-apps-visible"
  );

  if (allAppsElementIsVisible) {
    $("#all-apps-container").removeClass("all-apps-visible");
    $("#all-apps").empty();
    return;
  }

  $("#all-apps-container").addClass("all-apps-visible");
  loadAllApps();
}

function loadAllApps() {
  apps.forEach(async (page) => {
    const html = DomDefaults.appIconWithNameLabel(page);
    DomWorker.init("all-apps").mount(html);
  });
}

function sendDataToApp(app, data) {
  appElement = DomWorkerUtils.elementExistsOnDom(app, false);
  if (!appElement) return;

  DomWorkerUtils.waitForElm(app).then(() => {
    appElement.contentWindow.postMessage(
      { target: app, content: "test123" },
      "*"
    );
  });
}

async function openApp(app, dataRequest = false, content = "") {
  await new CreateWindow({
    title: app,
    icon: `apps/${app}/app-icon.svg`,
  })
    .application()
    .then((e) => e.initWindow());

  if (dataRequest) sendDataToApp(app, dataRequest);
}

function openDialog(params = null) {
  new CreateWindow({
    title: "Dialog",
  })
    .dialog("openAppDialog")
    .initWindow();
}
