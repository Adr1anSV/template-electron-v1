import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import Store from 'electron-store'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(__filename, '..')

// Configuración de entorno
const isDev = process.env.NODE_ENV === 'development'
const isPreview = process.env.NODE_ENV === 'preview'

// Configuración de la aplicación
let recursosPath = path.join(app.getAppPath(), 'resources')
if (!isDev && !isPreview) {
  recursosPath = path.join(app.getAppPath(), '..')
}
console.log(`=> Recursos: file://${recursosPath}`)

// Inicializar electron-store
const store = new Store()

let mainWindow
app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  mainWindow.minimize()
  mainWindow.webContents.once('did-finish-load', () => {
    setTimeout(() => {
      if (mainWindow) {
        mainWindow.restore()
        mainWindow.show()
      }
    }, 2000)
  })

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
    mainWindow.loadURL('http://localhost:5173')
  }
  if (isPreview) {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  if (!isDev && !isPreview) {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('get-resource', (_, fileName) => {
  return `file://${path.join(recursosPath, fileName)}`
})

// IPC para interactuar con el renderer (obtener y guardar datos)
ipcMain.handle('get-data', () => {
  return store.get('data') || 'No data available'
})

ipcMain.handle('set-data', (_, value) => {
  store.set('data', value)
  return `Data saved: ${value}`
})
