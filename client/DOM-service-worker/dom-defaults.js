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
    return `<object class='app' data="./apps/${app}/app-icon.svg" type="image/png" onclick='WindowRegister.openApp("${app}")'>
              <img class='app' src='./assets/default-app-icon.svg' onclick='WindowRegister.openApp("${app}")'>
            </object>`;
  }
  static appIconWithNameLabel(app) {
    return `
    <span class='app-name-combination' onclick='WindowRegister.openApp("${app}");showAllAppDock()'>
      <object class='app app-in-all-apps' data="./apps/${app}/app-icon.svg" type="image/png">
        <img class='app' src='./assets/default-app-icon.svg' onclick='WindowRegister.openApp("${app}")'>
      </object>
      <p>${app}</p>
    </span>`;
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
}
