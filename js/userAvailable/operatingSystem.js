class operatingSystem {
  static baseFilePath =
    "https://www.thijmenbrand.nl/website/desktop-website/php/index.php/";
  static async showFilesInDIR(dir) {
    return await $.get(
      this.baseFilePath + `filesystem/showUserFiles?dir=${dir}`,
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
