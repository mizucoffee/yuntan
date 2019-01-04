import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Event,
  ipcMain
} from 'electron'
import * as packageJson from '../../package.json'
import __basedir from '../basedir'

class About {
  private aboutWindow: BrowserWindow | null = null
  private aboutUrl: string = `file://${__basedir}/src/html/about.html`

  constructor(parent: BrowserWindow | null) {
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

    this.aboutWindow = new BrowserWindow(option)
    this.aboutWindow.setMenu(null)

    this.aboutWindow.loadURL(this.aboutUrl)

    this.aboutWindow.on('closed', () => {
      this.aboutWindow = null
    })

    ipcMain.on('getPackage', this.getPackage)
  }

  private getPackage(event: Event) {
    event.sender.send('package', packageJson)
  }
}

export default About
