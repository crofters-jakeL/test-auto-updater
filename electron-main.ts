import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import serve from 'electron-serve';
import { autoUpdater } from 'electron-updater';

const loadURL = serve({directory: 'build'});

let mainWindow;

async function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'electron-preloader.js'),
    }
  });
  if (!isDev) {
    await loadURL(mainWindow);
  } else {
    mainWindow.loadURL('http://localhost:3000')
  }
  mainWindow.on('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

(async () => {
	await app.whenReady();
  await createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

ipcMain.handle('ping', async (_event: any, data: string) => {
  return `ping back:: ${data}`;
})

ipcMain.handle('app_version', () => {
  let ret = {error: null, data: null};
  return ret.data = app.getVersion();
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.handle('restart_app', () => {
  autoUpdater.quitAndInstall();
})