# Module

## 1. export 命令
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
## 2. import 命令
使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过``命令加载这个模块。
```js
import { DEFAULT_COLOR, DEFAULT_FONTSIZE, add as func1, reduce as func2 } from './export.js'
console.log(DEFAULT_COLOR, DEFAULT_FONTSIZE) // red, 18
```
## 3. export default 命令
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
## 4. import()
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
<gitask />

<back-to-top />
