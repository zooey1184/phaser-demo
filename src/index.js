import Phaser from "phaser";
import touch from './assets/touch.png'
import vDirectionController from './utils/direction-controller'

var player;
var controller
class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
		this.load.spritesheet('touch', touch, {frameWidth: 64, frameHeight: 64})
  }

  create() {
    player = this.add.sprite(300, 180, 'touch', 2)
		controller = vDirectionController(this, {size: 80, x: 100, y: 400})
  }

	

	update() {
		player.x += controller.x/10
		player.y += controller.y/10
	}
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  backgroundColor: '#141414',
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
