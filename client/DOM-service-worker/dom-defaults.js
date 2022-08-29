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
    return `<object class='app' data="./apps/${app}/app-icon.svg" type="image/png" onclick='openApp("${app}")'>
              <img class='app' src='./assets/default-app-icon.svg' onclick='openApp("${app}")'>
            </object>`;
  }
}
