import { remote } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import * as toml from 'toml'
import { IConfig, IScript, ISkin } from './interfaces'

class SkinManager {
  private skinDir = path.join(remote.app.getAppPath(), 'skins')
  private skins: Map<string, ISkin>
  private currentSkin: string = 'Yuki Skin'

  constructor() {
    this.skins = fs
      .readdirSync(this.skinDir)
      .map(file => path.join(this.skinDir, file))
      .filter(file => fs.statSync(file).isDirectory()) // TODO: 存在チェック
      .filter(file => fs.statSync(path.join(file, 'skin.toml')).isFile())
      .reduce((map, file) => {
        const config: IConfig = toml.parse(
          fs.readFileSync(path.join(file, 'skin.toml'), 'utf8')
        )
        const scripts = new Map<string, IScript>()
        config.scene.forEach(scene => {
          scripts.set(scene.name, eval('require')(
            path.join(file, scene.script)
          ) as IScript)
        })
        map.set(config.skin.name, {
          config,
          path: file,
          scripts
        })
        return map
      }, new Map<string, ISkin>())
  }

  public selectSkin(name: string) {
    if (this.skins.has('name')) {
      this.currentSkin = name
    }
  }

  public getCurrentSkin(): ISkin {
    return this.skins.get(this.currentSkin) as ISkin
  }
}

export default SkinManager
