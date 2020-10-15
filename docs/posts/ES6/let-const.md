# let-const

为什么要使用这两哥们，那肯定是var不行啊，要是var行的话，那就不需要这两个哥们了，var怎么就不行了呢

## var的特点

1. var声明的变量可以多次声明
2. 无法控制修改，不同的类型居然也可以修改赋值
3. 作用域是函数作用域（联想闭包:在没有块级作用域的时候的一种解决方案）
4. 变量提升（这个应该还不算缺点）

```js
var a = 5
a = [1, 2, 3, 4]
var a = { a: 5, b: 'asfd' }
```

完全没毛病，这显然是不好的

## let/const

对比var的问题可想而知这两个的好处

1. let/const声明的变量不可多次声明
2. 控制修改，const不允许修改类型（通常会把他当作一个常量来使用，但是啊，他的值其实是可以修改） const一旦声明必须马上赋值
3. 作用域是块级作用域

暂时性死区

```js
var a = 123
if (true) {
  a = 'abc' // a is not defined
  let a
}
let bar = (x = y, y = 2) => [x, y] // y is not defined
bar();
```

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

## 对于const

const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```js
const a = 0
a = 1 // error
const arr = []
arr.push(1)
arr = [] // error
const obj = {}
obj.a = 3
obj = {} // error
```

<back-to-top />

<gitask />