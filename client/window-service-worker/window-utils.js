class WindowUtils {
  constructor(app, appFiles) {
    this.appBundle = {
      css: [],
      js: [],
      indexFile: "",
    };
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
        this.appBundle.css.push({
          fileContent: file.fileContent,
          fileURL: blobURL,
        });
      }
      if (file.fileType == "js") {
        this.appBundle.js.push({
          fileContent: file.fileContent,
          fileURL: blobURL,
        });
      }
      if (file.fileType == "html")
        this.appBundle.indexFile = this.replaceImages(
          file.fileContent,
          this.app
        );
    });
  }
  computeHtmlHead() {
    let headPart = `<script src="${this.operatingSystemClass}"></script>`;

    this.appBundle.css.forEach(
      (file) =>
        (headPart += `<link rel="stylesheet" type="text/css" href="${file.fileURL}" />`)
    );
    this.appBundle.js.forEach(
      (file) => (headPart += `<script src="${file.fileURL}"></script>`)
    );

    return headPart;
  }
  generateFinalApp(headPart, app) {
    const source = `
              <html>
                <head>
                  <script src="https://thijmenbrand.nl/website/desktop-website/js/userAvailable/operatingSystem.js"></script>
                  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
                  ${headPart}
                </head>
                <body style="margin: 0;">
                  ${this.appBundle.indexFile || ""}
                </body>
              </html>
            `;

    let iframe = `<iframe id='${app}' class='app-iframe' src='${Utils.getBlobURL(
      source,
      "text/html"
    )}'></iframe>`;

    return iframe;
  }
}
