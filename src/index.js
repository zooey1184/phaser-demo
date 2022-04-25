import MyGame from "./demo/demo1";

const H = window.innerHeight
const W = window.innerWidth

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  backgroundColor: '#231c1a',
  width: W,
  height: H,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    min: {
      width: 300,
      height: 600
    },
    max: {
      width: 450,
      height: 1200
    }
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
