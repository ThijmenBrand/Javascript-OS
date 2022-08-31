class WindowUtils {
  constructor(app, appFiles, dims) {
    this.appBundle = {
      css: [],
      js: [],
      indexFile: "",
    };
    this.dims = dims;
    this.appFiles = appFiles;
    this.app = app;
    this.operatingSystemClass = coreVars.userAvailableOperatingSystemClass;
  }

  fileTypes = {
    css: "text/css",
    js: "text/javascript",
  };

  init() {
    this.generateBlobFiles();
    let headPart = this.computeHtmlHead();
    return this.generateFinalApp(headPart, this.app);
  }
  replaceImages(html, app) {
    let el = document.createElement("div");
    el.innerHTML = html;

    let images = el.getElementsByTagName("img");
    Array.from(images).forEach((image) => {
      image.src =
        image.src.slice(0, 48) + `apps/${app}/src/` + image.src.slice(48);
    });

    return el.innerHTML;
  }
  generateBlobFiles() {
    this.appFiles.forEach(async (file) => {
      let blobURL = Utils.getBlobURL(
        file.fileContent,
        this.fileTypes[file.fileType]
      );

      if (file.fileType == "css") {
        this.appBundle.css.push(blobURL);
      }
      if (file.fileType == "js") {
        this.appBundle.js.push(blobURL);
      }
      if (file.fileType == "html")
        this.appBundle.indexFile = this.replaceImages(
          file.fileContent,
          this.app
        );
    });
  }
  computeHtmlHead() {
    let headPart = `<script data-app-script="${this.app}" id="os-script" src="${this.operatingSystemClass}"></script>`;

    this.appBundle.css.forEach(
      (file) =>
        (headPart += `<link rel="stylesheet" type="text/css" href="${file}" />`)
    );
    this.appBundle.js.forEach(
      (file) => (headPart += `<script src="${file}"></script>`)
    );

    return headPart;
  }
  generateFinalApp(headPart, app) {
    const source = `
              <html>
                <head>
                  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
                  ${headPart}
                </head>
                <body style="margin: 0;">
                  ${this.appBundle.indexFile || ""}
                </body>
              </html>
            `;

    let iframe = `<iframe id='${app}' class='app-iframe' style="height: ${
      this.dims.height
    }px; width: ${this.dims.width}px;" src='${Utils.getBlobURL(
      source,
      "text/html"
    )}'></iframe>`;

    return iframe;
  }
}
