import Phaser from "phaser";

export default class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }
  create() {
    this.graphics = this.add.graphics()
    this.shapes = new Array(15).fill(null).map(() => {
      return new Phaser.Geom.Circle(Phaser.Math.Between(0, 500), Phaser.Math.Between(0, 800), Phaser.Math.Between(20, 90))
    })

    this.rect = Phaser.Geom.Rectangle.Clone(this.cameras.main)

    this.draw()
  }
  update() {
    this.shapes.forEach((shape, i) => {
      shape.y += (1 + 0.1*1)
      shape.x += (1 + 0.1*1)
    })
    Phaser.Actions.WrapInRectangle(this.shapes, this.rect, 72)
    this.draw()
  }

  color(i) {
    return 0x001100 * (i % 15) + 0x1233dd*(i % 5)
  }
  draw() {
    this.graphics.clear()
    this.shapes.forEach((shape, i) => {
      this.graphics.fillStyle(this.color(i), 0.5).fillCircleShape(shape)
    })
  }
}