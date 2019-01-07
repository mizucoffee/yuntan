import { IScript, ISkin } from './interfaces'

class Skin {
  public canvas: HTMLCanvasElement
  private skin: ISkin
  private engine: BABYLON.Engine
  private scene: BABYLON.Scene

  constructor(canvas: HTMLCanvasElement, skin: ISkin) {
    this.canvas = canvas
    this.engine = new BABYLON.Engine(canvas, true)
    this.scene = new BABYLON.Scene(this.engine)
    this.skin = skin
    this.getSceneScript().onStart(this.scene)
  }

  public render() {
    this.getSceneScript().onTick(this.scene)
    this.scene.render()
  }

  public getScene() {
    return this.scene
  }

  private getSceneScript() {
    return this.skin.scripts.get(this.skin.config.skin.entry) as IScript
  }
}

// TODO: このクラスでシーン遷移とか司る

export default Skin
