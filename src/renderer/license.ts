import { Event, ipcRenderer } from 'electron'

const data = document.getElementById('data')

ipcRenderer.send('getLicense')
ipcRenderer.on('license', (_: Event, licenseJson: any) => {
  if (data != null) {
    Object.keys(licenseJson).forEach(key => {
      const library = document.createElement('div')
      library.classList.add('library')

      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      checkbox.setAttribute('id', key)

      library.appendChild(createHeader(key))
      library.appendChild(checkbox)
      library.appendChild(createHidden(licenseJson[key]))

      data.appendChild(library)
    })
  }
})

function createHeader(key: string) {
  const header = document.createElement('div')
  header.classList.add('header')
  header.innerHTML = `<h2>${key}</h2><label for="${key}"><div class="button">Show</div></label>`
  return header
}

function createHidden(license: any) {
  const hidden = document.createElement('div')
  hidden.classList.add('hidden')
  hidden.innerHTML += `<div class="line"><strong>License: </strong>${
    license.license
  }<br></span>`

  hidden.innerHTML += `<div class="line"><strong>Source: </strong>${
    license.source
  }<br></span>`

  if (license.hasOwnProperty('sourceText')) {
    hidden.innerHTML += `<div class="line"><strong>License Text: </strong><br></span>`
    hidden.innerHTML += `<p>${license.sourceText.replace(/\n/g, '<br>')}</p>`
  }

  return hidden
}
