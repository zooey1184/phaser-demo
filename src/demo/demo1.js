import Phaser from "phaser";
// import Platform from '../assets/platform.png'
import Dimian from '../assets/1/dimian.png'
import star from '../assets/star.png'
export default class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }

  preload(){
    this.load.image('platform', Dimian)
    this.load.image('star', star)
  }

  create() {
    const {width, height} = this.sys.game.config
    const platform = this.add.image(0, 0, 'platform')
    const SCALE = platform.width/width
    const starImg = this.add.image(0,0, 'star')
    console.log(1/SCALE);
    
    platform.setScale(1/SCALE)
    // const container = this.add.container()
    
    Phaser.Display.Align.In.BottomCenter(platform, this.add.zone(width/2, (height+platform.height*1/SCALE)/2, width, height+platform.height*1/SCALE))
    // Phaser.Display.Align.In.BottomCenter(starImg, this.add.zone(width/2, (height-container.height)/2, width, height-platform.height))
  }
}