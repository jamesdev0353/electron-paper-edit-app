const electron = require("electron");
const { app, BrowserWindow, ipcMain,Menu, shell} = require('electron')
// Module to control application life.
// const app = electron.app;
// const Menu = electron.Menu;
// const shell = electron.shell;
// Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

const makeMenuTemplate = require('./make-menu-template.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let settingsWindow;

function createNewSettingsWindow(){
  settingsWindow = new BrowserWindow({
    width: 700,
    height: 670,
    x: 0,
    y: 0,
    minWidth: 1000,
    minHeight: 670,
    titleBarStyle: 'show',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });

  settingsWindow.loadURL(
    url.format({
      pathname: path.join(app.getAppPath(), "src/stt-settings/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // settingsWindow.hide();
}

function createMainWindow() {
  // Create the browser window.
 
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 670,
    minWidth: 1000,
    minHeight: 670,
    titleBarStyle: 'show',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });

  console.log(__dirname);
  if (process.env.NODE_ENV === "development") {
    // and load the index.html of the app.
    mainWindow.loadURL("http://localhost:3000");
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }
  // Once we package this in electron we no longer 
  // have access to process.env.NODE_ENV to set it to production
  // so we need to recur to putting the production mode
  // into the else for now. 
  else{
    mainWindow.loadURL(
      url.format({
        pathname: path.join(app.getAppPath(), "build/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  // https://github.com/electron/electron/issues/1095
  mainWindow.dataPath = app.getPath("userData");
  mainWindow.appPath = app.getAppPath();
  mainWindow.ElectronWrapper = require(`${ app.getAppPath()}/src/ElectronWrapper/index.js`)


  // ipcMain.on('get-projects', (event, status) => {
  //   console.log('get-projects',status)
  //   event.returnValue = 'pong';
  // })
  // Eg could add ElectronWrapper here
  // mainWindow.ElectronWrapper = ElectronWrapper;

  // MENU
  // TODO: menu could be refactored as separate file?
  // Create the Application's main menu
 
  const template = makeMenuTemplate({ 
    app,
    createNewSettingsWindow,
    createMainWindow
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // Emitted when the window is closed.
  mainWindow.on("closed", function(event) {
    event.preventDefault();
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    settingsWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createMainWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow();
  }
});

// https://electron.atom.io/docs/api/app/#event-open-file-macos
//not working ?
app.on("open-file", (event, path) => {
  console.log('open-file: ',path);
  event.preventDefault();
  // shell.openExternal(url);
});

// https://electronjs.org/docs/api/app#appsetbadgecountcount-linux-macos
// app.setBadgeCount(3)

//not working ?
app.on("open-url", (event, url) => {
  console.log('open-url: ',url);
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  event.preventDefault();
  shell.openExternal(url);
});
