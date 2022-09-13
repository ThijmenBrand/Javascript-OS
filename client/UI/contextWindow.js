class contextWindow {
  constructor(type) {
    this.type = type;
  }

  init(callBack) {
    const { clientX: mouseX, clientY: mouseY } = event;

    let html = null;

    switch (type) {
      case "appIcon":
        html = DomDefaults.appIconContextWindow();
        break;
    }
  }
}
