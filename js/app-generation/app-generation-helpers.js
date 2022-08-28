class AppGeneration {
  cssFiles = [];
  jsFiles = [];
  indexFile;

  getBlobURL(code, type) {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
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
  generateBlobFiles(appFiles, app) {
    appFiles.forEach(async (file) => {
      let blobURL;

      if (file.fileType == "css") {
        blobURL = this.getBlobURL(file.fileContent, "text/css");
        this.cssFiles.push({ fileContent: file.fileContent, fileURL: blobURL });
      }
      if (file.fileType == "js") {
        blobURL = this.getBlobURL(file.fileContent, "text/javascript");
        this.jsFiles.push({ fileContent: file.fileContent, fileURL: blobURL });
      }
      if (file.fileType == "html")
        this.indexFile = this.replaceImages(file.fileContent, app);
    });
  }
  computeHtmlHead(OSClass) {
    let headPart = `<script src="${OSClass}"></script>`;

    this.cssFiles.forEach(
      (file) =>
        (headPart += `<link rel="stylesheet" type="text/css" href="${file.fileURL}" />`)
    );
    this.jsFiles.forEach(
      (file) => (headPart += `<script src="${file.fileURL}"></script>`)
    );

    return headPart;
  }
  generateFinalApp(headPart, app) {
    const source = `
      <html>
        <head>
          <script src="https://thijmenbrand.nl/website/desktop-website/js/app-pages.js"></script>
          <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
          ${headPart}
        </head>
        <body style="margin: 0;">
          ${this.indexFile || ""}
        </body>
      </html>
    `;

    let iframe = `<iframe id='iframe-${app}' class='app-iframe' src='${this.getBlobURL(
      source,
      "text/html"
    )}'></iframe>`;

    return iframe;
  }
}
