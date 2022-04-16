import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import Cat1 from './assets/cat1.png'
import Cat2 from './assets/cat2.png'
import Cat3 from './assets/cat3.png'
import Cat4 from './assets/cat4.png'
class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('cat1', Cat1)
    this.load.image('cat2', Cat2)
    this.load.image('cat3', Cat3)
    this.load.image('cat4', Cat4)
    // this.load.image("logo", logoImg);
  }

  create() {
      this.anims.create({
          key: 'anmis',
          frames: [
            {key: 'cat1'},
            {key: 'cat2'},
            {key: 'cat3'},
            {key: 'cat4', duration: 50},
          ],
          frameRate: 10,
          repeat: -1
      })

      this.add.sprite(400, 300, 'cat1').play('anmis')
      
    // const logo = this.add.image(400, 150, "logo");

    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: "Power2",
    //   yoyo: true,
    //   loop: -1,
    // });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  backgroundColor: '#1890ff',
  width: 800,
  height: 600,
  scene: MyGame,
};

const game = new Phaser.Game(config);
