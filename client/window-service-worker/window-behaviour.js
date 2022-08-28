class WindowBehaviour {
  constructor(window) {
    this.window = window;
  }

  init() {
    this.window.$element.addEventListener("click", this.onClick);

    this.initMovement();
  }

  initMovement() {
    let dataId = this.window.$element.getAttribute("data-id");
    let windowTitle = this.window.title;

    $(`[data-id="${dataId}"]`).draggable({
      containment: "document",
      handle: $(`[data-id="${windowTitle + dataId}"]`),
    });
  }

  onClick(ev) {
    const target = ev.target;
    const hitButton = target.classList.contains("js-os-app-option");

    if (hitButton) {
      const action = ev.target.getAttribute("data-action");
      console.log(action);
    }
  }
}
