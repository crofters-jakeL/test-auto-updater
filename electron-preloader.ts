// Preload (Isolated World - Has access to NODE API's)
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('myCustomAPI', {
  sendIPCPing: async (data: string): Promise<string> => ipcRenderer.invoke('ping', data)
});

