const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  getResource: (fileName) => ipcRenderer.invoke('get-resource', fileName),
  getData: () => ipcRenderer.invoke('get-data'),
  setData: (value) => ipcRenderer.invoke('set-data', value),
})
