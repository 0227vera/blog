/**
 * 交通灯问题
 * @param {Object} initcolor 初始化颜色
 * @param {Object} durations 每个颜色停留时间
 * @methods changeColor 改变当前灯的颜色
 * @methods changeDurations 改变当前灯的停留时间
 * @methods pause 暂停
 * @methods turnon 继续
 */

const LIGHTS = ['red', 'green', 'yellow']

const sleep = (delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

class TrafficLightClass {
  constructor({ initcolor = 'red', durations = [10, 20, 3] } = {}) {
    this.currentColor = initcolor
    this.durations = durations
    this._isPauseing = false
    this._reamin_diff = 0
    this.eventBus = new Map()
    this.eventBus.set('change', new Set())
    this.eventBus.set('tick', new Set())
    this.setTime()
    this._exchange()
  }

  get nextColor() {
    return LIGHTS[(LIGHTS.indexOf(this.currentColor) + 1) % LIGHTS.length]
  }

  get remain() {
    if (this._isPauseing) {
      return this._reamin_diff
    }
    let diff = this.end - Date.now()
    if (diff < 0) {
      diff = 0
    }
    return diff / 1000
  }

  on(event, handle) {
    this.eventBus.get(event).add(handle)
  }

  off(event, handle) {
    this.eventBus.get(event).delete(handle)
  }

  emit(event) {
    this.eventBus.get(event).forEach(item => {
      item.call(this, this)
    })
  }

  async _exchange() {
    if (this._isPauseing) {
      this.emit('tick')
      await sleep()
      this._exchange()
      return
    }
    await 1
    if (this.remain > 0) {
      // note: 不需要切换
      this.emit('tick')
      await sleep()
    } else {
      // note: 需要切换交通灯了
      this.currentColor = this.nextColor
      this.emit('change')
      this.setTime()
    }
    this._exchange()
  }

  setTime() {
    this.start = Date.now()
    if (this._reamin_diff) {
      this.end = this.start + this._reamin_diff * 1000
      return
    }
    console.log('------->', this.currentColor)
    this.end = this.start + this.durations[LIGHTS.indexOf(this.currentColor)] * 1000
  }

  changeColor(color) {
    if (!LIGHTS.includes(color)) {
      return
    }
    this.currentColor = color
    this.setTime()
  }

  changeDurations(times) {
    this.durations = times
  }

  pause() {
    if (this._isPauseing) {
      return
    }
    this._reamin_diff = this.remain
    this._isPauseing = true
  }

  turnon() {
    if (!this._isPauseing) {
      return
    }
    this._isPauseing = false
    this.setTime()
    this._reamin_diff = 0
  }
}

const trafficLight = new TrafficLightClass({
  initcolor: 'red',
  durations: [10, 20, 3]
})

// note: 页面暂时当前灯以及还有多长时间切换
trafficLight.on('tick', e => {
  console.log('tick', e.currentColor, Math.round(e.remain))
})

// note: 改变停留时间
// trafficLight.changeDurations([2,3,4])

// note: 改变颜色（模拟按钮的点击，人工操作）
// setTimeout(() => {
//   trafficLight.changeColor('green')
// }, 3 * 1000)

// note: 暂停（模拟按钮的点击，人工操作）
// setTimeout(() => {
//   trafficLight.pause()
// }, 5 * 1000)

// note: 继续（模拟按钮的点击，人工操作）
// setTimeout(() => {
//   trafficLight.turnon()
// }, 10 * 1000)

// 监听灯变化的状态
trafficLight.on('change', e => {
  console.log('change:', e.currentColor)
})