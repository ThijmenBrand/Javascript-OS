const options = {
  dockApps: ["vsCode", "browser", "file-explorer"],
};

let startup = new Startup(options);
startup.initOperatingSystem();
let coreVars = new CoreVariables();
