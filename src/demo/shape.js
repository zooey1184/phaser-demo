import Phaser from "phaser";

export default class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {

  }

  create() {
    const r1 = this.add.circle(100, 100, 40, 0x1890ff, 0.5)
    this.tweens.add({
      targets: r1,
      repeat: -1,
      alpha: 0.1,
      yoyo: true,
      ease: 'Sine.easeInOut'
    })

    const r2 = this.add.circle(400, 100, 40)
    r2.setStrokeStyle(2, 0x4466ff)

    this.tweens.add({
      targets: r2,
      repeat: -1,
      scale: 0.4,
      yoyo: true,
      ease: 'linear'
    })

    const r3 = this.add.circle(100, 300, 50, 0x3344ee)
    r3.setIterations(0.2)

    this.tweens.add({
      targets: r3,
      yoyo: true,
      repeat: -1,
      ease: 'easeInOut',
      angle: 90
    })
  }

  update() {

  }
}