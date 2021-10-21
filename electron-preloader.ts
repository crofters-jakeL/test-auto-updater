// Preload (Isolated World - Has access to NODE API's)
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('myCustomAPI', {
  sendIPCPing: async (data: string): Promise<string> => ipcRenderer.invoke('ping', data),
  getAppVersion: async (): Promise<{error: any, data: any}> => ipcRenderer.invoke('app_version'),
  updateApp: async (): Promise<{error: any, data: any}> => ipcRenderer.invoke('restart_app'),
  isUpdateAvailable: async (listener: (_event: any, ...args: any[]) => void) => ipcRenderer.on('update_available', listener),
  isUpdateDownloaded: async (listener: (_event: any, ...args: any[]) => void) => ipcRenderer.on('update_downloaded', listener),
  logger: async (listener: (_event: any, ...args: any[]) => void) => ipcRenderer.on('logger', listener)
});
