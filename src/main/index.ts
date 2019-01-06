import { app, App, BrowserWindow, Menu } from 'electron'
import __basedir from '../basedir'
import About from './about'
import License from './license'

class Yuntan {
  private mainWindow: BrowserWindow | null = null
  private electronApp: App
  private mainUrl: string = `file://${__basedir}/src/html/index.html`

  constructor(electronApp: App) {
    this.electronApp = electronApp
    this.electronApp.on('window-all-closed', () => this.onWindowAllClosed())
    this.electronApp.on('ready', () => this.onReady())
    this.electronApp.on('activate', () => this.onActivated())
  }

  private create() {
    this.mainWindow = new BrowserWindow({
      height: 720,
      width: 1280
    })

    this.mainWindow.loadURL(this.mainUrl)

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
    this.mainWindow.on('resize', () => {
      if (this.mainWindow != null) {
        this.mainWindow.webContents.send('resize')
      }
    })
    const main = this.mainWindow
    const ctrl = process.platform === 'darwin' ? 'Command' : 'Ctrl'
    const file = process.platform === 'darwin' ? 'yuntan' : 'File'
    const menu = Menu.buildFromTemplate([
      {
        label: file,
        submenu: [
          {
            accelerator: `${ctrl}+Q`,
            label: 'Quit',
            click() {
              app.quit()
            }
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            accelerator: `${ctrl}+R`,
            label: 'Reload',
            click() {
              main.webContents.reload()
            }
          },
          {
            accelerator: 'F11',
            label: 'Toggle Full Screen',
            click() {
              main.setFullScreen(!main.isFullScreen())
            }
          },
          {
            accelerator: `Alt+${ctrl}+S`,
            label: 'Toggle Stats',
            click() {
              main.webContents.send('stats')
            }
          },
          {
            accelerator: `Alt+${ctrl}+I`,
            label: 'Toggle Developer Tools',
            click() {
              main.webContents.toggleDevTools()
            }
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            click: () => new License(this.mainWindow),
            label: 'View License'
          },
          {
            click: () => new About(this.mainWindow),
            label: 'About yuntan'
          }
        ]
      }
    ])
    if (process.platform === 'darwin') {
      Menu.setApplicationMenu(menu)
    } else {
      Menu.setApplicationMenu(null)
      this.mainWindow.setMenu(menu)
    }
  }

  private onWindowAllClosed() {
    this.electronApp.quit()
  }

  private onReady() {
    this.create()
  }

  private onActivated() {
    if (this.mainWindow === null) {
      this.create()
    }
  }
}

new Yuntan(app)
