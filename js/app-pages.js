class Utils {
  getBlobURL(code, type) {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  }
}

//Global var to hold all apps
let utils = new Utils();
let apps = [];
let OSClass;

function initApps(apps) {
  apps.forEach(async (page) => {
    $("#normal-apps").append(
      `<div class='app' onclick='openApp("${page}")'>${page}</div>`
    );
  });

  fetch("./js/operatingSystem.js")
    .then((res) => res.text())
    .then((data) => (OSClass = utils.getBlobURL(data, "text/javascript")));
}

async function getAllApps() {
  $.ajax({
    url: "./php/getAppDefaultAppDirectories.php",
    success: (result) => {
      result = JSON.parse(result);
      Array.from(result).forEach((val) => apps.push(val.split("//")[1]));

      initApps(apps);
    },
  });
}

function replaceImages(html, app) {
  let el = document.createElement("div");
  el.innerHTML = html;

  let images = el.getElementsByTagName("img");
  Array.from(images).forEach((image) => {
    image.src = image.src.slice(0, 48) + `apps/${app}/` + image.src.slice(48);
  });

  return el.innerHTML;
}

async function openApp(app) {
  let appFiles = [];

  let cssFiles = [];
  let jsFiles = [];
  let indexFile;

  await $.post(
    "./php/discoverAppFiles.php",
    {
      filePath: `../apps/${app}`,
    },
    (data) => (appFiles = JSON.parse(data))
  );

  appFiles.forEach(async (file) => {
    let blobURL;

    if (file.fileType == "css") {
      blobURL = utils.getBlobURL(file.fileContent, "text/css");
      cssFiles.push({ fileContent: file.fileContent, fileURL: blobURL });
    }
    if (file.fileType == "js") {
      blobURL = utils.getBlobURL(file.fileContent, "text/javascript");
      jsFiles.push({ fileContent: file.fileContent, fileURL: blobURL });
    }
    if (file.fileType == "html")
      indexFile = replaceImages(file.fileContent, app);
  });

  let headPart = `<script src="${OSClass}"></script>`;

  cssFiles.forEach(
    (file) =>
      (headPart += `<link rel="stylesheet" type="text/css" href="${file.fileURL}" />`)
  );
  jsFiles.forEach(
    (file) => (headPart += `<script src="${file.fileURL}"></script>`)
  );

  const source = `
    <html>
      <head>
        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
        ${headPart}
      </head>
      <body style="margin: 0;">
        ${indexFile || ""}
      </body>
    </html>
  `;

  let iframe = `<iframe class='app-iframe' src='${utils.getBlobURL(
    source,
    "text/html"
  )}'></iframe>`;

  await fetch("./statics/standard-items/app-container.html")
    .then((res) => res.text())
    .then((txt) => {
      txt = txt
        .replace(/app-content-placeholder/g, iframe)
        .replace(/app-placeholder/g, app);

      $("#main-application-container").append(txt);
    });
}

function closeApp(app) {
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
