getDirs();

const preventReload = "reload";

function getDirs(filePath = "") {
  $("#main-files").empty();

  operatingSystem.showFilesInDIR(filePath).then((res) => {
    if (!res.length) {
      $("#main-files").html("<p>this dir is empty</p>");
      return;
    }
    res.forEach((element) => {
      $("#main-files").append(
        `<p onclick='openFileOrDir("${element.filePath}", "${
          element.fileType
        }")'>${element.filePath.split("/").at(-1)}</p>`
      );
    });
  });
}

function openFileOrDir(filePath = "", fileType = "") {
  if (fileType == "dir") {
    getDirs(filePath);
    return;
  }

  window.top.postMessage("browser", "*");
}
