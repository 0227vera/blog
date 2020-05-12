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

let s = new Sub('xuanliao', 27, 'nick')
console.log('---------->', s.name, s.age, s.value, s.color)
s.sayHello()