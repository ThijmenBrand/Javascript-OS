class CoreVariables {
  userAvailableOperatingSystemClass = null;

  constructor() {
    this.userAvailableOperatingSystemClass = this.init();
  }

  async init() {
    return fetch("./js/userAvailable/operatingSystem.js")
      .then((res) => res.text())
      .then((data) => Utils.getBlobURL(data, "text/javascript"));
  }
}
