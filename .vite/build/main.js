"use strict";
const electron = require("electron");
const path = require("node:path");
let mainWindow;
const createWindow = () => {
  mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  {
    mainWindow.loadURL("http://localhost:5173");
  }
  mainWindow.webContents.openDevTools();
};
electron.app.whenReady().then(() => {
  createWindow();
  electron.globalShortcut.register("CommandOrControl+R", () => {
    if (mainWindow) {
      mainWindow.reload();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
electron.app.on("will-quit", () => {
  electron.globalShortcut.unregisterAll();
});
