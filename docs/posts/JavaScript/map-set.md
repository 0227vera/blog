# Set-Map

## 1. Set

### 基本用法

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

### Set的属性和方法

#### 1.Set结构的实例有一下属性

1. `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
2. `Set.prototype.size`：返回`Set`实例的成员总数。

#### 2.Set结构的操作方法

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

#### 3.Set结构的遍历操作

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

#### 4.遍历的应用

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

## 2. Map

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

### 实例的属性和操作方法

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

### Map的遍历方法

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

### 与其他数据结构的互相转换

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


[文档详情](http://es6.ruanyifeng.com/#docs/set-map)




