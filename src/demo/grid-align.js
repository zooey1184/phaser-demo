import Phaser from "phaser";
import Diamond from '../assets/diamonds.png'

export default class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.spritesheet('diamons', Diamond, {frameWidth: 32, frameHeight: 24})
  }

  create() {
    const group = this.add.group({
      key: 'diamons',
      frameHeight: 24,
      frameWidth: 32,
      frame: [0,1,2,3,4],
      frameQuantity: 20
    })
    Phaser.Actions.GridAlign(group.getChildren(), {
      width: 10,
      height: 10,
      cellHeight: 40,
      cellWidth: 40,
      x: 200,
      y: 100
    })
    // const {width, height} = this.sys.game.config
    // const circle = new Phaser.Geom.Circle(width/2, height/2, 50)
    // const group = this.add.group({
    //   key: 'diamons',
    //   frame: [0,1,2],
    //   repeat: 5
    // })
    // Phaser.Actions.PlaceOnCircle(group.getChildren(), circle)
    // this.tweens.add({
    //   targets: circle,
    //   radius: 200,
    //   yoyo: true,
    //   repeat: -1,
    //   duration: 1500,
    //   onUpdate: () => {
    //     Phaser.Actions.RotateAroundDistance(group.getChildren(), {x: width/2, y: height/2}, 0.02, circle.radius)
    //   }
    // })
  }
}