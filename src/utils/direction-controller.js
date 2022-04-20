// 虚拟方向控制器
const vDirectionController = (__this, config) => {
  const {size=60, x, y, offset,} = config
  const OFFSET = offset || size/2
  // 绘制两个圆
	const circleWrap = __this.add.circle(0, 0, size, 0xffffff, 0.2)
	const circleInset = __this.add.circle(0,0, size/2, 0xd3f4ee, 0.1).setInteractive()
	__this.add.container(x, y, [circleWrap, circleInset])
  // 设置可拖动
	__this.input.setDraggable(circleInset)
  // 拖动定位计算
	__this.input.on('drag', (pointer, obj, x, y) => {
		var d = Math.sqrt(x**2+y**2)
		if (d > OFFSET) {
			d = OFFSET
		}
		var r = Math.atan2(y, x);
		obj.x = Math.cos(r)*d
		obj.y = Math.sin(r)*d
	})
  // 还原
	__this.input.on('dragend', (pointer, obj, x,y) => {
		obj.x = 0
		obj.y = 0
	})
  // 返回需要可计算对象
	return circleInset
}

export default vDirectionController