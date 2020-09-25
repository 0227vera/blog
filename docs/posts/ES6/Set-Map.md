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

[文档详情](http://es6.ruanyifeng.com/#docs/set-map)

<back-to-top />

<gitask />