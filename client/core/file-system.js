class FileSystem {
  async showFilesInDir(path = "") {
    let targetDir = "../userFiles/" + path;
    let result = await $.get(
      `https://www.thijmenbrand.nl/website/desktop-website/php/index.php/filesystem/showUserFiles?dir=${targetDir}`,
      (res) => res
    );

    return result;
  }
  async openFile(filePath) {
    let targetDir = "../userFiles/" + filePath;
    let result = await $.get(
      `https://www.thijmenbrand.nl/website/desktop-website/php/index.php/filesystem/openFile?dir=${targetDir}`,
      (res) => res
    );

    return result;
  }
}

export default FileSystem;
