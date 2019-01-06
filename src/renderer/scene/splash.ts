class Splash {
  public canvas: HTMLCanvasElement
  private engine: BABYLON.Engine
  private scene: BABYLON.Scene

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.engine = new BABYLON.Engine(canvas, true)
    this.scene = new BABYLON.Scene(this.engine)

    const camera = new BABYLON.FreeCamera(
      'camera',
      new BABYLON.Vector3(0, 5, -10),
      this.scene
    )

    camera.setTarget(BABYLON.Vector3.Zero())
    camera.attachControl(canvas, false)
    new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    )

    const sphere = BABYLON.MeshBuilder.CreateSphere(
      'sphere',
      { segments: 16, diameter: 2 },
      this.scene
    )

    sphere.position.y = 1

    BABYLON.MeshBuilder.CreateGround(
      'ground1',
      { height: 6, width: 6, subdivisions: 2 },
      this.scene
    )
  }

  public getScene() {
    return this.scene
  }
}

export default Splash
