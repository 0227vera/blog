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
  // setTimeout(() => {
  //   reject('p1 msg')
  // }, 4000)
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
    // console.log(this.job)
  }
}
let worker = new Worker('xuanliao', 25, 'nongmin')
// console.log('------------>',Worker.self())

let obj = {
  a:1,
  b:2
}
for(let [key,value] of Object.entries(obj)){
  // console.log('--------->', key, value)
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
// console.log('--------->', assign({}, {a:2,b:3,c:4},{c:2,d:6}))

let test = [2,3,4,4,5,6,6,7,7,8,762,899,0,9,87,446,467,4352,87909,62]
let insertSort = arr => {
  let sortList = [arr[0]]
  for (let i = 0; i < arr.length - 1; i++) {
    let length = sortList.length
    // 如果取出的数字比已经排序的第一个值小，插在开头
    if (arr[i] < sortList[0]) {
      sortList.unshift(arr[i])
      continue
    }
    // 如果取出的数字比已经排序的最后一个值大，插在最后
    if (arr[i] > sortList[sortList.length-1]) {
      sortList.push(arr[i])
      continue
    }
    // 剩下的情况就是在sortList中间，把他揪出来，添加进去
    for (let j = 0; j < sortList.length-1; j++) {
      if (arr[i] >= sortList[j] && arr[i] <= sortList[j+1]) {
        sortList.splice(j,0,arr[i])
        break
      }
    }
  }
  return sortList
}
// console.log(insertSort(test))

let twoInsertSort = arr => {
  let sortList = [arr[0]] // sortList是已经有顺序的位置
  for (let i = 0; i < arr.length; i ++) {
    let get = arr[i]
    let left = 0;
    let right = sortList.length - 1

    // 每次找到sortList中间的数字进行比较，确定最终的索引位置
    while (left <= right) {
      let mid = parseInt((left + right) / 2) // 先去soltList中间的数字
      if (sortList[mid] > get) { // 如果大于当前的比较值， 则有序数组的中间值需要向左移动
        right = mid - 1 // 中间值向左移动
      } else {
        left = mid + 1 // 中间值的选取向右移动
      }
    }
    sortList.splice(left, 0, get)
  }
  return sortList
}
// console.log(twoInsertSort(test))

let hillSort = arr => {
  let step = Math.floor(arr.length / 2)
  for (; step > 0; step = Math.floor(step / 2)) { // 用于每次把步长减一半；当步长为0的时候终止循环
    for (let i = step; i < arr.length; i++) { // 对于数组后半部分遍历一次
      let j = i
      while (j - step >=0 && arr[j] < arr[j - step]) { // 这个地方实际上使用的就是冒泡排序
        [arr[j], arr[j - step]] = [arr[j - step], arr[j]] // 懒得再写一遍替换的函数了，这个地方直接使用结解构替换把
        j -=step // 每次跳着去寻找，这样就可以按照step找出相关的值，并且进行排序， 当然这一条可以不写，对结果也没有影响，写这个是为了减少while循环的次数
      }
    }
  }
  return arr
}
// console.log('--------------------')
// console.log(test)
// console.log('------------>', hillSort(test))

let quickSort = arr => {
  if (arr.length === 1 || arr.length === 0) { // 递归出去的唯一条件 随着数组的排序减半总为剪到1或者0（奇数偶数的差别）的，
    return arr
  }
  let [left, right] = [[],[]]
  let mid = Math.floor(arr.length / 2)
  let midVal = arr[mid]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[mid]) {
      left.push(arr[i])
    } else if (arr[i] > arr[mid]){
      right.push(arr[i])
    }
  }
  let leftArr = quickSort(left)
  let rightArr = quickSort(right)
  return leftArr.concat(midVal).concat(rightArr)
}
// console.log('<------------>', quickSort(test))




let heapAdjust = (arr, i = 0 , end = arr.length) => {
  let temp = arr[i]
  for (let j = 2 * i + 1; j < end; j =  2 * i + 1) {
    if (j < end && arr[j] < arr[j+1]) {
      ++j
    }
    if (temp >= arr[j]) {
      break
    }
    arr[i] = arr[j]
    i = j
  }
  arr[i] = temp
}
let heapSort = arr => {
  for (let i = arr.length / 2; i >= 0; i--) {
    heapAdjust(arr, i, arr.length)
  }
  for (let i = arr.length; i > 0; i--) {
    [arr[0], arr[i - 1]] = [arr[i - 1],arr[0]]
    heapAdjust(arr, 0, i - 2)
  }
  return arr
}

// console.log('===========>', heapSort(test))
console.log(test)



let mergeArray = (arr, first, mid, last, t) => {
  while (first <= mid && mid + 1 <= last) {
    if (arr[first] > arr[mid + 1]) {
      t.push(arr[mid+1])
    } else {
      t.push(arr[first])
    }
  }
  console.log('------>', t)
}
let mergeSort = (arr, first = 0, last= arr.length - 1, t = []) => {
  if (first < last) {
    let mid = Math.floor((first + last) / 2)
    mergeSort(arr, first, mid, t)
    mergeSort(arr, mid + 1, last, t)
    mergeArray(arr, first, mid, last, t)
  }
  console.log('tag', arr)
}
// mergeSort([4,5,6,2,34,5,76,8,90,4,2,5,7,90,0])

// 两个有序的数组合并成为一个有序的数组

let arrA = [0,1,2,3,4,5,6,55]
let arrB = [2,3,4,5,6,7,8,9,10]

let mergeSortAB = (arrA, ArrB) => {
  let arr = []
  while (arrA.length * arrB.length !== 0) {
    if (arrA[0] > arrB[0]) {
      arr.push(arrB[0])
      arrB.shift()
    } else {
      arr.push(arrA[0])
      arrA.shift()
    }
  }
  return arrA.length ? arr.concat(arrA) : arr.concat(arrB)
}
// console.log('===========>', mergeSortAB(arrA,arrB))

let uni = arr => arr.filter((item,index) => arr.indexOf(item) === index)

console.log(uni([1,1,1,1,1,1,1,1]))