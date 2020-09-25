function Suber(name, age) {
  this.name = name
  this.age = age
  this.method = function () {
    console.log('this is suber method')
  }
}

Suber.prototype.color = '#333333'
Suber.prototype.sayHello = function () {
  console.log('hi Hello')
}

// 先拿到自身属性和方法
function Sub(name, age, value) {
  Suber.call(this, name, age)
  this.value = value
}
// 再拿原型的属性和方法
Sub.prototype = Suber.prototype
Sub.prototype.constructor = Sub

// let s = new Sub('xuanliao', 27, 'nick')
// console.log('---------->', s.name, s.age, s.value, s.color)
// s.sayHello()

// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner


// function LazyMan (name) {
//   console.log('Hi I am ' + name)
//   return LazyMan
// }

// LazyMan.sleep = function (time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(LazyMan)
//     }, time * 1000);
//   })
// }

// LazyMan.eat = function (food) {
//   console.log('I am eating ' + food)
//   return LazyMan
// }
// console.log('--------->', LazyMan('Tony').eat('lunch').sleep())

class LazyManClass {
  constructor (name) {
    this.name = name
    this.taskList = []
    console.log(`Hi I am ${this.name}`)
    setTimeout(() => {
      this.next()
    }, 0);
  }
  next(){
    const func = this.taskList.shift()
    func && func()
  }
  eat (food) {
    const _this = this
    const fn = function (f) {
      return function () {
        console.log(`I am eating ${f}`)
        _this.next()
      }
    }(food)
    this.taskList.push(fn)
    return this
  }
  sleep (time) {
    const _this = this
    const fn = function (t) {
       return function () {
        setTimeout(() => {
          console.log(`sleep ${t}s`)
          _this.next()
        }, t * 1000);
       }
    }(time)
    this.taskList.push(fn)
    return this
  }
}

function LazyMan (name) {
  return new LazyManClass(name)
}

LazyMan('Tony').eat('lunch').eat('dinner').sleep(1).eat('junk food');