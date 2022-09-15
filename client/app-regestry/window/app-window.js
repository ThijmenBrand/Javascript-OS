import DomDefaults from "../../static/dom-defaults.js";
import Utils from "../../utils/utils.js";

export let windows = [];
let windowCount = 0;
let lastWindow;

class AppWindow {
  constructor(args) {
    windowCount++;
    this.options = {
      iconLocation: args.iconLocation,
      width: args.width,
      height: args.height,
      type: args.type,
    };
    this.inited = false;
    this.$element = null;
    this.$content = null;
    this.$header = null;
    this.$icon = null;
    this.$title = null;
    this.title = args.title;
  }

  initTemplate() {
    this.$element = Utils.createElementFromHTML(DomDefaults.appWindow());

    this.$content = this.$element.querySelector(".javascript-os-content");
    this.$header = this.$element.querySelector(".javascript-os-header");
    this.$icon = this.$element.querySelector(".javascript-os-icon > div");
    this.$title = this.$element.querySelector(".javascript-os-title");

    this.$header.setAttribute("data-id", this.title + windowCount.toString());
    this.$element.setAttribute("data-id", windowCount.toString());

    this.updateStyle();
    this.updateUI();
    this.updateBarOptions();
  }

  updateStyle() {
    this.$element.style.height = this.options.height + "px";
    this.$element.style.width = this.options.width + "px";
  }
  updateUI() {
    this.$title.innerHTML = this.title;
    this.$icon.style.backgroundImage = `url('${this.options.iconLocation}')`;
  }
  updateBarOptions() {
    if (this.options.type == "dialog") {
      this.$element.querySelector("#app-smaller").style.display = "none";
      this.$element.querySelector("#app-bigger").style.display = "none";
    }
  }

  render(content) {
    this.$content.innerHTML = content;

    document
      .getElementById("main-application-container")
      .appendChild(this.$element);

    windows.push(this);
  }
}

export default AppWindow;
