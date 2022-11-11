const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile("./src/index.html");
  mainWindow.setBackgroundColor("#0D0D0D");

  ipc.on("minimizeApp", () => {
    console.log("Clicked on Minimize Btn");
    mainWindow.minimize();
  });

  ipc.on("maximizeRestoreApp", () => {
    if (mainWindow.isMaximized()){
      console.log("Cliked on Restore Btn");
      mainWindow.restore();
      return;
    }
    console.log("Cliked on Maximize Btn");
    mainWindow.maximize();
  }); 

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("isMaximized");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("isRestored");
  });

  ipc.on("closeApp", () => {
    console.log("Clicked on Close Btn");
    mainWindow.close();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});
