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
console.log('-------------')
let list = [0, 1, 2, 3, 4, 5, 6]

while (list.shift()) {
  list.shift()
}
console.log(list)
console.log('-----------')

function add(prev, cur) {
  return prev + cur;
}

// [].reduce(add)
// TypeError: Reduce of empty array with no initial value
console.log([].reduce(add, 1))
console.log('----------------')
async function show() {
  let a = 5
  let b = 6
  let data = await new Promise((resolve, reject) => {
    a = 3
    resolve({
      a: 3,
      b: 4
    })
  });
  console.log(a, data)
}
// 普通函数---一直执行，知道结束
// async/await函数---能够“暂停”
show()
console.log('-------------')
var a = 123
if (true) {
  a = 'abc'
  // let a
}

// let bar = (x = y, y = 2) => [x, y]
// bar();

function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());