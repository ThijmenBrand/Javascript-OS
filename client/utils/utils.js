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
}
