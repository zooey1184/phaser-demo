import Phaser from "phaser";
import star from '../assets/star.png'

export default class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }
  preload() {
    this.load.image('star', star)
  }

  create() {
    var stars = this.add.group({key: 'star', repeat: 30})

    var circle = new Phaser.Geom.Circle(300, 400, 32)

    Phaser.Actions.PlaceOnCircle(stars.getChildren(), circle)
    this.tweens.add({
      targets: circle,
      radius: 200,
      yoyo: true,
      ease: 'Quintic.easeInOut',
      repeat: -1,
      duration: 1500,
      onUpdate: function() {
        Phaser.Actions.RotateAroundDistance(stars.getChildren(), {x: 300, y: 400}, 0.02, circle.radius)
      }
    })
  }
}