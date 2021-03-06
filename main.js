const { app, shell, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const server = require("./server");
const db = require("./DB.js");
const routes = require("./expressRoutes/mobileRouter");
const fs = require('fs');
let win;

function createWindow() {
  win = new BrowserWindow({ width: 1024, height: 768 });

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()

  win.on("closed", () => {
    win = null;
  });

  // This print solution
  // win.webContents.on("new-window", function(event, url) {
  //   event.preventDefault();
  //   shell.openExternal(url);
  // });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
