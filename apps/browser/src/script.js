let browserTabs = [];

openBrowser();

function tabId() {
  return Math.floor(Math.random() * 1000);
}

function openBrowser() {
  if (browserTabs.length <= 0)
    browserTabs.push({ content: "", pageName: "new tab", tabId: tabId() });
}

function closeTab(tabId) {
  console.log(browserTabs);
  let indexOfTab = browserTabs.findIndex((el) => el.tabId === tabId);
  console.log(indexOfTab);
  if (indexOfTab > -1) {
    browserTabs.splice(indexOfTab, 1);
  }

  drawTabs();
}

function drawTabs() {
  browserTabs.forEach((tab) => {
    openPage(tab.content, tab.pageName, tab.tabId);
  });
}

function openPage(pageContent = "", pageName = "new tab", id = null) {
  console.log("noe");
  let tabIdentifier = id || tabId();
  browserTabs.push({
    content: pageContent,
    pageName: pageName,
    tabId: tabIdentifier,
  });
  $("#browser-open-pages").append(
    `<p class='browser-tab'><span>${pageName}</span><span onclick='closeTab("${tabIdentifier}")'>x</span></p>`
  );
}
