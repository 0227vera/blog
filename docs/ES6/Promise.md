# Promise
Promise 就是用来做异步操作使用的，之前典型的异步操作的方法就是ajax
  * 同步操作和异步操作
  1. 同步操作：一次只能经行一个操作 代码清晰
  2. 异步操作：同时经行多个操作 代码混乱

Promise的前世今生

ajax -> Promise -> async/await

## 说一下Promise吧
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
## async/await
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

<back-to-top />
