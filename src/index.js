import Phaser from "phaser";
import bg from './assets/platformer-backdrop.png'
import cannon_head from './assets/cannon_head.png'
import cannon_body from './assets/cannon_body.png'
import chick from './assets/chick.png'

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
		this.load.image('bg', bg)
		this.load.spritesheet('chick', chick, { frameWidth: 16, frameHeight: 18 })
		this.load.image('cannon_head', cannon_head)
		this.load.image('cannon_body', cannon_body)
  }

  create() {
    this.anims.create({
			key: 'fly',
			frameRate: 10,
			frames: this.anims.generateFrameNumbers('chick', [0, 1,2,3]),
			repeat: -1
		})
		this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(2.5)
		var cannonHead = this.add.image(80, 495, 'cannon_head').setDepth(1)
		var cannonBody = this.add.image(80, 540, 'cannon_body').setDepth(1)
		var chick = this.physics.add.sprite(cannonBody.x, cannonBody.y-50, 'chick').setScale(2)
		var gfx = this.add.graphics().setDefaultStyles({lineStyle: {width: 10, color: 0xffff00, alpha: 0.5}})
		var line = new Phaser.Geom.Line()

		var ang = 0
		chick.disableBody(true, true)
		this.input.on('pointermove', (pointer) => {
			ang = Phaser.Math.Angle.BetweenPoints(cannonBody, pointer)
			cannonHead.rotation = ang
			Phaser.Geom.Line.SetToAngle(line, cannonBody.x, cannonBody.y-50, ang, 128)
			gfx.clear().strokeLineShape(line)
		})
		chick.setCollideWorldBounds(true)
		chick.setBounce(0.2)

		this.input.on('pointerup', () => {
			chick.enableBody(true, cannonBody.x, cannonBody.y-50, true, true)
			chick.play('fly')
			this.physics.velocityFromRotation(ang, 600, chick.body.velocity)
		})
  }

	

	update() {
		
	}
}

const config = {
  type: Phaser.AUTO,
  parent: "bird",
  backgroundColor: '#73c9e5',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
			gravity: {
				y: 300,
				debug: false
			}
    }
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
