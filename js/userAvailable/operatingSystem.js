class operatingSystem {
  //File things
  static baseFilePath =
    "https://www.thijmenbrand.nl/website/desktop-website/php/index.php/";
  static async showFilesInDIR(dir = "") {
    let targetDir = "../userFiles/" + dir;
    return await $.get(
      this.baseFilePath + `filesystem/showUserFiles?dir=${targetDir}`,
      (res) => res
    );
  }
  static async openUserFile(dir) {
    return await $.get(
      this.baseFilePath + `filesystem/openFile?dir=${dir}`,
      (res) => res
    );
  }
}
