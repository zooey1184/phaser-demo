import MyGame from "./demo/demo1";

const H = window.innerHeight
const W = window.innerWidth

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  backgroundColor: '#f9f9f9',
  width: W,
  height: H,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH
  },
  title: 'zooeyGame',
  version: '1.0.0',
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
