# 基础知识

之前说过vue的文档是我读过的技术文档里面最好的，那react是我认为比较糟的，加上中文再一翻译，酸爽

[react](https://zh-hans.reactjs.org/)

[react脚手架demogit地址](https://github.com/0227vera/salvatore-react)

## 学习 react 需要注意的点

### 1. props 的数据不可修改，在当前组件中受到保护

保护单向数据流的设计理念

### 2. onClick bind

`onClick = { this.handleClick }`

解决方案两个：

1. bind，绑定当前的组件中否则 this 是被调用时候的对象(这里指的是调用当前组件的组件)

2. 把 handleClick 中的 this 穿透到当前(这里指的是当前的组件)中去

### 3. react 的生命周期

![效果图](../../.vuepress/public/react/react-life-cycle.png)

个人感觉 react 的生命周期是简单的

### 4. setState 的同步异步问题

疑问：如何让 setState 同步执行

注意：在异步的情况下，第二个参数，也就是回调的使用

### 5. 受控组件和非受控组件

在表单输入中

受控组件：使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。可以理解为表单组件的 value 只能够使用 setState()来控制

非受控组件：可以理解为不与 state 相关联，而是单纯的使用 ref 或者操作 dom 的方式去改变，也可以理解为内容过完全由用去定义，代码不做设置

### 6. redux 上面的方法和数据获取

这只是其中的一种处理方法

`this.props[methods]`:

`this.props.currentuser`

`this.props.fetchCurrentUser()`

`export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))`在 router 中调用 redux 的方法。添加属性和方法，以这一种方式导出具体的某一个组件

```js
const mapStateToProps = state => ({
  currentuser: state.currentuser.data,
  ...
});
const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: payload => dispatch({
    type: actionTypes.FETCH_CURRENT_USER,
    payload,
  }),
  ...
});
```

### 7. 如何获取 query 和 params 上面的数据

`this.props.match.params[prop]`

`this.props.match.query[prop]`

### 8. state 的数据改动

state 的改动如果没有动址，则可以直接改动，eg:

```js
this.state.obj.a = 3;
```

> 注意：这种并不会触发生命周期函数中的 componentWillUpdate 的钩子，还是需要 setState 来触发

如果改变的是值，则需要使用 setState，eg:

```js
this.setState({ a: 3 });
```

### 9. store 中的 state 的三大原则

- 单一的数据源 --- object tree

- state 是只读的 --- 改变 state 的唯一方法就是触发 action

- 使用纯函数来修改 state --- reducers，改变之后返回给的是 state，而不是相关的业务组件，这个一定要搞清楚

补充一点：严格的单向数据流是 Redux 架构的设计核心。

### 10. Action

Action 是把数据从应用（这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

### 11. Reducer

reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state

为了保持 reducer 的纯洁，注意不要在 reducer 里面做如下的事情：

- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 Date.now() 或 Math.random()。

目的：只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

### 12. 使用 redux-saga(一个 react 的中间键)时候的顺序

业务 this.props[methods] --> saga 中的 methods(一般是异步的)---> put(相当于 dispatch) ---> reducer ---> store ---> view

### 13. 函数命名

以前自己写项目还好点，感觉 getData、show、visible 这样的也没什么问题，但是这次看了一个新项目，别人这样命名心里喷死他了，这个也和 vue 和 react 之间的区别有关，vue 中可能一个 vue 文件里面只有一个 showdialog，也只有一次请求数据，所以这种命名还好点，但是在 react 中一个文件那么大，上来一个 getData 这个命名完全没什么意义，和 a 没什么差别，所以以后在写代码的时候不管怎么说，命名一定要语义化

### 14. 组合 vs 继承

组合和继承，在 react 的文档中推荐使用组合而非继承来实现组件间的代码重用

包含关系可以理解为 vue 中的插槽的概念

组件可以接受任意 props，包括基本数据类型，React 元素以及函数

### 设计 state 的时候

只保留应用所需的可变 state 的最小集合，其他数据均由它们计算产生，就像在 vue 中我们会有一些 computed 属性一样

以下的情况的数据都不应该放在 state 里面：

1. 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
2. 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
3. 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

### 15. state 中的值应该如何合理的设计

1. 找到根据这个 state 进行渲染的所有组件。
2. 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。
3. 该共同所有者组件或者比它层级更高的组件应该拥有该 state。
4. 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。

### 16. 高阶组件(HOC)

HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

注意：

1. 不要在 render 方法中使用 HOC

2. 务必复制静态方法

3. Refs 不会被传递

### 17. 声明式和命令式

声明式和命令式是两种编程范式。react 是声明式的，jquery 那样直接操作 dom 是命令式

一般来说，声明式编程关注于发生了啥，而命令式则同时关注于咋发生的

纠正一点自己的想法：

以前总觉得 vue 和 react 一个是声明式的一个是命令式的，其实：vue 和 react 都是声明式的编程，通过操作 model 去改变 view，底层如何实现的 mv 不用去管

### 18. 什么是 Hook

Hook 是能让你在函数组件中“钩入” React 特性的函数。它们名字通常都以 use 开始

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### 19. useState

作用可以相当于 class 中的 state 和 setState

### 20. useEffect

它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途

如果想只调用 componentDidMount

```js
useEffect(() => {}, []);
```

在某种条件下进行 update

```js
useEffect(() => {}, [count]);
```

如果想只调用 componentWillUnmount

每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。React 会在组件卸载的时候执行清除操作而不是 componentWillUnmount？

```js
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  // Specify how to clean up after this effect:
  return function cleanup() {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

### 21. useContext

`const value = useContext(MyContext)`

在数据传递过程中使用，如果出入的 MyContext(可能是父组件传递过来的，也可能是 store 里面的数据)发生变化，那么也会导致当前组件的数据更新

### 22. useCallback

useCallback 的作用在于利用 memoize 减少无效的 re-render，来达到性能优化的作用。还是那句老生常谈的话，“不要过早的性能优化”。从实际开发的经验来看，在做这类性能优化时，一定得观察比较优化的结果，因为某个小角落的 callback 就可能导致优化前功尽弃，甚至是适得其反。

### 23. useRef

通过 ref 拿到相关的数据，ref 的作用相比于 class 的时候作用大了很多

### 24. 如何理解依赖注入（DI）

?

### 25. 使用过的前端代理的方式

1. webpack 中的 proxy，添加 jwt 验证的验证规则

2. 使用 node 的模块(`whistle`)+chrome 的插件(`SwitchyOmega`)共同实现

### 26. hook 中的 useState

如果 useState 的前后两次不变的话，页面不会更新，所以注意在数组时候的处理，也就是关于拷贝和引用的问题

### 27. 因为使用随机 id 导致的 input 输入时候的焦点莫名的消失

因为数据结构的原因，给 jsx 总的数组 map 生成 dom 的时候添加的 key 是一个用 id 生成器生成的 id，而 dom 的内容是一个自定一个的 form，发现里面的文本输入都只能够输入一次，检查半天，感觉是因为每次 onChange 的时候，重新渲染导致每次的 form 都是一个新的和之前的没有关系了，这一点浪费了我将近半个小时，记录一下

## eventbus

我们知道，在`vue`中是可以通过`new Vue()`实现全局通信的，如果说在`react`中，我们也需要自定义事件该怎么做呢？盘它

```js
class EventBus {
  constructor () {
    this.events = this.events || {}
  }
}
// 首先构造函数需要存储event事件，使用键值对存储
// 然后我们需要发布事件，参数是事件的type和需要传递的参数
EventBus.prototype.emit = function (type, ...args) {
  let e
  e = this.events[type]
  // 查看这个type的event有多少个回调函数，如果有多个需要依次调用。
  if (Array.isArray(e)) {
    for (let i = 0; i < e.length; i++) {
      e[i].apply(this, args)
    }
  } else {
    e[0].apply(this, args)
  }
}
// 然后我们需要写监听函数，参数是事件type和触发时需要执行的回调函数
EventBus.prototype.addListener = function (type, fun) {
  const e = this.events[type]

  if (!e) { // 如果从未注册过监听函数，则将函数放入数组存入对应的键名下
    this.events[type] = [fun]
  } else { // 如果注册过，则直接放入
    e.push(fun)
  }
}
const eventBus = new EventBus()
export default eventBus

```

> 在没有使用mobx之前觉得这个还是可以的，但是在使用mobx之后，这个在项目中确实是没有必要的，但是考虑到使用场景，如果是需要写一个小的sdk的方法可以去做，减小库的大小

## refs

`refs`提供了一种方式，允许我们访问DOM节点或在`render`方法中创建React元素

### refs使用场景

在某些情况下，我们需要在典型数据流之外强制修改子组件，被修改的子组件可能是一个React组件的实例，也可能是一个DOM元素，例如：

- 管理焦点，文本选择或者媒体播放
- 促发强制动画
- 集成第三方库
- 访问子组件的方法

### 设置refs

#### 1. createRef

> 支持在函数组件和类组件内部使用

`createRef`是在React16.3版本中引入的。（React现在的版本是16.8.6）

##### ① 如何创建Refs

使用 `React.createRefs()` 创建`Refs`，并通过`ref`属性添加到React元素上。通常在构造函数中，将`Refs`分配给实例属性，以便整个组件中引用。

##### ② 访问Refs

当`ref`被传递给`render`中的元素时，对该几点的引用可以在`ref`的`current`属性中访问

```js
import React from 'react';
export default class MyInput extends React.Component {
    constructor(props) {
        super(props);
        //分配给实例属性
        this.inputRef = React.createRef(null);
    }

    componentDidMount() {
        //通过 this.inputRef.current 获取对该节点的引用
        this.inputRef && this.inputRef.current.focus();
    }

    render() {
        //把 <input> ref 关联到构造函数中创建的 `inputRef` 上
        return (
            <input type="text" ref={this.inputRef}/>
        )
    }
}
```

`ref`的值根据节点的类型而有所不同

- 当 `ref` 属性用于 `HTML` 元素时候，构造函数中使用 `React.createRefs()` 创建的 `ref` 接收底层 `DOM` 元素作为其 `current` 属性
- 当 `ref` 属性用于自定义的 `class（有状态）` 组件时， `ref` 对象接收组件的挂载实例作为其 `current` 属性。
- <font color="red">不能在函数（无状态）组件上使用 ref 属性，因为函数组件没有实例。</font>

#### 2. useRef

> 仅限于在函数组件内使用

useRef 是 React16.8 中引入的，只能在函数组件中使用。

##### ① 创建 Refs

使用 `React.useRef()` 创建 `Refs`，并通过 `ref` 属性附加至 `React` 元素上。

```js
const refContainer = useRef(initialValue);
```

`useRef` 返回的 `ref` 对象在组件的整个生命周期内保持不变。

##### ② 访问 Refs

当 `ref` 被传递给 `React` 元素时，对该节点的引用可以在 `ref` 的 `current` 属性中访问。

```js
import React from 'react';

export default function MyInput(props) {
    const inputRef = React.useRef(null);
    React.useEffect(() => {
        inputRef.current.focus();
    });
    return (
        <input type="text" ref={inputRef} />
    )
}
```

关于 `React.useRef()` 返回的 `ref` 对象在组件的整个生命周期内保持不变，我们来和 `React.createRef()` 来做一个对比，代码如下：

```js
import React, { useRef, useEffect, createRef, useState } from 'react';
function MyInput() {
    let [count, setCount] = useState(0);

    const myRef = createRef(null);
    const inputRef = useRef(null);
    //仅执行一次
    useEffect(() => {
        inputRef.current.focus();
        window.myRef = myRef;
        window.inputRef = inputRef;
    }, []);
    useEffect(() => {
        //除了第一次为true， 其它每次都是 false 【createRef】
        console.log('myRef === window.myRef', myRef === window.myRef);
        //始终为true 【useRef】
        console.log('inputRef === window.inputRef', inputRef === window.inputRef);
    })
    return (
        <>
            <input type="text" ref={inputRef}/>
            <button onClick={() => setCount(count+1)}>{count}</button>
        </>
    )
}
```

#### 3. 回调 Refs

> 支持在函数组件和类组件内部使用

`React` 支持 回调 `refs` 的方式设置 `Refs`。这种方式可以帮助我们更精细的控制何时 `Refs` 被设置和解除。

使用 `回调 refs` 需要将回调函数传递给 `React元素` 的 `ref` 属性。这个函数接受 React 组件实例 或 HTML DOM 元素作为参数，将其挂载到实例属性上，如下所示：

```js
import React from 'react';

export default class MyInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = null;
        this.setTextInputRef = (ele) => {
            this.inputRef = ele;
        }
    }
    componentDidMount() {
        this.inputRef && this.inputRef.focus();
    }
    render() {
        return (
            <input type="text" ref={this.setTextInputRef}/>
        )
    }
}
```

React 会在组件挂载时，调用 ref 回调函数并传入 DOM元素(或React实例)，当卸载时调用它并传入 null。在 componentDidMoune 或 componentDidUpdate 触发前，React 会保证 Refs 一定是最新的。

> 可以在组件间传递回调形式的 `refs`.

```js
import React from 'react';

export default function Form() {
    let ref = null;
    React.useEffect(() => {
        //ref 即是 MyInput 中的 input 节点
        ref.focus();
    }, [ref]);

    return (
        <>
            <MyInput inputRef={ele => ref = ele} />
            {/** other code */}

        </>
    )
}

function MyInput (props) {
    return (
        <input type="text" ref={props.inputRef}/>
    )
}
```

#### 4. Ref 传递

在 `Hook` 之前，高阶组件(HOC) 和 render `props` 是 React 中复用组件逻辑的主要手段。

尽管高阶组件的约定是将所有的 `props` 传递给被包装组件，但是 `refs` 是不会被传递的，事实上， ref 并不是一个 `prop，和` `key` 一样，它由 React 专门处理。

这个问题可以通过 `React.forwardRef` (React 16.3中新增)来解决。在 `React.forwardRef` 之前，这个问题，我们可以通过给容器组件添加 `forwardedRef` (prop的名字自行确定，不过不能是 ref 或者是 key).

> React.forwardRef 之前

```js
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const withData = (WrappedComponent) => {
    class ProxyComponent extends React.Component {
      componentDidMount() {
          //code
      }
      //这里有个注意点就是使用时，我们需要知道这个组件是被包装之后的组件
      //将ref值传递给 forwardedRef 的 prop
      render() {
          const {forwardedRef, ...remainingProps} = this.props;
          return (
              <WrappedComponent ref={forwardedRef} {...remainingProps}/>
          )
      }
    }
    //指定 displayName. 未复制静态方法(重点不是为了讲 HOC)
    ProxyComponent.displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    //复制非 React 静态方法
    hoistNonReactStatic(ProxyComponent, WrappedComponent);
    return ProxyComponent;
}
```

> React.forwardRef

`Ref` 转发是一项将 `ref` 自动地通过组件传递到其一子组件的技巧，其允许某些组件接收 `ref`，并将其向下传递给子组件。

转发 ref 到DOM中:

```js
import React from 'react';

const MyInput = React.forwardRef((props, ref) => {
  return (
      <input type="text" ref={ref} {...props} />
  )
});
function Form() {
  const inputRef = React.useRef(null);
  React.useEffect(() => {
      console.log(inputRef.current);//input节点
  })
  return (
      <MyInput ref={inputRef} />
  )
}
```

1. 调用 `React.useRef` 创建了一个 `React ref` 并将其赋值给 `ref` 变量。
2. 指定 `ref` 为JSX属性，并向下传递 `<MyInput ref={inputRef}>`
3. `React` 传递 `ref` 给 `forwardRef` 内函数 `(props, ref) => ...` 作为其第二个参数。
4. 向下转发该 `ref` 参数到 `<button ref={ref}>` ，将其指定为JSX属性
5. 当 `ref` 挂载完成，`inputRef.current` 指向 `input` DOM节点

注意:

第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。

在 React.forwardRef 之前，我们如果想传递 ref 属性给子组件，需要区分出是否是被HOC包装之后的组件，对使用来说，造成了一定的不便。我们来使用 React.forwardRef 重构。

```js
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function withData(WrappedComponent) {
    class ProxyComponent extends React.Component {
        componentDidMount() {
            //code
        }
        render() {
            const {forwardedRef, ...remainingProps} = this.props;
            return (
                <WrappedComponent ref={forwardedRef} {...remainingProps}/>
            )
        }
    }
    //我们在使用被withData包装过的组件时，只需要传 ref 即可
    const forwardRef = React.forwardRef((props, ref) => (
        <ProxyComponent {...props} forwardedRef={ref} />
    ));
    //指定 displayName.
    forwardRef.displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    return hoistNonReactStatic(forwardRef, WrappedComponent);
}
```

```js
class MyInput extends React.Component {
  render() {
      return (
        <input type="text" {...this.props} />
      )
  }
}
MyInput.getName = function() {
  console.log('name');
}
MyInput = withData(MyInput);
console.log(MyInput.getName); //测试静态方法拷贝是否正常
function Form(props) {
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    console.log(inputRef.current);//被包装组件MyInput
  })
  //在使用时，传递 ref 即可
  return (
    <MyInput ref={inputRef} />
  )
}
```

## react脚手架

### 基础安装

1. `npm i create-react-app -g`

2. `npm run eject | yarn eject` (npm没什么好说的，如果使用yarn请先确定您的电脑上面安装了yarn)

3. `npm start | yarn start`

4. `npm run build` (建议用完脚手架之后看一下webpack的配置是怎么写的，再之后的开发中需要修改打包相关的信息的时候会快很多)

### 全家桶安装

### redux安装和使用

`npm i redux -S`

`npm i redux-thunk -S` 处理异步问题

`npm i react-redux -S` 根据接口来使用store

使用:

(一) Provider: 组件再应用的最外层,传入store即可,只用一次

(二) Connect:负责从外部获取组件需要的参数 `npm install babel-plugin-transform-decorators-legacy -D` 装饰器方便connect的书写,在package里面添加`"plugins": [ ["@babel/plugin-proposal-decorators", { "legacy": true }]]`(babel的配置)

### react-router4

`npm i react-router-dom -S`(dom和native相对应,web和H5)

> 这一块是我早之前收集的，现在应该很多都过时了，目前正在集成新的脚手架，使用的是`reacr + hooks + mobx + js/ts`

### 将react的技术栈集成到自己的脚手架中

由于之前的技术栈一直是vue，没有使用过整体的react的项目开，一直没有把react集成到脚手架中，原因：

1. 自己对react本身的不熟悉，不能做到即装即用
2. 没有实际的项目经验，无法指定具体的使用场景

目前已经使用react开发过一个PC端，一个移动端的项目了，先集成一版可以使用的，再之后使用过程中，如果有深的理解或者其他的收获，会持续优化版本

先集成h5的模版--使用技术栈： react + react-router-dom + mobx + js + less(module)

之后会集成PC端的模版--使用技术栈：react + react-router-dom + mobx + ts + styled-componentss

#### 以下记录集成h5的模版开发过程中遇到的问题

1. 使用create-react-app初始化简单的模版，并删除所有不需要的文件

2. 修改webpack配置，其实是把原先的webpack相关配置全部重写了，让项目跑起来

3. 添加路由表、mobx文件和使用demo

4. 添加修改babel的配置

5. 修改eslint，说实话之前我自己对eslint的了解还是太少了，停留在寻找demo直接使用的阶段，趁这个机会刚好把eslint多了解一下，会在eslint下面有文档更新

6. 添加react文档（包括目录说明、使用技术栈以及理由等）

> [脚手架使用地址](https://www.npmjs.com/package/nic-cli)

## antd使用注意点

### from

如何使表单受控？-- `getFieldDecorator` --- 用于和表单进行双向绑定，详见下方描述

父级如何控制子级? -- `wrappedComponentRef`

联动关系如何设置？ -- `setFieldsValue` --- 设置一组输入控件的值（注意：不要在 componentWillReceiveProps 内使用，否则会导致死循环)

滚动到指定的错误位置 -- `validateFieldsAndScroll` --- 如果错误不在可视区域

表单里的默认数据 -- `initialValue` --- 通过options里面的initialValue去设置

把父组件的属性映射到表单项上 -- `mapPropsToFields` --- 方便父组件控制

父级元素给自己传入表单的值的时候

```js
@Form.create({
  mapPropsToFields(props) {
    // 使用上层组件的scope的值作为表单的数据
    const { scope } = props;

    return {
      nickname: Form.createFormField({
        value: scope.nickname,
      }),
      phone: Form.createFormField({
        value: scope.phone,
      }),
      address: Form.createFormField({
        value: scope.address,
      }),
      agreement: Form.createFormField({
        value: scope.agreement,
      }),
    };
  },
  name: 'base_form'
})
```

诸如有些默认值设置不上的时候，其实是在初始化的时候还没有对应的值，而是通过接口拿到之后给set的这个时候对于tab，tree给默认值的时候可能不会生效，修改方式，在请求的时候不去加载dom而是使用spin去添加loading解决初始化没值的问题

### antd-mobile

这个组件库可以说是相当的不好用，所以我使用react的开发，有90%是没有使用这个开发的，样式基本需要再二次开发，需要的功能也比较少

## HTML-DOM事件对象

为什么要在要把`HTML`的`DOM`事件对象，放在这个地方说呢？因为我喜欢啊，其实是因为在写`react`的时候我才知道这么多的`DOM`事件

### 鼠标事件

属性 | 描述
-|-
onclick | 当用户点击某个对象时调用的事件句柄
oncontextmenu | 在用户点击鼠标右键打开上下文菜单时触发
ondblclick | 鼠标按钮被按下。
onmousedown | 当用户双击某个对象时调用的事件句柄。
onmouseenter | 当鼠标指针移动到元素上时触发。
onmouseleave | 当用户双击某个对象时调用的事件句柄。
ondblclick | 当鼠标指针移出元素时触发
onmousemove | 鼠标被移动。
onmouseover | 鼠标移到某元素之上。
onmouseout | 鼠标从某元素移开。
onmouseup | 鼠标按键被松开。
ondblclick | 当用户双击某个对象时调用的事件句柄。

### 拖动事件

属性 | 描述
-|-
ondrag | 该事件在元素正在拖动时触发
ondragend | 该事件在用户完成元素的拖动时触发
ondragenter | 该事件在拖动的元素进入放置目标时触发
ondragleave | 该事件在拖动元素离开放置目标时触发
ondragover | 该事件在拖动元素在放置目标上时触发
ondragstart | 该事件在用户开始拖动元素时触发
ondrop | 该事件在拖动元素放置在目标区域时触发

### 表单事件

属性 | 描述
-|-
onblur | 元素失去焦点时触发
onchange | 该事件在表单元素的内容改变时触发(`<input>, <keygen>, <select>, 和 <textarea>`)
onfocus | 元素获取焦点时触发
onfocusin | 元素即将获取焦点时触发
onfocusout | 元素即将失去焦点时触发
oninput | 元素获取用户输入时触发
onreset | 表单重置时触发
onsearch | 用户向搜索域输入文本时触发 (`<input="search">`)
onselect | 用户选取文本时触发 (`<input> 和 <textarea>`)
onsubmit | 表单提交时触发

[更多事件](https://www.runoob.com/jsref/dom-obj-event.html)


