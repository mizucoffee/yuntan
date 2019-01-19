import * as GUI from 'babylonjs-gui'
import { IScript, ISkin } from './interfaces'

interface ISceneWithConfig {
  script: IScript
  scene: BABYLON.Scene
}

class Skin {
  public canvas: HTMLCanvasElement
  private skin: ISkin
  private engine: BABYLON.Engine
  private scenes = new Map<string, ISceneWithConfig>()
  private gui: GUI.AdvancedDynamicTexture
  private currentScene: ISceneWithConfig

  constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine, skin: ISkin) {
    this.canvas = canvas
    this.engine = engine
    skin.scripts.forEach((value, key) => {
      this.scenes.set(key, {
        scene: new BABYLON.Scene(this.engine),
        script: value
      })
    })
    this.skin = skin
    this.currentScene = this.scenes.get(
      this.skin.config.skin.entry
    ) as ISceneWithConfig
    this.gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      'UI',
      true,
      this.currentScene.scene
    )
    this.getSceneScript().onStart(this.currentScene.scene, this.gui)
  }

  public render() {
    const name = this.getSceneScript().onTick(this.currentScene.scene)
    this.currentScene.scene.render()
    if (this.skin.scripts.has(name)) {
      this.changeScene(name)
    }
  }

  public keyDown(event: KeyboardEvent) {
    this.getSceneScript().onKeyDown(event.keyCode)
  }

  public changeScene(name: string) {
    this.getSceneScript().onFinished()
    this.gui.dispose()
    this.currentScene = this.scenes.get(name) as ISceneWithConfig
    this.gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      'UI',
      true,
      this.currentScene.scene
    )
    this.getSceneScript().onStart(this.currentScene.scene, this.gui)
  }

  public getScene() {
    return this.currentScene.scene
  }

  private getSceneScript() {
    return this.currentScene.script
  }
}

// TODO: このクラスでシーン遷移とか司る

export default Skin
