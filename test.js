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
Func1.prototype.sayHello = function (){
  console.log(`修改一下----------->i am ${this.name},${this.age} years old`)
}
func1.sayHello()
// Func1