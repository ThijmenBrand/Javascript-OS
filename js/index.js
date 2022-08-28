getAllApps();
updateTime();

setInterval(() => {
  updateTime();
}, 1000);

window.onmessage = (e) => openAppRequest(e.data);

onresize = (event) => {
  let pageWidth = window.innerWidth;
  $("#display-too-small").css("display", pageWidth >= 1000 ? "none" : "block");
};

function updateTime() {
  let currentDate = new Date();
  let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
  $("#current-date-time").text(currentDate.toDateString() + " " + currentTime);
}
