import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Event,
  ipcMain
} from 'electron'
import * as licenseJson from '../../dist/license.json'
import __basedir from '../basedir'

class About {
  private aboutWindow: BrowserWindow | null = null
  private aboutUrl: string = `file://${__basedir}/src/html/license.html`

  constructor(parent: BrowserWindow | null) {
    const option: BrowserWindowConstructorOptions = {}

    option.alwaysOnTop = true
    option.maximizable = false
    option.minimizable = false
    if (parent != null) {
      option.parent = parent
    }
    option.resizable = false
    option.title = 'Open Source License'

    this.aboutWindow = new BrowserWindow(option)
    this.aboutWindow.setMenu(null)

    this.aboutWindow.loadURL(this.aboutUrl)

    this.aboutWindow.on('closed', () => {
      this.aboutWindow = null
    })
    ipcMain.on('getLicense', this.getLisence)
  }

  private getLisence(event: Event) {
    event.sender.send('license', licenseJson)
  }
}

export default About
