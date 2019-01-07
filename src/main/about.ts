import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Event,
  ipcMain
} from 'electron'
import * as path from 'path'
import * as packageJson from '../../package.json'

class About {
  private window: BrowserWindow | null = null
  private url: string

  constructor(parent: BrowserWindow | null, basePath: string) {
    this.url = path.resolve(basePath, './resources/html/about.html')

    const option: BrowserWindowConstructorOptions = {}

    option.alwaysOnTop = true
    option.height = 390
    option.maximizable = false
    option.minimizable = false
    if (parent != null) {
      option.parent = parent
    }
    option.resizable = false
    option.width = 400
    option.title = 'About yuntan'

    this.window = new BrowserWindow(option)
    this.window.setMenu(null)

    this.window.loadURL(`file://${this.url}`)

    this.window.on('closed', () => {
      this.window = null
    })
    ipcMain.on('getPackage', this.getPackage)
  }

  private getPackage(event: Event) {
    event.sender.send('package', packageJson)
  }
}

export default About
