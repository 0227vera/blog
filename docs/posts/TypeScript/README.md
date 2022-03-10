# 基础知识

```typescript
// 1. boolean
let bo: boolean = true
// bo = 22
bo = false
```

```typescript
// 2. number
let num: number = 11
// num = 'adfa'
num = 2
```

```typescript
// 3. string
let str: string = 'abc'
str = 'cdf'
```

```typescript
// 4. 特别类型：void、undefined、null
// void的函数不能返回非(undefined、null)的值
function fn (): void {
  console.log('fn()')
  // return undefined  √
  // return null       √
  // return 222/'abc'/true/false ×
}

// undefined/null 是所有类型的子类型

let num1: number = 9
num1 = undefined
num1 = null
```

```typescript
/*
 * 任意值（any）：表示允许赋值为任意类型
 * any类型的变量可以赋任意类型的值
 * any类型的变量可以使用任意属性和方法
 * 定义不指定类型的变量，且定义时不赋值，相当于类型的any
 */

let any: any = 123
any = 'abc'
any = true

let any1:number = 124
// console.log(any1.length) ×
console.log(any.length)

let any2
any2 = 123
any2 = 'abc'

let any3 = 123 // 类型推论:TS会在没有明确的指定类型的时候推测出一个类型
// any3 = '123' ×
```

```typescript
/*
 * 联合类型（Union types）表示取值可以为多种类型种的一种
 */

let uni: number | string = 3
uni = 'abc'
// uni = true ×

function tostring (x: number | string) {
  return x.toString()
}

function getLength (x: number | string) {
  // return x.length   ×
  // 类型断言 (<type>x)
  if ((<string>x).length) {
    return (<string>x).length
  } else {
    return x.toString().length
  }
}
```

```typescript
/* 
 * 在typescript中，我们使用接口（interface）来定义对象的类型
 * 接口：在面向对象的语言中，是n个行为的抽象/描述，但是没有实现，由类去实现，
 * 在TS中，接口也可以包含状态的描述
 * 接口类型的对象:
 * 多/少了一些属性是不允许的
 * 可选属性：？
 * 只读属性：readonly
 * 接口的作用是：为“鸭式辩型发”或者“结构性子类型化”和第三方代码定义契约
 */

/**
 * 创建人的对象，需要对人的属性经行一定的约束
 * id是number类型，必须有，只读类型
 * name是string类型，必须有，只读类型
 * age是number类型，必须有，只读类型
 * sex是string类型，可以没有
 */

 // js的使用
 let person1 = {
   id:1,
   name:'salvatore',
   age:20,
   sex:'男'
 }

 interface IPerson{
  readonly id: number; // 注意这个地方是`;`不是`,`
  readonly name:string;
  readonly age:number;
  sex?:string; // 这个表示可以修改非只读
 }

 let person2: IPerson = {
   id:1,
   name:'salvatore',
   age:20,
   sex:'男'
 }

//  person2.name = 'nic'  ×
person2.sex = '女' // √
```

```typescript
/**
 * 数组类型
 *  方式一：number[]
 *  方式而：Array<string> // 泛型：类型占位的语法
 */

// 定义字符串数组类型
const arr1: string[] = ['a', 'b', 'c']
// 定义字符串数组类型
const arr2: Array<string> = ['a', 'b', 'c']

// 定义任意类型数组
const arr3: any[] = [1, 2, true, 'a']
const arr4: Array<any> = [1, 2, true, 'a']

// 在这个地方可以说一些，能不用any的地方最好不要使用any
```

```typescript
/** 
 * 元组(元素，数组)： 可以包含多种类型元素的数组
*/

// 定义元组
let tuple: [string,number] = ['salvatore', 20]
// 当添加越界的元素时候，它的类型必须回被限制为元组中每个类型的联合类型
// tuple.push(true)  ×
tuple.push(23) // √
```

```typescript
/** 
 * 函数类型
 * 1. 函数的声明
 * 2. 函数表达式
 * 3. 可选参数
 * 4. 形式默认值
 * 5. 剩余参数
*/

// 1. 声明函数
function fn1 (x: number,y: number): number {
  return x + y
}

// 2. 函数表达式
const fn2 = function (x: number,y: number): number {
  return x + y
}
const fn3 = (x: number,y: number): number => x + y // fn3肯定是函数类型的，类型推断

// 3. 可选参数
function fn4 (x: number, y: string, z?: boolean): void {
  console.log('fn4()', x, y, z)
}
fn4(20, 'salvatore')

// 形式默认值
function fn5 (x: string, y: string = 'abc'): void {
  console.log('fn5()', x, y)
}
fn5('salvatore')

// 剩余参数
function fn6(x:number, ...args: any[]): void {
  console.log('fn6()', x, args)
}
fn6(3, 'abc', true, 123)

/** 
 * 声明文件
 * 当使用第三方库的时候，我们需要引用它的声明文件，才能够获得对应的代码补全，接口提示等功能
 * 声明语句：如果需要ts对新的语法经行检查，需要加载了对应的类型说明代码
 * declare var jQuery: (selector: string) => any;
 * 声明文件：把声明语句放到一个单独的文件（jQuery.d.ts）中，ts会自动解析到项目中所有声明文件
 * 下载声明文件： `npm i @type/jquey -D`
*/
```

```typescript
/** 
 * 内置对象
 * 1. ECMAScript的内置对象
 * String
 * Boolean
 * Number
 * 2. BOM和DOM的内置对象
 * HTMLElement( document.getElementById('#test') )
 * NodeList ( document.querySelectorAll('div') 这是一个伪数组)
 * MouseEvent(Event)
 * Window
 * Node
*/

let boo: Boolean = new Boolean(true) // 注意这个地方前面的Boolean，表示boo这是一个引用类型的数据结构
let number: Number = new Number(5)

/** 
 * 枚举类型（Enum）类似于取值被限定在一定范围内的场景，比如在一周只能有七天，颜色限定为红绿蓝等
 * 使用枚举enum关键字来定义
 * 
 * 翻译成js之后的语法很值得去看一下
*/

enum Days {Mon = 1, Tue, Wed, Thu, Fri, Sat, Sun}
console.log(Days.Sun, Days[1])

function isWorkDay (day: Days): boolean {
  switch (day) {
    case Days.Sat :
    case Days.Sun :
      return false
    default :
      return true
  }
}
let currentDay = Days.Wed
console.info('tag', isWorkDay(currentDay))
```

```typescript
/** 
 * typescript中类的用法
 * 1. 访问修饰符
 * public：任何地方可见，默认是public
 * protected：类内部或子类中可见
 * private：只在类内部可见
 * 2. readonly
 * 只能通过构造方法赋值一次
 * 3. 抽象类
 * 可以包含抽象方法
 * 不可以包含有实例
*/

class A {
  m1: string // 等同于 public m1: string
  public readonly m2: string 
  protected m3: string
  private m4: string
  constructor (m1,m2,m3,m4) {
    this.m1 = m1
    this.m2 = m2
    this.m3 = m3
    this.m4 = m4
  }
}
class AA extends A {
  test () {
    // this.m2 = 333 ×
    // console.log(this.m4) ×
    console.log(this.m1, this.m3)
  }
}

abstract class AAA {
  m1: string
  test1 (){}
  abstract test2 () // 抽象方法只有方法的描述（声明），没有方法体的实现，实际上是在约束作用，使继承它的类，必须要实现这些方法
}
```

```typescript
/** 
 * 实现类
 * 抽象类
 * 
 * 抽象方法：有abstract/没有方法体 / 不可以创建实例？为什么不能创建实例，（原因很简单，他还有事情没做完，方法都还没有方法体，怎么去让实例使用）
 * 实现方法：没有abstract/有方法体 / 可以创建实例
*/

/** 
 * 接口：
 * 对 对象的形状（shape）经行描述
 * 对类的一部分行为进行抽象
 * 父接口可以有多个，但父类只能有一个(多实现单继承)
*/
/** 
 * 一个类可以实现一个接口
 * 一个类可以继承另一个类
*/
interface Alarm {
  alert():any // 默认是抽象的abstract
}
class Door{

}

class SecurtyDoor extends Door implements Alarm {
  alert () {
    console.log('SecurtyDoor alert')
  }
}

class Cat implements Alarm {
  alert(){
    console.log('Cat alert')
  }
}

interface Light {
  lightOn(): any
  lightOff():any
}

class Cat2  implements Alarm,Light {
  alert(){
    console.log('Cat2 alert')
  }
  lightOn () {
    console.log('lightOn')
  }
  lightOff() {
    console.log('lightOff')
  }
}

// 接口的继承

interface Inter extends Alarm,Light{

}
```

```typescript
/** 
 * 泛型是指在定义函数、接口或者类的时候，不预先指定具体的类型，而在使用的时候在制定类型的一种特性
 * 
 * 可以理解为一种类型占位
*/

function createArray (length:number, value:any) : Array<any> {
  let result = []
  for (let i = 0; i < length; i ++) {
    result.push(value)
  }
  return result
}

const arr5 = createArray(3, 'salvatore')

function createArray2<T> (length:number, value:T): Array<T> {
  let result = []
  for (let i = 0; i < length; i ++) {
    result.push(value)
  }
  return result
} 
let arr6 = createArray2<string>(5, 'salvatore')
// arr6.push(6) ❌

let myAdd: (x: number, y: number) => number =
  function(x: number, y: number): number { return x + y; };
```

<gitask />
