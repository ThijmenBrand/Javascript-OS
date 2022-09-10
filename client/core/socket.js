class CommunicationSocket {
  static listenToCommunication() {
    window.onmessage = (e) => {
      //TODO: Apps mogen alleen gebruik maken van de socket wanneer deze open zijn.
      //NOTE: Een uitzondering is om een notificatie te sturen
      if (e.origin != "https://thijmenbrand.nl")
        throw new Error("Origin is not trusted!");
      let senderApp = e.path[0].document.activeElement.id;

      if (!windows.find((win) => win.title === senderApp)) return;

      let params = {
        requestingApp: senderApp,
        params: e.data.params,
      };

      Utils.genericFunction(e.data.method, params);
    };
  }
  static async sendDataToApp(app, data, sender) {
    if (!sender || !app) throw new Error("No app or sender specified!");
    let content = {
      sender: sender,
      message: data,
    };
    DomWorkerUtils.waitForElm(app).then((res) => {
      setTimeout(
        () =>
          res.contentWindow.postMessage({ target: app, content: content }, "*"),
        200
      );
    });
  }
}
