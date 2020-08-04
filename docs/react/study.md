# 学习react需要注意的点

## 1. props的数据不可修改，在当前组件中受到保护

保护单向数据流的设计理念

## 2. onClick bind

`onClick = { this.handleClick }`

解决方案两个：

1. bind，绑定当前的组件中否则this是被调用时候的对象(这里指的是调用当前组件的组件)

2. 把handleClick中的this穿透到当前(这里指的是当前的组件)中去

## 3. react的生命周期

![效果图](../.vuepress/public/react/react-life-cycle.png)

个人感觉react的生命周期是简单的

## 4. setState的同步异步问题

疑问：如何让setState同步执行

注意：在异步的情况下，第二个参数，也就是回调的使用

## 5. 受控组件和非受控组件

在表单输入中

受控组件：使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。可以理解为表单组件的value只能够使用setState()来控制

非受控组件：可以理解为不与state相关联，而是单纯的使用ref或者操作dom的方式去改变，也可以理解为内容过完全由用去定义，代码不做设置

## 6. redux上面的方法和数据获取

这只是其中的一种处理方法

`this.props[methods]`:

`this.props.currentuser`

`this.props.fetchCurrentUser()`

`export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))`在router中调用redux的方法。添加属性和方法，以这一种方式导出具体的某一个组件

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

## 7. 如何获取query和params上面的数据

`this.props.match.params[prop]`

`this.props.match.query[prop]`

## 8. state的数据改动

state的改动如果没有动址，则可以直接改动，eg:

```js
this.state.obj.a = 3
```

> 注意：这种并不会触发生命周期函数中的componentWillUpdate的钩子，还是需要setState来触发

如果改变的是值，则需要使用setState，eg:

```js
this.setState({a:3})
```

## 9. store中的state的三大原则

* 单一的数据源 --- object tree

* state是只读的 --- 改变state的唯一方法就是触发action

* 使用纯函数来修改state --- reducers，改变之后返回给的是state，而不是相关的业务组件，这个一定要搞清楚

补充一点：严格的单向数据流是 Redux 架构的设计核心。

## 10. Action

Action是把数据从应用（这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

## 11. Reducer

reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state

为了保持reducer的纯洁，注意不要在reducer里面做如下的事情：

* 修改传入参数；
* 执行有副作用的操作，如 API 请求和路由跳转；
* 调用非纯函数，如 Date.now() 或 Math.random()。

目的：只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

## 12. 使用redux-saga(一个react的中间键)时候的顺序

业务this.props[methods] --> saga中的methods(一般是异步的)---> put(相当于dispatch) ---> reducer ---> store ---> view

## 13. 函数命名

以前自己写项目还好点，感觉getData、show、visible这样的也没什么问题，但是这次看了一个新项目，别人这样命名心里喷死他了，这个也和vue和react之间的区别有关，vue中可能一个vue文件里面只有一个showdialog，也只有一次请求数据，所以这种命名还好点，但是在react中一个文件那么大，上来一个getData这个命名完全没什么意义，和a没什么差别，所以以后在写代码的时候不管怎么说，命名一定要语义化

## 14. 组合 vs 继承

组合和继承，在react的文档中推荐使用组合而非继承来实现组件间的代码重用

包含关系可以理解为vue中的插槽的概念

组件可以接受任意 props，包括基本数据类型，React 元素以及函数

## 设计state的时候

只保留应用所需的可变 state 的最小集合，其他数据均由它们计算产生，就像在vue中我们会有一些computed属性一样

以下的情况的数据都不应该放在state里面：

1. 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
2. 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
3. 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

## 15. state中的值应该如何合理的设计

1. 找到根据这个 state 进行渲染的所有组件。
2. 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。
3. 该共同所有者组件或者比它层级更高的组件应该拥有该 state。
4. 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。

## 16. 高阶组件(HOC)

HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

注意：

1. 不要在 render 方法中使用 HOC

2. 务必复制静态方法

3. Refs 不会被传递

## 17. 声明式和命令式

声明式和命令式是两种编程范式。react是声明式的，jquery那样直接操作dom是命令式

一般来说，声明式编程关注于发生了啥，而命令式则同时关注于咋发生的

纠正一点自己的想法：

以前总觉得vue和react一个是声明式的一个是命令式的，其实：vue和react都是声明式的编程，通过操作model去改变view，底层如何实现的mv不用去管

## 18. 什么是Hook

Hook 是能让你在函数组件中“钩入” React 特性的函数。它们名字通常都以 use 开始

>Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 19. useState

作用可以相当于class中的state和setState

## 20. useEffect

它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途

如果想只调用componentDidMount

```js
useEffect(() => {},[])
```

在某种条件下进行update

```js
useEffect(() => {},[count])
```

如果想只调用 componentWillUnmount

每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。React 会在组件卸载的时候执行清除操作而不是componentWillUnmount？

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

## 21. useContext

`const value = useContext(MyContext)`

在数据传递过程中使用，如果出入的MyContext(可能是父组件传递过来的，也可能是store里面的数据)发生变化，那么也会导致当前组件的数据更新

## 22. useCallback

useCallback 的作用在于利用 memoize 减少无效的 re-render，来达到性能优化的作用。还是那句老生常谈的话，“不要过早的性能优化”。从实际开发的经验来看，在做这类性能优化时，一定得观察比较优化的结果，因为某个小角落的 callback 就可能导致优化前功尽弃，甚至是适得其反。

## 23. useRef

通过ref拿到相关的数据，ref的作用相比于class的时候作用大了很多

## 24. 如何理解依赖注入（DI）

?

## 25. 使用过的前端代理的方式

1. webpack中的proxy，添加jwt验证的验证规则

2. 使用node的模块(`whistle`)+chrome的插件(`SwitchyOmega`)共同实现

## 26. hook中的useState

如果useState的前后两次不变的话，页面不会更新，所以注意在数组时候的处理
