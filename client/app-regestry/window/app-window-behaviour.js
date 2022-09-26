import { windows } from "../window/app-window.js";

let lastWindowOnTop = null;

class WindowBehaviour {
  fullScreen = false;
  location = {};

  init(win) {
    const onclick = (ev) => this.#click(ev, win);
    const dblClick = (ev) => this.#dblClick(win);
    const mouseDown = (ev) => this.#mouseDown(win);
    win.$element.addEventListener("click", onclick);
    win.$element.addEventListener("dblclick", dblClick);
    win.$element.addEventListener("mousedown", mouseDown);

    this.#initMovement(win);
  }

  #initMovement(win) {
    let dataId = win.$element.getAttribute("data-id");
    let windowTitle = win.title;

    $(`[data-id="${dataId}"]`).draggable({
      containment: "document",
      handle: $(`[data-id="${windowTitle + dataId}"]`),
    });
  }

  #click(ev, win) {
    const target = ev.target;
    const hitButton = target.classList.contains("js-os-app-option");

    if (hitButton) {
      const action = ev.target.getAttribute("data-action");

      if (action == "close") this.#close(win);
      if (action == "maximize") this.#maximize(win);
      if (action == "minimize") this.#minimize(win);
    }
  }

  #close(win) {
    win.$element.remove();
  }
  #dblClick(win) {
    !this.fullScreen ? this.#maximize(win) : this.#minimize(win);
  }
  #mouseDown(win) {
    if (!lastWindowOnTop) {
      lastWindowOnTop = win;
      return;
    }
    let index = getComputedStyle(lastWindowOnTop.$element).zIndex;
    lastWindowOnTop.$element.style.zIndex = index - 10;
    win.$element.style.zIndex = index;

    lastWindowOnTop = win;
  }
  #maximize(win) {
    this.location = {
      left: win.$element.getBoundingClientRect().left,
      top: win.$element.getBoundingClientRect().top,
    };
    this.fullScreen = true;

    win.$element.classList.add("window-full-screen");
    win.$header.classList.add("window-full-screen");
  }
  #minimize(win) {
    win.$element.classList.remove("window-full-screen");
    win.$header.classList.remove("window-full-screen");

    win.$element.style.left = this.location.left;
    win.$element.style.top = this.location.top;
    this.fullScreen = false;
  }
}

export default WindowBehaviour;
