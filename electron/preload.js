const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  getResource: (fileName) => ipcRenderer.invoke('get-resource', fileName),
})
