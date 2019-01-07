export interface ISkin {
  config: IConfig
  path: string
  scripts: Map<string, IScript>
}
export interface IScript {
  onStart: (scene: BABYLON.Scene) => void
  onKeyDown: () => void
  onFinished: () => void
  onTick: (scene: BABYLON.Scene) => void
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
