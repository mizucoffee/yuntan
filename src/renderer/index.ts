import * as BABYLON from 'babylonjs'
import { ipcRenderer } from 'electron'
import * as Stats from 'stats-js'

import Skin from './skin'
import SkinManager from './skinmanager'

const stats = new Stats()
stats.dom.id = 'stats'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const engine = new BABYLON.Engine(canvas, true)

const skinManager = new SkinManager()
const scene = new Skin(canvas, skinManager.getCurrentSkin())

resize()
engine.runRenderLoop(() => {
  stats.begin()
  scene.render()
  stats.end()
})

ipcRenderer.on('resize', resize)
ipcRenderer.on('stats', toggleStats)

function resize() {
  setTimeout(() => {
    if (canvas != null) {
      if (window.innerWidth / 16 > window.innerHeight / 9) {
        canvas.style.width = `${(window.innerHeight / 9) * 16}`
        canvas.style.height = `${window.innerHeight}`
        canvas.style.marginTop = '0'
      } else {
        canvas.style.width = `${window.innerWidth}`
        canvas.style.height = `${(window.innerWidth / 16) * 9}`
        canvas.style.marginTop = `${(window.innerHeight -
          (window.innerWidth / 16) * 9) /
          2}`
      }
      engine.resize()
    }
  }, 100)
}

function toggleStats() {
  const s = document.getElementById('stats')
  if (s == null) {
    document.body.appendChild(stats.dom)
  } else {
    s.remove()
  }
}
