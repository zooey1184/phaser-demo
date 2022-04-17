import Phaser from "phaser";
import ground from './assets/platform.png'
import star from './assets/star.png'
import dude from './assets/dude.png'
import bomb from './assets/bomb.png'
import button from './assets/button.png'

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var bombs;
var gameOver = false;
var Button;
var movePlatform

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
		this.load.image('ground', ground)
		this.load.image('pane', ground)
		this.load.image('star', star)
		this.load.image('bomb', bomb)
    this.load.spritesheet('dude', dude, {frameWidth: 32, frameHeight: 48})
		this.load.spritesheet('button', button, {frameWidth: 193, frameHeight: 71})
  }

  create() {
    platforms = this.physics.add.staticGroup();
		platforms.create(400, 568, 'ground').setScale(2).refreshBody()
		platforms.create(600, 400, 'ground')
		platforms.create(50, 250, 'ground')
		platforms.create(750, 200, 'ground')
		
		player = this.physics.add.sprite(100, 450, 'dude')
		player.setBounce(0.2)
		player.setCollideWorldBounds(true)
		scoreText = this.add.text(16, 16, 'score: 0', {fontSize: 32, fill: '#333'})

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'right',
			frameRate: 10,
			frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
			repeat: -1
		})
		this.anims.create({
			key: 'turn',
			frames: [{key: 'dude', frame: 4}],
			frameRate: 20,
		})
		// player.body.setGravityY(300) // 设置重力系统
		this.physics.add.collider(player, platforms)

		bombs = this.physics.add.group()
		this.physics.add.collider(bombs, platforms)

		cursors = this.input.keyboard.createCursorKeys()

		movePlatform = this.physics.add.image(200, 340, 'pane')

		// movePlatform.setCollideWorldBounds(true)
		// // movePlatform.setGravityY(-800)
		// movePlatform.setImmovable()
		// movePlatform.setVelocityX(200)
		// movePlatform.setBounceX(1)
		this.physics.add.collider(movePlatform, player)

		movePlatform.setImmovable(true)
		movePlatform.body.setAllowGravity(false)
		movePlatform.setVelocityX(100)
		// movePlatform.setBounceX(1)
		// movePlatform.setCollideWorldBounds(true)

		stars = this.physics.add.group({
			key: 'star',
			repeat: 11,
			setXY: {
				x: 12,
				y: 0,
				stepX: 70
			}
		})
		stars.children.iterate((child) => {
			child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4))
		})
		this.physics.add.collider(stars, movePlatform)

		this.physics.add.collider(stars, platforms)

		function collectStar(player, star) {
			star.disableBody(true, true)
			score += 10
			scoreText.setText('score: ' + score)

			if (stars.countActive(true) === 0) {
				stars.children.iterate((child) => {
					child.enableBody(true, child.x, 0, true, true)
				})

				var X = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
				var bomb = bombs.create(X, 16, 'bomb')
				bomb.setBounce(1)
				bomb.setCollideWorldBounds(true)
				bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
				bomb.allowGravity = false
			}

		}
		this.physics.add.overlap(player, stars, collectStar, null, this)
		

		function handleClick () {
			console.log('object');
			this.physics.resume()
			score = 0
			scoreText.setText('score: 0')
			Button.visible = false
			player.setTint()
		}
		function hitBomb(player, bomb) {
			this.physics.pause()
			player.setTint(0xff0000)
			player.anims.play('turn')
			gameOver = true
			if (Button) {
				Button.visible = true
				Button.once('pointerup', handleClick, this)
			} else {
				Button = this.add.image(400, 300, 'button').setInteractive()
				Button.once('pointerup', handleClick, this)
			}
			
		}
		this.physics.add.collider(player, bombs, hitBomb, null, this)
  }

	

	update() {
		if (cursors.left.isDown) {
			player.setVelocityX(-160)
			player.anims.play('left', true)
		} else if (cursors.right.isDown) {
			player.setVelocityX(160)
			player.anims.play('right', true)
		} else {
			player.setVelocityX(0)
			player.anims.play('turn')
		}
		if(movePlatform.x >= 700) {
			movePlatform.setVelocityX(-100)
		} else if (movePlatform.x <= 200) {
			movePlatform.setVelocityX(100)
		}
		if (cursors.up.isDown && player.body.touching.down) {
			player.setVelocityY(-330)
		}
	}
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
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
