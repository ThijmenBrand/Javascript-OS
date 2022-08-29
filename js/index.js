const options = {
  dockApps: ["vsCode", "browser", "file-explorer"],
};

let startup = new Startup(options);
let coreVars = new CoreVariables();

startup.getAllApps();

updateTime();

setInterval(() => {
  updateTime();
}, 1000);

window.onmessage = (e) => {
  //TODO: Apps mogen alleen gebruik maken van de socket wanneer deze open zijn.
  //NOTE: Een uitzondering is om een notificatie te sturen
  if (e.origin != "https://thijmenbrand.nl") return;
  let senderApp = e.path[0].document.activeElement.id;
  if (!windows.find((win) => win.title === senderApp)) return;

  console.log(windows);
};

onresize = (event) => {
  let pageWidth = window.innerWidth;
  $("#display-too-small").css("display", pageWidth >= 1000 ? "none" : "block");
};

function updateTime() {
  let currentDate = new Date();
  let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
  $("#current-date-time").text(currentDate.toDateString() + " " + currentTime);
}
