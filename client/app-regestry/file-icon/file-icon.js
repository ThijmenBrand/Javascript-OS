import DomDefaults from "../../static/dom-defaults.js";
import CreateWindow from "../window/app-window-creation.js";
import Utils from "../../utils/utils.js";
import fileIcons from "./fileIcons.js";

class FileIcon {
  constructor(FileLocation) {
    this.fileLocation = FileLocation;
    this.iconLocation = null;
    this.title = "";
    this.mimes = null;

    this.$element = null;
    this.$icon = null;
    this.$fallback = null;
    this.$iconTitle = null;

    this.$appHash = this.title + "-" + Utils.generateUUID();

    this.#getFileConfig();
  }

  async #getFileConfig() {
    let file = this.fileLocation.split("/").at(-1);
    let fileExt = file.split(".").at(-1);

    if (fileExt != "thijm") {
      this.iconLocation =
        "client/static/icons/file_type_" + fileIcons[fileExt] + ".svg";

      this.title = file;
    } else {
      let [appTitle, appIcon] = await Utils.getAppProperties(this.fileLocation);

      this.title = appTitle;
      this.iconLocation = appIcon;
    }

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
