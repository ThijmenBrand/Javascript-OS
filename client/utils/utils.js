class Utils {
  static createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }
  static getBlobURL(code, type) {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  }
  static async discoverAppFiles(app) {
    let test = await $.post("./php/discoverAppFiles.php", {
      filePath: `../apps/${app}/src`,
    });
    return JSON.parse(test);
  }
}
