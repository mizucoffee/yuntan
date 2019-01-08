import * as GUI from 'babylonjs-gui'

export interface ISkin {
  config: IConfig
  path: string
  scripts: Map<string, IScript>
}
export interface IScript {
  onStart: (scene: BABYLON.Scene, gui: GUI.AdvancedDynamicTexture) => void
  onKeyDown: (keyCode: number) => void
  onFinished: () => void
  onTick: (scene: BABYLON.Scene) => string
}
export interface IConfig {
  skin: {
    name: string
    description: string
    author: string
    version: string
    entry: string
  }
  scene: IScene[]
}
export interface IScene {
  name: string
  type: string
  script: string
}
