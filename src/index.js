import Phaser from "phaser";
import Ship from './assets/bsquadron1.png'
import bullet from './assets/bullet7.png'

class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet')
	}

	fire(x, y) {
		this.body.reset(x, y)
		this.setActive(true)
		this.setVisible(true)
		this.setVelocityY(-300)
	}
	preUpdate(time, delta) {
		super.preUpdate(time, delta)
		if (this.y <= -32) {
			this.setActive(false)
			this.setVisible(false)
		}
	}
}

class Bullets extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene)

		this.createMultiple({
			frameQuantity: 10,
			key: 'bullet',
			active: false,
			visible: false,
			classType: Bullet
		})
	}

	fireBullet(x, y) {
		let bullet  = this.getFirstDead(false)
		if (bullet) {
			bullet.fire(x, y)
		}
	}
}

class MyGame extends Phaser.Scene {
  constructor() {
    super();
		this.ship;
		this.bullets
  }

  preload() {
		this.load.image('ship', Ship)
		this.load.image('bullet', bullet)
  }

  create() {
    // this.ship = this.add.image(500, 400, 'ship')
		this.ship = this.physics.add.image(500, 400, 'ship')
		this.ship.setCollideWorldBounds(true)
		this.bullets = new Bullets(this)

		this.input.on('pointermove', (pointer) => {
			this.ship.x = pointer.x
		})
		this.input.on('pointerdown', (pointer) => {
			this.bullets.fireBullet(this.ship.x, this.ship.y)
		})
  }

	

	update() {
		
	}
}

const config = {
  type: Phaser.AUTO,
  parent: "bullet",
  backgroundColor: '#141414',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
			gravity: {
				y: 0,
				debug: false
			}
    }
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
