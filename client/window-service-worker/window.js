let windows = [];
let windowCount = 0;
let zIndex = 1;
let lastWindow;

const windowTemplate = `<div id="inner-app-container" class="app-page inner-app-container">
                            <div class="app-top-header javascript-os-header" id="app-placeholder-app-top-header">
                                <div class="javascript-os-icon"><div></div></div>
                                <div class="javascript-os-title"></div>
                                <div class="app-options">
                                    <div class="ball red js-os-app-option" id="app-close" data-action="close"></div>
                                    <div class="ball orange js-os-app-option" id="app-smaller" data-action="minimize"></div>
                                    <div class="ball green js-os-app-option" id="app-bigger" data-action="maximize"></div>
                                </div>
                            </div>
                            <div id="javascript-os-content" class="javascript-os-content">
                            </div>
                        </div>`;

class AppWindow {
  constructor(attrs) {
    windowCount++;
    this.inited = false;
    this.$element = null;
    this.$content = null;
    this.$header = null;
    this.$icon = null;
    this.$title = null;
    this.title = attrs.title;
  }

  init() {
    if (this.inited) return;

    this.#initTemplate();
  }

  #initTemplate() {
    this.$element = Utils.createElementFromHTML(windowTemplate);

    this.$content = this.$element.querySelector(".javascript-os-content");
    this.$header = this.$element.querySelector(".javascript-os-header");
    this.$icon = this.$element.querySelector(".javascript-os-icon > div");
    this.$title = this.$element.querySelector(".javascript-os-title");

    this.$header.setAttribute("data-id", this.title + windowCount.toString());
    this.$element.setAttribute("data-id", windowCount.toString());
  }

  render() {
    this.$content.innerHTML = "<p>test123</p>";

    document
      .getElementById("main-application-container")
      .appendChild(this.$element);
  }
}
