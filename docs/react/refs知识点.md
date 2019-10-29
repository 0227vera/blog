# refs知识

`refs`提供了一种方式，允许我们访问DOM节点或在`render`方法中创建React元素

### refs使用场景

在某些情况下，我们需要在典型数据流之外强制修改子组件，被修改的子组件可能是一个React组件的实例，也可能是一个DOM元素，例如：

* 管理焦点，文本选择或者媒体播放
* 促发强制动画
* 集成第三方库
* 访问子组件的方法

## 设置refs

### 1. createRef

> 支持在函数组件和类组件内部使用

`createRef`是在React16.3版本中引入的。（React现在的版本是16.8.6）

#### ① 如何创建Refs

使用 `React.createRefs()` 创建`Refs`，并通过`ref`属性添加到React元素上。通常在构造函数中，将`Refs`分配给实例属性，以便整个组件中引用。

#### ② 访问Refs

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

* 当 `ref` 属性用于 `HTML` 元素时候，构造函数中使用 `React.createRefs()` 创建的 `ref` 接收底层 `DOM` 元素作为其 `current` 属性
* 当 `ref` 属性用于自定义的 `class（有状态）` 组件时， `ref` 对象接收组件的挂载实例作为其 `current` 属性。
* <font color="red">不能在函数（无状态）组件上使用 ref 属性，因为函数组件没有实例。</font>

### 2. useRef

> 仅限于在函数组件内使用

useRef 是 React16.8 中引入的，只能在函数组件中使用。

#### ① 创建 Refs

使用 `React.useRef()` 创建 `Refs`，并通过 `ref` 属性附加至 `React` 元素上。

```js
const refContainer = useRef(initialValue);
```

`useRef` 返回的 `ref` 对象在组件的整个生命周期内保持不变。

#### ② 访问 Refs

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

### 3. 回调 Refs

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

### 4. Ref 传递

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
3. `React` 传递 `ref` 给 `forwardRef` 内函数 `(props, ref) => ... ` 作为其第二个参数。
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

<gitask />

<back-to-top />
