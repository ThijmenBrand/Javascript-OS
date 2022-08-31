class CommunicationSocket {
  static listenToCommunication() {
    window.onmessage = (e) => {
      //TODO: Apps mogen alleen gebruik maken van de socket wanneer deze open zijn.
      //NOTE: Een uitzondering is om een notificatie te sturen
      if (e.origin != "https://thijmenbrand.nl") return;
      let senderApp = e.path[0].document.activeElement.id;
      if (!windows.find((win) => win.title === senderApp)) return;

      window[e.data.method](e.data.params, true, "test123");
    };
  }
  static sendDataToApp(app, data) {
    appElement = DomWorkerUtils.elementExistsOnDom(app, false);
    if (!appElement) return;

    DomWorkerUtils.waitForElm(app).then(() => {
      appElement.contentWindow.postMessage(
        { target: app, content: "test123" },
        "*"
      );
    });
  }
}
