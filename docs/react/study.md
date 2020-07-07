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

受控组件：使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

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
