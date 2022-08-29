let apps = [];

/*
  TODO: make a communcation socket between app and the software
*/
function openAppRequest([requestingApp, appToOpen]) {
  $("#main-application-container").append(
    DomDefaults.openAppPopup(requestingApp, appToOpen)
  );
}

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
    const html = `
      <span class='app-name-combination' onclick='openApp("${page}");showAllAppDock()'>
        <object class='app app-in-all-apps' data="./apps/${page}/app-icon.svg" type="image/png">
          <img class='app' src='./assets/default-app-icon.svg' onclick='openApp("${page}")'>
        </object>
        <p>${page}</p>
      </span>`;

    $("#all-apps").append(html);
  });
}

async function openApp(app) {
  new CreateWindow({
    title: app,
    icon: `apps/${app}/app-icon.svg`,
  }).createApplication();
}
