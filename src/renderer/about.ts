import { Event, ipcRenderer, remote } from 'electron'

const title = document.getElementById('title')
const description = document.getElementById('description')
const maintainer = document.getElementById('maintainer')

if (title != null) {
  title.innerText = `yuntan ${remote.app.getVersion()}`
}

ipcRenderer.send('getPackage')
ipcRenderer.on('package', (_: Event, packageJson: any) => {
  if (description != null) {
    description.innerText = packageJson.description
  }
  if (maintainer != null) {
    maintainer.innerText = packageJson.author
  }
})
