import Startup from "../client/core/startup.js";
import FileIcon from "../client/app-regestry/file-icon/file-icon.js";

const options = {};
// AppBuilder.BuildApp("userFiles/C/Program-files/app-compiler/app-compiler.html");

let startup = new Startup(options);
startup.initOperatingSystem();

showFilesOnDesktop();

async function showFilesOnDesktop() {
  Communication.showFilesInDir("D/desktop").then((res) => {
    Array.from(res).forEach((file) => {
      new FileIcon(file.filePath.split("../").at(-1));
    });
  });

  // desktopFiles.foreach((file) => {
  //   new FileIcon(file.filePath);
  // });
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
