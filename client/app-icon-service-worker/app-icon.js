class AppIcon {
  constructor(attrs) {
    this.title = attrs.title;
    this.iconLocation = attrs.iconLocation;
    this.ExecuteLocation = attrs.ExecuteLocation;
    this.type = attrs.type;
    this.iconType = 0;
    this.inited = false;
    this.$element = null;
    this.$icon = null;
    this.$fallback = null;

    this.$appHash = this.appName + "-" + Utils.generateUUID();

    this.init();
  }

  init() {
    if (this.inited) return;

    this.initIcon();
  }

  initIcon() {
    this.$element = Utils.createElementFromHTML(DomDefaults.appIcon());

    this.$fallback = this.$element.querySelector(
      ".javascript-os-file-icon > img"
    );

    this.$element.setAttribute("data-id", this.$appHash);

    this.render();
  }

  render() {
    this.$element.data = this.iconLocation;

    document.getElementById("normal-apps").appendChild(this.$element);
  }
}
