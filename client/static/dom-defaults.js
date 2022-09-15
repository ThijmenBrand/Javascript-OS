class DomDefaults {
  static openAppPopup(requestingApp, appToOpen) {
    return `
        <div class="software-popup">
          <p>${requestingApp} wants to open ${appToOpen}</p>
          <p>Do you want to allow this?</p>
          <span>
            <button>Open ${appToOpen}</button>
            <button>Decline</button>
          </span>
        </div>`;
  }
  static appIcon(app) {
    return `
              <div class="app javascript-os-file-icon-wrapper">
                <object class='app javascript-os-file-icon' type="image/png">
                  <img class='app javascript-os-fallback-icon' src='./assets/default-app-icon.svg'>
                </object>
                <p id="file-icon-title"></p>
              </div>
            `;
  }
  static appIconWithNameLabel(app) {
    return `
    <span class='app-name-combination' onclick='WindowRegister.openApp({app: "${app}"});showAllAppDock()'>
      <object class='app app-in-all-apps' data="./apps/${app}/app-icon.svg" type="image/png">
        <img class='app' src='./assets/default-app-icon.svg' onclick='WindowRegister.openApp({app: "${app}"})'>
      </object>
      <p>${app}</p>
    </span>`;
  }
  static appWindow() {
    return `<div id="inner-app-container" class="app-page inner-app-container">
              <div class="app-top-header javascript-os-header" id="app-placeholder-app-top-header">
                <div class="app-options">
                  <div class="ball red js-os-app-option" id="app-close" data-action="close"></div>
                  <div class="ball orange js-os-app-option" id="app-smaller" data-action="minimize"></div>
                  <div class="ball green js-os-app-option" id="app-bigger" data-action="maximize"></div>
                </div>
                <div class="javascript-os-title"></div>
                <div class="javascript-os-icon"><div class="javascript-os-inner-icon"></div></div>
              </div>
              <div id="javascript-os-content" class="javascript-os-content">
              </div>
            </div>`;
  }
  static openAppDialog(requestingApp) {
    return `<div>
              <span>With wich app would you like op open this file?</span>
              <span>
                <select>
                  <option value="option1">option1</option>
                  <option value="option2">option2</option>
                </select>
              </span>
              <span>
                <button>Open</button>
              </span>
            </div>`;
  }
  static appIconContextWindow() {
    return `<div>
      <span data-action="openFile">Open</span>
      <span data-action="openFileWith">Open with</span>
      <span data-action="deleteFile">Delete</span>
      <span data-action="renameFile">Rename</span>
    </div>`;
  }
}

export default DomDefaults;
