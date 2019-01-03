import { app, App, BrowserWindow } from 'electron'
import __basedir from '../basedir'

class Yuntan {
  private mainWindow: BrowserWindow | null = null
  private app: App
  private mainUrl: string = `file://${__basedir}/src/index.html`

  constructor(app: App) {
    this.app = app
    this.app.on('window-all-closed', () => this.onWindowAllClosed())
    this.app.on('ready', () => this.onReady())
    this.app.on('activate', () => this.onActivated())
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
  }

  private onWindowAllClosed() {
    this.app.quit()
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

console.log(__dirname)
