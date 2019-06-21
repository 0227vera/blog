# class
之前就说过，在其他语言中比如java，php都会用class来做面向对象，但es5就没有使用原型和构造方法来实现的，这样就是真的没有标准了，每个人的写法都可以不一样，而且每个人都没有错误，这对项目团队的研发来讲，老好玩了

说class和面向对象之前先简单的看一下语言的发展史

> 机器语言 -> 汇编语言 -> 低级语言（底层语言，面向过程 eg：C） -> 高级语言（面向对象） -> 模块系统 -> 框架 -> 系统接口（API）

## ES5的面向对象
ES5面向对象---只能算是半面向对象
```js
function Person (name,age) {
  this.name = name
  this.age = age
}
Person.prototype.showName = function () {
  console.log(this.name)
}
Person.prototype.showAge = function () {
  console.log(this.age)
}
function Worker(name,age,job) {
  Person.call(this,name,age)
  this.job = job
}

Worker.prototype = Object(Person.prototype)
Worker.prototype.constructor = Worker

Worker.prototype.showJob = function () {
  console.log(this.job)
}

let person = new Person('liaoxuan', 12)
person.showName()
```

## ES6的面向对象
```js
class Person { // 类声明
  constructor (name, age) { // 构造函数
    this.name = name
    this.age = age
  }
  static self(){ // 不会被实例继承，实例没有此方法 但是可以被继承
    this._static = 'test' // 这里的this始终指向类，不会指向实例
  }
  showName () {
    console.log(this.name)
  }
  shoeAge () {
    console.log(this.age)
  }
}

class Worker extends Person { // 继承
  constructor (name, age, job) {
    super(name,age) // 父类/超类
    this.job = job
  }
  showJob () {
    console.log(this.job)
  }
}
let worker = new Worker('liaoxuan', 23 , 'net worker')
worker.shoeAge()
worker.showName()
worker.showJob()
```

两个比较：ES6的好处
1. 省事，有标准
2. 便于扩展


<back-to-top />