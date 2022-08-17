class operatingSystem {
  static baseFilePath = "https://www.thijmenbrand.nl/website/desktop-website/";
  static async showFilesInDIR(dir) {
    return await $.post(
      this.baseFilePath + "php/showUserFiles.php",
      { filePath: dir },
      (res) => JSON.parse(res)
    );
  }
  static async openUserFile(path) {
    return await $.post(
      this.baseFilePath + "php/openUserFile.php",
      { filePath: path },
      (res) => JSON.parse(res)
    );
  }
}
