class CoreVariables {
  userAvailableOperatingSystemClass = null;

  constructor() {
    this.init();
  }

  async init() {
    this.userAvailableOperatingSystemClass = await fetch(
      "./js/userAvailable/operatingSystem.js"
    )
      .then((res) => res.text())
      .then((data) => Utils.getBlobURL(data, "text/javascript"));
  }
}
