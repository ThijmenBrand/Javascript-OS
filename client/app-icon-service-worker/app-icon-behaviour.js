class IconBehaviour {
  constructor(icon) {
    this.init(icon);
  }
  init(icon) {
    const onclick = (ev) => this.#click(ev, icon);
    icon.$element.addEventListener("click", onclick);

    //this.#initMovement(win);
  }

  #click(ev, icon) {
    const target = ev.target;

    new CreateWindow().application(icon).initWindow();
  }
}
