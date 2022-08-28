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
}
