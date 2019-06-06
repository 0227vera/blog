function Func(name, age) {
  this.name = name
  this.age = age
  this.sayHello = function () {
    console.log(`i am ${this.name},${this.age} years old`)
  }
}
let func = new Func('liaoxuan', 25)
func.sayHello()
// 如果有多个Func的实例,此时如果我想修改sayHello方法,只能一个一个让实例去修改,显然这是不不好的
function Func1(name, age) {
  this.name = name
  this.age = age
}
Func1.prototype.sayHello = function () {
  console.log(`i am ${this.name},${this.age} years old`)
}
let func1 = new Func1('xuanliao', 23)
Func1.prototype.sayHello = function () {
  console.log(`修改一下----------->i am ${this.name},${this.age} years old`)
}
func1.sayHello()

function P() {

}

console.log('---------------------------------------')

function P1() {

}
P1.prototype = new P()
P1.prototype.constructor = P1

var p1 = new P1()
console.log(p1.constructor)
// // ...............................................



p1.constructor === P1


var p2 = new p1.constructor() // P1

console.log('--------------------------')
// 最快去除数组合集和交集的方法吧
function to(arr1 = [], arr2 = []) {
  return {
    intersection: new Set([...arr1, ...arr2]),
    collection: arr1.filter(item => ~arr2.indexOf(item))
  }
}
console.log(
  to([1, 2, 3, 4], [3, 4, 5, 6])
)

console.log('----------------------------')
var before = [{
  id: '1',
  title: '2018年5月工资',
  month: 201805
}, {
  id: '2',
  title: '2018年6月奖金',
  month: 201806
}, {
  id: '3',
  title: '2018年6月工资',
  month: 201806
}, {
  id: '4',
  title: '2018年5月奖金',
  month: 201805
}]

var after = [{
  month: 201805,
  list: [{
    id: '232131das',
    title: '2018年5月工资',
    month: 201805
  }, {
    id: '232131das',
    title: '2018年5月奖金',
    month: 201805
  }]
}, {
  month: 201806,
  list: [{
    id: '232131das',
    title: '2018年6月工资',
    month: 201806
  }, {
    id: '232131das',
    title: '2018年6月奖金',
    month: 201806
  }]
}]

function merge(arr) {
  var result = []
  var static = []

  arr.forEach(item => {
    if (!~static.indexOf(item.month)) {
      static.push(item.month)
    }
  })

  static.forEach((item, index) => {
    var list = []
    arr.forEach(re => {
      if (item === re.month) {
        list.push(re)
        result[index] = {
          month: item,
          list
        }
      }
    })
  })
  return result
}
console.log(merge(before))

console.log('---------------------')

function su() {

}

function s() {
  su.call(this)
}

s.prototype = new su()
s.prototype.constructor = s

let tu = new su()
let t = new s()
tu.con = function () {
  console.log(333)
}
// su.con()


function _new() {
  var args = [].slice.call(arguments)
  var constructor = args.shift()
  var context = Object.create(constructor.prototype) // 拿到原型上的方法和属性
  var result = constructor.apply(context, args) // 拿到自身的属性和方法
  return (typeof result === 'object' && result != null) ? result : context
}
// _new(Func, 'haha', 23)


// 判断设备类型的方法，设备像素比
const ua = window.navigator.userAgent;

const isWeixin = /MicroMessenger/i.test(ua);
const isAndroid = /Android/i.test(ua);
const isIOS = /iP[hone|ad|od] OS/i.test(ua);
const isIphone = /iPhone/i.test(ua);

// iphoneX iphoneXS 刘海高度 30px
const isIphoneX = !!(isIphone && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812);

// 刘海高度： 44px
const isIphoneXSMAX = !!(isIphone && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896);

// 刘海高度 33px
const isIphoneXR = !!(isIphone && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896);

// iPhoneX版本以上的刘海屏
const isIphoneXup = isIphoneX && isIphoneXSMAX && isIphoneXR;

export default {
  isWeixin,
  isAndroid,
  isIOS,
  isIphone,
  isIphoneX,
  isIphoneXSMAX,
  isIphoneXR,
  isIphoneXup
}