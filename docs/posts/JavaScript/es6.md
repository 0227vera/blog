---
sidebarDepth: 3
collapsable: true
---

# ES6

## 箭头函数

箭头函数可以用于解决this混乱的问题，而this的问题在es5中真的是很让人恶心的东西

简写

1. 如果有且仅有一个参数，()也可以不写
2. 如果有且仅有一个语句，return，{}也可以不写

### 基本用法

```js
let func = v => v
// <!-- <====> -->
function func(v){
  return v
}
```

如果箭头函数不需要参数或者需要多个参数，就可以

```js
let sum = (a,b,c) => a+b+c
// ES5
function sum(a,b,c){
  return a+b+c
}
```

如果箭头函数的代码块多余一条语句，就要使用大括号将他们括起来，并且使用`return`语句返回

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

```js
  let getTempItem = id => { id: id, name: "Temp" } // error
  // 正确的写法
  let getTempItem = id => ({ id: id, name: "Temp" })
  <!-- <====> -->
  function getTempItem (id) {
    return { id: id, name: "Temp" }
  }

  // 有一个特殊的情况需要注意，
  let foo = () => { a: 1 } // 不报错，但是得不到想要的值
  foo() // undefined
```

上面`foo`中，原始意图是返回一个对象{ a: 1 }，但是由于引擎认为大括号是代码块，所以执行了一行语句a: 1。这时，a可以被解释为语句的标签，因此实际执行的语句是1;，然后函数就结束了，没有返回值。

至于`() => {}`的应用那就太多太多了，相信用过的话都应该会比较喜欢的

### 使用注意点

箭头函数使用又几个使用注意点

1. 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象，这一点很重要，在使用的时候这一点大多数时候会给你带来好处
2. 不可以当作构造函数，也就是说，不可以使用`new`命名，否则会抛出错误
3. 不可以使用`arguments`对象，该对象在函数体内不存在，如果要是使用，可以使用`rest`参数数组代替
4. 不可以使用`yield`命令，因此箭头函数不能用作 `Generator` 函数。

解释一下上面的原因

1. this对象的指向是可变的，但是在箭头函数中，它是固定的。

```js
function foo() {
  setTimeout(() => {
    console.log('id:', this.id); // 这个地方this如果不使用call就是指向window，输出21
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
```

```js
function Timer () {
  this.s1 = 0;
  this.s2 = 0;
  setInterval(() => this.s1++,1000) // 这段代码中，此处的this指向Timer的实例上的变量也就是timer
  setInterval(function(){
    this.s2++ // 这个地方的this指向window
  },1000)
}
var s2 = 0
var timer = new Timer()
setTimeout(() => {console.log(`s1: ${timer.s1}`),3100})
setTimeout(() => {console.log(`s2: ${timer.s2}`),3100}) // 打印的s2根本就没有走过第二个计时器
```

2. 为什么`() => {}`不能作为构造函数，就是因为`this`的原因

```js
let handle = {
  id:'asfhqj3rqlfhasldfqhl3r2q3jh4234',
  init:function () {
    document.addEventListener('click',event => this.doSomeThing(event.type)) // 这里的this指向handle，调用deSomeThing方法
  },
  doSomeThing: function (type) {
    console.log(`Handling ${type} for ${this.id}`)
  }
}
```

<font color=red>`this`指向的固定化，并不是因为箭头函数内部有绑定`this`的机制，实际原因是箭头函数根本没有自己的`this`，导致内部的`this`就是外层代码块的`this`。正是因为它没有`this`，所以也就不能用作构造函数。这也是我们所说的`this`会`窜出去`的原因</font>

```js
function foo(){
  return () => {
    return () => {
      return () => {
        console.log(`id: ${this.id}`)
      }
    }
  }
}
var f = foo.call({id:1}) // 对于f来讲就在此时此刻已经定下来this就是{id:123}

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
// 在下面三个函数执行之前this就已经窜出去指向第一个f了
```

除了`this`，还有三个变量在箭头函数之中也是不存在的 `arguments`、`super`、`new.target`

```js
(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
    // (() => this.x))()
  ];
}).call({ x: 'outer' });
// ['outer']
```

上面的代码，因为箭头函数是没有`this`的，所以bind是没有效果的，`this`会窜出到`return`外面一层

### 不适合使用箭头函数的场合

1. 定义对象的方法,不要使用箭头函数

```js
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--; // 这个地方的this指向的是全局作用域
  }
}
```

2. 需要动态`this`的时候，不要使用箭头函数

```js
  var button = document.getElementById('press');
    button.addEventListener('click', () => {
    this.classList.toggle('on'); // 这个地方的this指向的是全局作用域，而不是button
  });
```

### 嵌套的箭头函数

箭头函数的嵌套我觉得就是书写简单，增强可读性，见仁见智吧

```js
function insert(value) {
  return { into: function (arr) {
    return { after: function (afterValue) {
          arr.splice(arr.indexOf(afterValue + 1), 0, value)
          return arr
        }
      }
    }
  }
}
insert(2).into([1,3]).after(1) // [1,2,3]
```

使用es6的箭头函数的书写

```js
let insert = value => ({
    into: arr => ({
        after: afterValue => {
          arr.splice(arr.indexOf(afterValue+1), 0, value)
          return arr
        }
      })
    })

insert(2).into([1,3]).after(1) // [1,2,3]
```

效果是一样的

管道`pipeline`机制

```js
  const pipeline = (...funcs) =>
    val => funcs.reduce((a,b) => b(a),val)
  const plus1 = a => a + 1
  const plus2 = a => a * 2
  const add = pipeline(plus1,plus2)
  add(5) // 12
```

讲道理，上面的代码有点装X，下面的写法还是朴实无华的

```js
const plus1 = a => a + 1
const plus2 = a => a * 2
const muilt = val => plus2(plus2(val))
```

接下来要说的与箭头函数无关，而是说的一种很高效的方法或者说模式吧

### 尾调用优化

什么是尾调用？

尾调用（`Tail Call`）是函数式编程的一个重要概念，本身非常简单，就是指某个函数的最后一步式调用另一个函数

```js
function f (x) {
  return g (x)
}
```

以下三种均不算是尾调用

1. 运算之后

```js
function f (x) {
  let y = g (x) // 在这个地方进行一些操作
  return y // 最后一步(并不一定式在函数的尾部)并不是调用另一个函数
}
```

2. 调取函数并运算（这种最容易搞混淆）

```js
function f (x) {
  return g (x) + 1 // 这种情况也不是尾调用，调用后还有操作，并不能把f的调用帧砍掉
}
```

3. 无`return`

```js
function f (x) {
  g (x)
}
// <=========>
function f (x) {
  g (x)
  return undefined
}
```

尾调用之所以和其他的调用不同，就在于它的特殊的调用位置

函数调用会在内存形成一个“调用记录”，又称“调用帧”（`call frame`），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方还会形成一个B的调用帧，等B运行结束后，将结果返回给A，B的调用帧才会消失，（因为这个时候跟B没什么关系了），如果函数B内部调用函数C，那就还有一个C的调用帧，以此类推，所有的调用帧就形成了一个“调用栈”（`call stack`）

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了，因为是这样，所以可以省去至少一个调用帧，优化存在内存里面的数据

```js
function f () {
  let a = 1
  let b = 2
  return g (a + b)
}
f()
// <==========>
function f (){
  return g (3)
}
f()
<==========> // 在这一步的时候将f的调用帧删除
g(3)
```

上面的调用就是“尾调用优化”，即只保留内层函数的调用帧，如果所有的函数都是尾调用，那么完全可以做到每次执行的时候，调用帧只有一项，这将大大节省内存，这就是“尾调用优化”的意义

所有尾调用，反正我第一时间想起来的式`递归`

### 尾递归

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上万个调用帧，很容易发生“栈溢出”错误（`stack overflow`）。但是对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”的错误

```js
function factorial (n) {
  if (n === 1) return 1
  return n * factorial( n - 1 ) // 这个显然不是尾调用，出了调用还有其他的操作
}
```

以上代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度`O(n)`, 优化如下

```js
function factorial (n, total = 1) {
  if (n === 1) return total
  return factorial (n-1, n * total) // 这个地方式尾调用
}
```

这种调用，始终只有一个调用帧，复杂度`O(1)`

再说一个很经典的递归函数的例子 `Fibonacci` 数列，也能充分说明尾递归优化的重要性

```js
function Fibonacci (n) {
  if (n <= 1) return n
  return Fibonacci(n-1) + Fibonacci(n-2) // 显然不是尾调用
}
Fibonacci(10) // 89
Fibonacci(100) // 超时
```

优化：

```js
function Fibonacci (n, total1 = 1, total2 = 1) {
  if (n <= 1) return total2
  return Fibonacci( n - 1, total2, total1 + total2 )
}
console.log(Fibonacci(10)) // 89
console.log(Fibonacci(100)) // 573147844013817200000
```

>到目前（2018年7月3日）为止，javascript 引擎除 Safari 浏览器外，其他主流浏览器，如谷歌（包括 v8、node.js）、火狐均未实现 TCO(Tail call optimization）。
由此可见，“尾调用优化”对递归操作的意义重大，没有栈溢出（或者层层递归造成的超时），相对节省内存

扩展的说点东西（尾递归的实现原理）

蹦床函数（trampoline）

```js
let sum = (x, y) => {
  if (y) return sum(x + 1, y - 1)
  return x
}
console.log(sum(1, 100000)) // Maximum call stack size exceeded 栈溢出
```

基于上面的错误，生成一个蹦床函数

```js
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
// 改写sum函数
let sum = (x, y) =>{
  if (y) return sum.call(null,x+1,y-1) // 这个地方会一个新的sum，已经绑定xy的函数
  return x
}
console.log(trampoline(sum(1, 100000))) // 100001 这个地方并不是可以无穷大的
```

[尾递归的实现](http://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E9%80%92%E5%BD%92%E4%BC%98%E5%8C%96%E7%9A%84%E5%AE%9E%E7%8E%B0)

## 解构

我觉得解构是一个很难的东西，但是用起来确实很好用

* 什么是解构？
  * ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

### 解构赋值

1. 两边的结构必须得一样，Object对Object， Array对Array
2. 右边必须是个合法的东西 eg: `let {a,b} = {5,6}` 显然是不对的
3. 解构赋值必须得同时完成（这个很重要）

### 解构赋值的类型

#### 1.数组的解构赋值

说一个比较经典的情况就容易去理解了

```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined


let [x = 1] = [undefined];
x // 1
let [x = 1] = [null];
x // null // 遵循 === 的原则，只有右侧是严格等于undefined的时候，才会走默认值的情况
```

#### 2.对象的解构赋值

说demo就好了，下次看到的时候能偶明白什么意思就好

```js
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}

let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]
```

##### 注意点

1. 如果要将一个已经声明的变量赋值，必须要非常小心

~~错误的写法~~

```js
let x;
{x} = {x:1}
// SyntaxError: syntax error
```

解释上面的写法：因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

正确的写法

```js
let x;
({x} = {x:1})
```

解构赋值的方法最好还是解构与赋值同时进行会省去很多的事情

2. 关于`()`的使用，尽管我自己觉得毫无用处，但确实可以解释1中的问题

```js
({} = [true, false]);
({} = 'abc');
({} = []);
```

上面的表达式毫无意义，但是语法式合法的，可以执行

3. 由于数组本质式特殊的对象，因此可以对数组进行对象的属性的解构

```js
let arr = [1,2,3]
let {0:first, [arr.length-1]:last} = arr
// frist:1    last:3
```

既然说到类解构了，其他类型的也是可以解构赋值的

#### 3.字符串的解构赋值（还有字符串和布尔值）

字符串也可以解构赋值。这是因为此时，字符串转换成了一个类似数组的对象

```js
let [a,b,c,d,e] = 'hello'
// a:h,b:e,c:l,d:l,e:o
let [..arr] = 'hello'
// arr [ 'h', 'e', 'l', 'l', 'o' ]
let {length : len} = 'hello';
// len  5
```

对于数值和字符串的解构赋值，会先将他们转化为对象

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

对于特殊的undefined和null，这两哥们是没办法转化成对象的，所以对他们解构赋值会报错的

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

#### 4.函数参数的解构赋值

主要说函数解构赋值时候的默认值

```js
let move = ({ x = 0, y = 0 } = {}) => [ x, y ]
// 等价于
function move(obj = {}){
  let {x = 0, y = 0} = obj
  return [x,y]
}
// 所以
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

```js
  let move = ({ x , y } = {x = 0, y = 0}) => [ x, y ]
// 等价于
function move(obj = {x = 0, y = 0}){
  let {x , y} = obj
  return [x,y]
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

以上的两种写法主要是看解读等价的情况就能够比较清楚的看出其中的差别

#### 5.圆括号的问题

关于圆括号的问题，草草看了一眼，对于我自己使用来讲，至少到现在使用为止，我还没有说要必须要使用的必须要使用圆括号的情况

[圆括号详解](http://es6.ruanyifeng.com/#docs/destructuring#%E5%9C%86%E6%8B%AC%E5%8F%B7%E9%97%AE%E9%A2%98)

#### 6.解构的用途

解构的用途其实很多，下面说几种常见的情况

1. 交换变量的值

```js
let a = 1
let b = 2
[b,a] = [a,b]
```

2. 从函数返回多个值

`array`

```js
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
```

`object`

```js
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

3. 函数参数的定义

`array`

```js
function f([x, y, z]) {
  // do somethig
}
f([1, 2, 3]);
```

`object`

```js
function f({x, y, z}) {
  // do something
}
f({z: 3, y: 2, x: 1});
```

在函数封装的时候建议使用对象作为参数，在之后的扩展性和灵活度较高

4. 提取JSON数据

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]
```

5. 函数参数的默认值

```js
window.CONTEXT = '/xxxx' // 接口的上下文
export function Axios ({ method, url, params, data, baseURL = window.CONTEXT }) {
  // axios的baseUrl默认是主项目的上下文，但是如果有时候一个前端项目需要调取多个后端的接口文档的时候就需要传入不同的上下文
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      params,
      data,
      baseURL
    }).then(
      { data } => { data.success ? resolve(data) : reject(data) }, 
      err => { reject(err) }
      ).catch(
        err => { reject(err) }
      )
  })
}
```

这样就不用再在函数里面写 `var baseUrl = baseUrl || window.CONTEXT` 了

6. 遍历Map解构数据

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

7. 指定模块的引入

```js
import { SourceMapConsumer, SourceNode } from 'source-map'
```

## class

之前就说过，在其他语言中比如java，php都会用class来做面向对象，但es5就没有使用原型和构造方法来实现的，这样就是真的没有标准了，每个人的写法都可以不一样，而且每个人都没有错误，这对项目团队的研发来讲，老好玩了

说class和面向对象之前先简单的看一下语言的发展史

> 机器语言 -> 汇编语言 -> 低级语言（底层语言，面向过程 eg：C） -> 高级语言（面向对象） -> 模块系统 -> 框架 -> 系统接口（API）

### ES5的面向对象

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

### ES6的面向对象

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

### 还是总结一下吧，ES5/ES6的继承，除了写法上面，还有其他什么的区别？

1. `class`声明会提升，但是<font color=red>不会初始化赋值</font>

```js
const foo = new Foo() // ReferenceError: Foo is not defined
class Foo {
  constructor() {
    this.foo = 42;
  }
}
```

2. `class`声明内部会启用严格模式

```js
function Bar() {
  baz = 42; // it's ok
}
const bar = new Bar();

class Foo {
  constructor() {
    fol = 42; // ReferenceError: fol is not defined
  }
}
const foo = new Foo();
```

3. `class`的所有方法都是不可枚举的

```js
function Bar() {
  this.bar = 42;
}
Bar.answer = function() {
  return 42;
};
Bar.prototype.print = function() {
  console.log(this.bar);
};
const barKeys = Object.keys(Bar); // ['answer']
const barProtoKeys = Object.keys(Bar.prototype); // ['print']


class Foo {
  constructor() {
    this.foo = 42;
  }
  static answer() {
    return 42;
  }
  print() {
    console.log(this.foo);
  }
}
const fooKeys = Object.keys(Foo); // []
const fooProtoKeys = Object.keys(Foo.prototype); // []
```

4. `class` 的所有方法（包括静态方法和实例方法）都没有原型对象 `prototype`，所以也没有`[[construct]]`，不能使用 new 来调用。

```js
function Bar() {
  this.bar = 42;
}
Bar.prototype.print = function() {
  console.log(this.bar);
};

const bar = new Bar();
const barPrint = new bar.print(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
  print() {
    console.log(this.foo);
  }
}
const foo = new Foo();
const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor

```

5. 必须使用`new`关键字调用`class`

6. `class` 内部无法重写类名

```js
function Bar() {
  Bar = 'Baz'; // it's ok 但是没什么卵用，下面也是不能够使用new Bax(), 不要天真的一位是可以的
  this.bar = 42;
}
const bar = new Bar();
// Bar: 'Baz'
// bar: Bar {bar: 42}  

class Foo {
  constructor() {
    this.foo = 42;
    Foo = 'Fol'; // TypeError: Assignment to constant variable
  }
}
const foo = new Foo();
Foo = 'Fol'; // it's ok 这个地方就彻底的赋值了
```

## Module

### 1. export 命令

模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

建议使用：

```js
// name: export.js
// 输出变量
const DEFAULT_COLOR="red"
const DEFAULT_FONTSIZE="18"
export { DEFAULT_COLOR, DEFAULT_FONTSIZE }
// 输出函数 或者 类
export function add(x, y) {
  return x + y
}
// 如果有需要可以使用 as关键字重命名
let func1 = (x, y) => x + y
let func2 = (x, y) => x - y
export {
  func1 as add,
  func2 as reduce
}
```

### 2. import 命令

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过``命令加载这个模块。

```js
import { DEFAULT_COLOR, DEFAULT_FONTSIZE, add as func1, reduce as func2 } from './export.js'
console.log(DEFAULT_COLOR, DEFAULT_FONTSIZE) // red, 18
```

### 3. export default 命令

为什么要有这个命名？

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

```js
export default class Person {
  constructor (age,name) {
    this.age = age
    this.name = name
  }
  sayHello(){
    console.log(`我是${this.name}，我今年${this.age}`)
  }
}
```

```js
import Person from './export.js'
let person = new Person('salvatore',25)
person.sayHello() // 我是salvatore，我今年25
```

`export` 和 `export default`书写上的比较：
`export` 的时候在`import`的时候记得加上`{}`，但是在 `export default` 的时候import的时候不加`{}`

### 4. import()

`import`和`export`命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。
有一个提案：import()返回一个 Promise 对象。下面是一个例子。

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

[详细文档](http://es6.ruanyifeng.com/#docs/module)

## Promise

Promise 就是用来做异步操作使用的，之前典型的异步操作的方法就是ajax

* 同步操作和异步操作

  1. 同步操作：一次只能经行一个操作 代码清晰
  2. 异步操作：同时经行多个操作 代码混乱

Promise的前世今生

ajax -> Promise -> async/await

### 说一下Promise吧

Promise 本身并不太具备异步的能力，更多的用法是它擅长去分装异步操作

在vue的Axios中我的写法就是使用的Promise去分装

```js
let p = new Promise(function(resolve, reject){
  $.ajax({
    url: 'xxx',
    type: 'get',
    success:function(data){
      resolve(data) // 返回成功值
    },
    error:function(err){
      reject(err) // 返回失败值
    }
  })
})
```

```js
new Promise.all([ajax1,ajax2,ajax3]).then(([a1,a2,a3]) => {}).cathch(err => {}) 
// ajax1---a1,ajax2---a2,ajax3---a3,一一对应，数据获取和数据返回值

new Promise.race() // 竞速 // 结果是一个东西 几乎没用过
```

Promise使用起来呢很方便，但是要是用的深了还是有点东西的

### async/await

写法同步化，反执行是异步的，看着思路清晰，方法使用好维护

```js
async function show () {
  let a = 5
  let b = 6 
  let data = await new Promise((resolve,reject) => {
    a = 3
    resolve({a:3,b:4})
  });
  console.log(a,data) // 3 { a: 3, b: 4 }
}
show()
```

普通函数---一直执行，直到结束

async/await函数---能够“暂停”

[详细文档](http://es6.ruanyifeng.com/#docs/promise)

## S-W-WeakS-WeakM

其实在平常的来发中这一块用的其实很少，但是感觉在现在的工作中，实际的开发过程中需要自己做到：

1. 不能只是了解一个知识点，然后再去用它，做项目每使用一项技术（框架，组件库，插件，新的语言体系），事先都得需要看项目中的可行性，存在哪些潜在风险，以及潜在风险是否有能力去修复，以及社区是否强大

2. 如果可以保持技术的领先，最好让技术带领项目走，而不是项目带着技术走，不能因为技术儿影响项目的主要功能点，每一个项目总是会有某些不好完成的功能和效果，但是需求出来的时候至少心中要有实现的方案，所以要更多的学习，有些技术点不是不好实现，而是在遇到问题之前没有了解相关的技术，所以觉得某些功能实现不了

这是前段时间做完公文流转V1.0.0之后的一个比较明确的感想，扯远了，还是说今天的要弄懂的东西吧

### 1. Set(集合)

1. Set本身是一种新的数据结构，类似于数组，但是成员是唯一且无序的，没有重复值，有一点值得注意：在Set内部判断两个是否相等的时候，认为`NaN`是等于`NaN`的

2. 实例属性：

* constructor:构造函数
* size:元素数量

3. 实例方法

* 操作方法

  * add(value)
  * delete(value)
  * has(value)
  * clear()

* 遍历方法

  * keys()
  * values()
  * entries()
  * forEach()

这个方法和相关的知识，平成用的还是挺多的，也没什么好说的，如果又不知道的，可以翻看之前的文章，写这一片文章主要也不是在了解这个方法，而是去了解和熟悉下面的几种方法

### 2. WeakSet

1. 首先弄清楚一点，这四种数据结构都不是数组，Set的成员可以为任意类型的值，但是WeakSet的成员只能是对象

2. WeakSet对象中储存的对象值都是被弱引用的，也就是说，垃圾回收机制不考虑WeakSet对该对象的应用，如果没有其他的变量或者属性引用这个对象值，则这个对象会被垃圾回收掉（不会考虑对象还存在于WeakSet中），所以，WeakSet对象里面有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能是不一致的

3. 属性：

* constructor：构造函数任何一个具有Iterable接口的对象，都可以作为参数

4. 方法

* add(value)
* has(value)
* delete(value)
* clear() <font color=red>已经被废弃</font>

5. <font color=red>值得注意一点的是：ES6 规定 WeakSet 不可遍历，也没有办法拿到它包含的所有元素</font>

### 3. Map(字典)

1. Set(集合) 与 Map(字典) 的区别：

* 共同点：集合、字典可以储存不重复的值

* 不同点：集合是以`[value, value]`的形式储存元素，字典以 `[key, value]`的形式储存

2. 属性

* constructor：构造函数 <font color=red>任何具有Iterator接口、且每个成员都是一个双元素的数组的数据结构都可以当作map构造函数的参数</font>

* size：返回字典中所包含的元素个数

3. 操作方法

* set(key, value)
* get(key)
* has(key)
* claer()

4. 遍历方法

* keys()
* values()
* entries()
* forEach

### 4. WeakMap

1. WeakMap对象是一组键值对的集合，其中的键是弱引用对象，而值可以任意

2. 值得注意的是，WeakMap弱引用的只是键名，而不是键值，键值依然是正常引用

3. WeakMap中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一个对象，这个对象将会被垃圾回收机制回收（相对应的key就成为了无效的了），所以WeakMap的key是不可枚举的

4. 属性

* constructor：构造函数

5. 方法：

* has(key)
* set(key, value)
* get(key)
* delete(key)

### 总结

* Set

  * 成员唯一、无序且不重复
  * [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
  * 可以遍历，方法有：add、delete、has

* WeakSet

  * 成员都是对象
  * 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
  * 不能遍历，方法有add、delete、has

* Map

  * 本质上是键值对的集合，类似集合
  * 可以遍历，方法很多可以跟各种数据格式转换

* WeakMap

  * 只接受对象作为键名（null除外），不接受其他类型的值作为键名
  * 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
  * 不能遍历，方法有get、set、has、delete

## Set-Map

### 1. Set

#### 基本用法

ES6 提供了新的数据结构 Set。它类似于数组，但是<font color=red>成员的值都是唯一的，没有重复的值</font>。

```js
const s = new Set()
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x))
for (let i of s) {
  console.log(i)
}
// 2 3 5 4
```

通过`add（）`向Set结构添加成员（可以和数组的push方法对比）

在声明Set可以接受一个数组作为参数

```js
const set = new Set([1, 2, 3, 4, 4]); // 和扩展运算符互为逆运算
[...set]
// [1, 2, 3, 4]

// 可以做一个去重的方法
[...new Set(arr)] // 对arr去重
// 可以想象字符串的去重
[...new Set(str)] // 对str里面的字符去重

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5 // 和Array的length对比
```

#### Set的属性和方法

##### 1.Set结构的实例有一下属性

1. `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
2. `Set.prototype.size`：返回`Set`实例的成员总数。

##### 2.Set结构的操作方法

1. `add(value)`：添加成员返回Set结构本身
2. `delete(value)`：删除某个值，返回`Boolean`，表示删除是否成功
3. `has(value)`：返回一个`Boolean`，表示该值是否是Set的成员
4. `clear()`：清楚所有成员，没有返回值

注意：每一个的返回值

```js
s.add(1).add(2).add(2);
s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2)
s.has(2) // false
s.clear()
s // 空
```

##### 3.Set结构的遍历操作

1. `keys()` ： 返回键名的遍历器
2. `values()`：返回键值的遍历器
3. `entries()`：返回键值对的遍历器
4. `forEach()`：使用回调函数遍历每个成员

注意：每个操作的返回值

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
// entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。

let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

上面的是遍历和数组的使用基本是一致的

##### 4.遍历的应用

数组去重变得及其简单

```js
let unique = arr => [...new Set(arr)]
```

联合map(),filter()使用

```js
let set =new Set([1,2,3,4,5,6,7,8,9])
set = new Set([...set].map(item => item -1))
// [0,1,2,3,4,5,6,7,8]
set = new Set([...set].filter(item => item % 2))
// [1,3,5,7]
```

求两个数组的交集，并集，差集

```js
let a = [1,2,3,4,5]
let b = [3,4,5,6,7]
// 并集
let union = [...new Set([...a,...b])]

// 交集
let intersect = [...new Set(a.filter(item => new Set(b).has(item)))]

// 差集

let difference = [...new Set(a.filter(item => !new Set(b).has(item)))]

```

### 2. Map

JavaScript的对象，本质上是键值对的集合（hash结构），但是传统上只能用字符串当做键，为了解决这个问题，ES6提供了Map数据结构，它类似于对象，也是键值对的集合，但是“键”的范围不在限于字符串，各种类型的值（包括对象）都可以当作键，也就是说，Object结构提供了“字符串---值”的对应，Map结构提供了“值---值”的对应，是一种更完善的Hash结构实现

```js
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
])
map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

#### 实例的属性和操作方法

1. size属性
size属性返回Map结构的成员总数

```js
const map = new Map()
map.set('foo',true)
map.set('bar',false)
map.size // 2
```

2. set(key,value)
set方法返回的是当前的Map对象，因此可以采用链式写法

```js
const m = new Map();
m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
```

3. get(key)
get方法读取key对应的键值，如果找不到key，返回undefined。

```js
const m = new Map();
const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数
m.get(hello)  // Hello ES6!
```

4. has(key)
has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

```js
const m = new Map();
m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');
m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true
```

5. delete(key)
delete方法删除某个键，返回true。如果删除失败，返回false。

```js
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true
m.delete(undefined)
m.has(undefined)       // false
```

6. clear()

```js
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

以上的这些方法，注意返回值

#### Map的遍历方法

1. keys()：返回键名的遍历器。
2. values()：返回键值的遍历器。
3. entries()：返回所有成员的遍历器。
4. forEach()：遍历 Map 的所有成员。

```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
map[Symbol.iterator] === map.entries
// true
```

结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。

```js
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

let map1 = new Map([...map0].filter(([key,value]) => key < 3))
let map2 = new Map([...map0].map(([key,value]) => [key * 2, `_${value}_`]))
```

#### 与其他数据结构的互相转换

1. Map <-------> Array

```js
const map = new Map()
    .set(true,7)
    .set({foo:3},['abc'])

let arr = [...map]
```

```js
let map = new Map([
  [true,7],
  ['str',['abc']]
])
```

2. Map <---------> Object

```js
let strMapToObj = strMap => {
  let obj = {
    for(let [key,value] of strMap){
      obj[key] = value
    }
  }
  return obj
const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
}
```

```js
let objToStrMap = obj => {
  let map = new Map()
  for(let [key,value] of Object.entries(obj)){
    map.set(key,value)
  }
  return map
}
```

[文档详情](http://es6.ruanyifeng.com/#docs/set-map)

<back-to-top />

<gitask />
