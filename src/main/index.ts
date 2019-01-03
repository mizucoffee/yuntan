import * as openAboutWindow from 'about-window'
import { app, App, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import __basedir from '../basedir'

class Yuntan {
  private mainWindow: BrowserWindow | null = null
  private electronApp: App
  private mainUrl: string = `file://${__basedir}/src/index.html`

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
            click: () => console.log('clicked'),
            label: 'View License'
          },
          {
            click: () =>
              openAboutWindow.default({
                copyright: 'Copyright (c) 2018 Mizucoffee',
                icon_path: path.join(
                  __basedir,
                  'resources/images/yuntan_icon.png'
                ),
                open_devtools: true,
                package_json_dir: __basedir
              }),
            label: 'About Yuntan'
          }
        ]
      }
    ])
    Menu.setApplicationMenu(menu)
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
