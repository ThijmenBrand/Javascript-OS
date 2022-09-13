import DomDefaults from "../../dom/dom-defaults.js";
import CreateWindow from "../window/app-window-creation.js";
import Utils from "../../utils/utils.js";

class FileIcon {
  constructor(configFileLocation) {
    this.config = configFileLocation;

    this.title = "";
    this.iconLocation = null;
    this.ExecuteLocation = null;
    this.type = null;
    this.autoStart = false;
    this.mimes = null;
    this.inAppDock = false;
    this.state = "dev";
    this.iconType = 0;
    this.inited = false;
    this.$element = null;
    this.$icon = null;
    this.$fallback = null;
    this.$iconTitle = null;

    this.$appHash = this.title + "-" + Utils.generateUUID();

    this.#getFileConfig();
  }

  async #getFileConfig() {
    let config = await fetch(this.config).then((res) => res.json());

    this.title = config.title;
    this.type = config.type;
    this.iconLocation = config.icon;
    this.ExecuteLocation = config.fileLocation;
    this.state = config.state;
    this.mimes = config.mimes;
    this.inAppDock = config.inAppDock;

    this.#initIcon();
  }

  #initIcon() {
    if (this.inited) return;

    this.$element = Utils.createElementFromHTML(DomDefaults.appIcon());

    this.$icon = this.$element.querySelector(".javascript-os-file-icon");
    this.$fallback = this.$element.querySelector(
      ".javascript-os-fallback-icon"
    );
    this.$iconTitle = this.$element.querySelector("#file-icon-title");

    this.$element.setAttribute("data-id", this.$appHash);

    this.#render();
    this.#initBehaviour();
  }

  #initBehaviour() {
    const openFile = (ev) => this.#openFile(ev, this);
    const openContextMenu = (ev) => this.#openContextMenu(ev, this);
    this.$element.addEventListener("dblclick", openFile);
    this.$element.addEventListener("contextmenu", openContextMenu);

    $(this.$element).on("keyup", function (e) {
      console.log(e);
    });

    this.#initMovement();
  }
  #initMovement() {
    let dataId = this.$element.getAttribute("data-id");
    $(`[data-id="${dataId}"]`).draggable({
      grid: [40, 40],
      containment: "parent",
    });
  }

  #render() {
    this.$icon.data = this.iconLocation;
    this.$iconTitle.innerHTML = this.title;

    if (this.inAppDock) {
      document.getElementById("inner-app-dock").appendChild(this.$element);
      return;
    }

    document
      .getElementById("main-application-container")
      .appendChild(this.$element);
  }

  #openFile(ev, icon) {
    const target = ev.target;

    new CreateWindow().application(icon).then((e) => e.initWindow());
  }
  #openContextMenu(ev, icon) {
    console.log("test");
  }
  destory() {
    this.$element.remove();
  }
}

export default FileIcon;
