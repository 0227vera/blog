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
  // console.log(a, data)
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

// function f() {
//   console.log('I am outside!');
// }

// (function () {
//   if (false) {
//     // 重复声明一次函数f
//     function f() {
//       console.log('I am inside!');
//     }
//   }

//   f();
// }());

let [x = 1] = [null];
// x = null

[
  [1, 2],
  [3, 4]
].map(([a, b]) => a + b);
// [3,7] 
// [[3],[7]] 

01 + 02 === 03 //  

let getTempItem = id => ({
  id: id,
  name: "Temp"
})
let arr = [1, 2, 35, 5, 6, 7]

let aa = arr.map(item => ({
  a: item + 1,
  b: 'name'
}))
console.log('-------------')

function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  setInterval(() => this.s1++, 1000)
  setInterval(function () {
    this.s2++
  }, 1000)
}
// var timer = new Timer()
// setTimeout(() => {
//   console.log(`s1: ${timer.s1}`)
// }, 3100)
// setTimeout(() => {
//   console.log(`s2: ${timer.s2}`)
// }, 3100)
console.log('aa---------------aa')

function insert(value) {
  return {
    into: function (arr) {
      return {
        after: function (afterValue) {
          arr.splice(arr.indexOf(afterValue + 1), 0, value)
          return arr
        }
      }
    }
  }
}
console.log('----------->', insert(2).into([1, 3]).after(1))
console.log('-----------------')

var _insert = value => ({
  into: arr => ({
    after: afterValue => {
      arr.splice(arr.indexOf(afterValue + 1), 0, value)
      return arr
    }
  })
})
console.log('----------->', _insert(2).into([1, 3]).after(1))
console.log('-----------------')
const plus1 = a => a + 1
const plus2 = a => a * 2
const muilt = val => plus2(plus1(val))
console.log(muilt(5))

console.log('------------------------')

function factorial(n, total = 1) {
  if (n === 1) return total
  return factorial(n - 1, n * total) // 这个地方式尾调用
}
console.log(factorial(5))
console.log('--------------')

function Fibonacci(n, total1 = 1, total2 = 1) {
  if (n <= 1) return total2
  return Fibonacci(n - 1, total2, total1 + total2)
}
console.log(Fibonacci(10)) // 89
console.log(Fibonacci(100)) // 573147844013817200000

function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
// 改写sum函数
let sum = (x, y) => {
  if (y) return sum.bind(null, x + 1, y - 1)
  return x
}
console.log(trampoline(sum(1, 100)))

let find = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(find.find(item => item > 3))

console.log('------------')

let Arr = (n, arr = []) => {
  if (!n) return arr
  arr.unshift(n)
  return Arr(n - 1, arr)
}
// console.log(Arr(10000))

console.log(Array.from(new Array(10)).map((item, index) => index + 1))

function down(arr) {
  return isMulti(arr) ? down(Array.prototype.concat.apply([], arr)) : arr // 这个地方返回down的时候属于尾递归
}

function isMulti(arr) {
  // let result = false
  // arr.forEach(item => {
  //   if(isArray(item)){
  //     result = true
  //   }
  // })
  return arr.some(item => isArray(item))
}

function isArray(type) {
  return Object.prototype.toString.call(type).match(/\[object (.*?)\]/)[1].toLowerCase() === 'array'
}
console.log('---------------->', down([1, 2, 3, 4, [5, 6, 7, [8, 9]]]))
console.log('---------------')

const pro1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p1 msg')
  }, 4000)
})
const pro2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(pro1)
  }, 1000);
})
pro2.then(data => console.log('------------>', data)).catch(err => console.log('==========>', err))

class Person { // 类声明
  constructor(name, age) { // 构造函数
    this.name = name
    this.age = age
  }
  static self() { // 不会被实例继承，实例没有此方法 但是可以被继承
    this._static = 'test' // 这里的this始终指向类，不会指向实例
    return 'test'
  }
  // static _count = 0 // 静态属性
  showName() {
    console.log(this.name)
  }
  shoeAge() {
    console.log(this.age)
  }
}
Person._count = 0 // 静态属性

class Worker extends Person { // 继承
  constructor(name, age, job) {
    super(name, age) // 父类/超类
    this.job = job
  }
  static self(){
    return super.self() + 'children'
  }
  showJob() {
    console.log(this.job)
  }
}
let worker = new Worker('xuanliao', 25, 'nongmin')
console.log('------------>',Worker.self())

let obj = {
  a:1,
  b:2
}
for(let [key,value] of Object.entries(obj)){
  console.log('--------->', key, value)
}

function assign() {
  if (arguments.length === 0) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  let target = arguments[0]
  let args = [].slice.call(arguments)
  args.forEach(item => {
    for(let [key,value] of Object.entries(item)){
      target[key] = value
    }
  })
  return target
}
console.log('--------->', assign({}, {a:2,b:3,c:4},{c:2,d:6}))