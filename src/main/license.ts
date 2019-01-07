import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Event,
  ipcMain
} from 'electron'
import * as path from 'path'
import * as licenseJson from '../../dist/license.json'

class About {
  private window: BrowserWindow | null = null
  private url: string

  constructor(parent: BrowserWindow | null, basePath: string) {
    this.url = path.resolve(basePath, './resources/html/license.html')

    const option: BrowserWindowConstructorOptions = {}

    option.alwaysOnTop = true
    option.maximizable = false
    option.minimizable = false
    if (parent != null) {
      option.parent = parent
    }
    option.resizable = false
    option.title = 'Open Source License'

    this.window = new BrowserWindow(option)
    this.window.setMenu(null)

    this.window.loadURL(`file://${this.url}`)

    this.window.on('closed', () => {
      this.window = null
    })
    ipcMain.on('getLicense', this.getLisence)
  }

  private getLisence(event: Event) {
    event.sender.send('license', licenseJson)
  }
}

export default About
