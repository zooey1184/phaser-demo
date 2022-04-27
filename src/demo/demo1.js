import Phaser from "phaser";
// import Platform from '../assets/platform.png'
import Dimian from '../assets/1/dimian.png'
import star from '../assets/star.png'
import zhantai from '../assets/1/zhantai.png'
import chengqiang from '../assets/1/chenqiang.png'
import zhuzi from '../assets/1/zhuzi.png'

export default class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }

  preload(){
    this.load.image('platform', Dimian)
    this.load.image('star', star)
    this.load.image('zhantai', zhantai)
    this.load.image('zhuzi', zhuzi)
  }

  create() {
    const {width, height} = this.sys.game.config
    // const platform = this.physics.add.image(0, 0, 'platform')
    const group = this.physics.add.staticGroup()
    
    const platform = group.create(0, 0, 'platform')
    // platform.setCollideWorldBounds(true)
    const SCALE = width/platform.width
    const zhuzi = group.create(0, 300, 'zhuzi').setScale(SCALE, SCALE).refreshBody()
    
    

    platform.setScale(SCALE)
    Phaser.Display.Align.In.BottomCenter(platform, this.add.zone(width/2, (height+platform.height*SCALE+4)/2, width, height))
    const zhantai = group.create(130, platform.y-platform.height*SCALE-10, 'zhantai').setScale(SCALE)
    Phaser.Display.Align.In.BottomLeft(zhuzi, this.add.zone((width-zhuzi.width/2)/2, (height+(zhuzi.height + zhuzi.height*SCALE*0.22)/2-platform.height*SCALE)/2, width, height))
    // Phaser.Display.Align.In.LeftCenter(zhu_m, this.add.zone((width-45)/2, (height-46)/2, width, height))
    // Phaser.Display.Align.In.TopLeft(zhu_t, this.add.zone((width-45)/2, (height+100)/2, width, height))
    // zhantai.setCollideWorldBounds(true)
    // this.physics.add.collider(platform, zhantai)
    
    // Phaser.Display.Align.In.BottomCenter(platform, this.add.zone(width/2, (height+platform.height*1/SCALE)/2, width, height+platform.height*1/SCALE))
    // Phaser.Display.Align.In.BottomCenter(starImg, this.add.zone(width/2, (height-container.height)/2, width, height-platform.height))
  }
}