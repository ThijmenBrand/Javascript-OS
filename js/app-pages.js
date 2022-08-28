let appGeneration = new AppGeneration();
let apps = [];
let dockApps = ["vsCode", "browser", "file-explorer"];
let OSClass;

function openAppRequest([requestingApp, appToOpen]) {
  const html = `
    <div class="software-popup">
      <p>${requestingApp} wants to open ${appToOpen}</p>
      <p>Do you want to allow this?</p>
      <span>
        <button>Open ${appToOpen}</button>
        <button>Decline</button>
      </span>
    </div>`;

  $("#main-application-container").append(html);
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

function initApps() {
  dockApps.forEach(async (page) => {
    const html = `
      <object class='app' data="./apps/${page}/app-icon.svg" type="image/png" onclick='openApp("${page}")'>
        <img class='app' src='./assets/default-app-icon.svg' onclick='openApp("${page}")'>
      </object>`;

    $("#normal-apps").append(html);
  });

  fetch("./js/userAvailable/operatingSystem.js")
    .then((res) => res.text())
    .then(
      (data) => (OSClass = appGeneration.getBlobURL(data, "text/javascript"))
    );
}

async function getAllApps() {
  $.get("./php/getAppDefaultAppDirectories.php", (result) => {
    result = JSON.parse(result);

    Array.from(result).forEach((val) => apps.push(val.split("//")[1]));

    initApps(apps);
  });
}

async function openApp(app) {
  if ($(`#${app}`).length) return;

  let appFiles = [];

  await $.post(
    "./php/discoverAppFiles.php",
    {
      filePath: `../apps/${app}/src`,
    },
    (data) => (appFiles = JSON.parse(data))
  );

  appGeneration.generateBlobFiles(appFiles, app);
  let headPart = appGeneration.computeHtmlHead(OSClass);
  let iframe = appGeneration.generateFinalApp(headPart, app);

  await fetch("./statics/standard-items/app-container.html")
    .then((res) => res.text())
    .then((txt) => {
      txt = txt
        .replace(/app-content-placeholder/g, iframe)
        .replace(/app-placeholder/g, app);

      $("#main-application-container").append(txt);
    });

  console.clear();
}

function closeApp(app) {
  $(`#${app}`).empty();
  $(`#${app}`).remove();
  $(`#init-${app}`).remove();
  $(`#init-two-${app}`).remove();
}

function appFullScreen(app) {
  $(`#${app}`).css({
    width: "100%",
    height: "100%",
    left: "0",
    top: "0",
    "z-index": "100",
    "border-radius": "0px",
  });
  $(`#${app}-app-top-header`).css({
    "margin-top": "0px",
    "border-radius": "0px",
  });
  $(".top-nav-bar").css({ "z-index": "0" });
  $(".app-dock").css({ "z-index": "0" });
}

function appSmallScreen(app) {
  $(`#${app}`).css({
    width: "",
    height: "",
    left: "",
    top: "",
    "z-index": "40",
    "border-radius": "",
  });
  $(`#${app}-app-top-header`).css({
    "margin-top": "-25px",
    "border-radius": "10px 10px 0px 0px",
  });
  $(".top-nav-bar").css({ "z-index": "50" });
  $(".app-dock").css({ "z-index": "50" });
}

function placeElementOnTop(element) {
  const index = apps.findIndex((x) => x == element);
  const splicedElement = apps.splice(index, 1);
  let zIndex = 40;

  apps.splice(0, 0, ...splicedElement);
  apps.forEach((item) => {
    $(`#${item}`).css("z-index", zIndex);
    zIndex -= 10;
  });

  $("#current-app").text(element);
}
