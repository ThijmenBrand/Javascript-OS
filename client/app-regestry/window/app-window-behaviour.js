let zIndex = 1;

class WindowBehaviour {
  init(win) {
    const onclick = (ev) => this.#click(ev, win);
    win.$element.addEventListener("click", onclick);

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
  #maximize(win) {
    win.$element.classList.add("window-full-screen");
    win.$header.classList.add("window-full-screen");
  }
  #minimize(win) {
    win.$element.classList.remove("window-full-screen");
    win.$header.classList.remove("window-full-screen");
  }
}

export default WindowBehaviour;
