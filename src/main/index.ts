import { app, App, BrowserWindow, Menu } from 'electron'
import __basedir from '../basedir'
import About from './about'

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

    const menu = Menu.buildFromTemplate([
      {
        label: 'File'
      },
      {
        label: 'Help',
        submenu: [
          {
            click: () => console.log(),
            label: 'View License'
          },
          {
            click: () => new About(this.mainWindow),
            label: 'About yuntan'
          }
        ]
      }
    ])
    Menu.setApplicationMenu(null)
    this.mainWindow.setMenu(menu)
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
