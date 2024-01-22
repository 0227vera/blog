/**
 * version1 = '1.2', version2 = '0.2', diffVersion(verison1, version2)返回1
 * version1 = '1.2', version2 = '3.2', diffVersion(verison1, version2)返回-1
 * version1 = '1.2', version2 = '1.2', diffVersion(verison1, version2)返回0
 */

function diffVersion(v1, v2) {

}

const coder = {
  skills: ['js', 'css'],
  run: function() {
    for (var i = 0; i < this.skills.length - 1; ++i) {
      setTimeout(function() {
        console.log(this.skills[i] + i);
      }, 1000);
    }

  }
}

// coder.run()


/**
 * 
 */

function runMicroTask(fn) {
  if (typeof process !== 'undefined' && typeof process.nextTick === 'function' ) {
    return process.nextTick(fn)
  } else if (typeof MutationObserver === 'function') {
    const ob = new MutationObserver(fn)
    const textNode = document.createTextNode('1')
    ob.observe(textNode, {
      characterData: true
    })
    textNode.data = '2'
  } else {
    setTimeout(() => {
      fn 
    })
  }
}

function isPromiseLike(value) {
  return value && typeof value.then === 'function'
}

Promise.prototype.catch = function(reject) {
  return this.then(null, reject)
}
Promise.prototype.finally = function(onFinally) {
  return this.then(
    value => Promise.resolve(onFinally()).then(() => value), 
    error => Promise.resolve(onFinally()).then(() => {
      throw error
    })
  )
}
Promise.resovle = function(value) {
  if (value instanceof Promise) return value
  if (isPromiseLike(value)) {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject)
    })
  }
}
Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

/**
 * [
 *  ['A', 'B', 'C'],
 *  [1, 2, 3],
 *  ['a', 'b', 'C']
 * ]
 */
// 输入 [['A', 'B', ...], [1, 2], ['a', 'b'], ...]

// 输出 ['A1a', 'A1b', ....]

const sortMatrixArr = (arr1, arr2) => {
  if (!arr1.length) {
    return arr2
  }
  const res = []
  arr1.forEach(item => {
    arr2.forEach(item2 => {
      res.push(`${item}${item2}`)
    })
  })
  return res
}

const sortMatrix = arr => {
  return arr.reduce((res, item) => {
    return sortMatrixArr(res, item)
  }, [])
}

const twoArr = [
  ['A', 'B', 'C'],
  [1, 2, 3],
  ['a', 'b', 'C']
]

// const res = sortMatrix(twoArr)
// console.log(res)


/**
 * pre = 'abcde123'
 * now = '1abc123'
 */

const pre = 'abcde123'
const now = '1abc123'

// 1. 当前索引值比较

const compareStr = (pre, now) => {
  const res = []
  let index = 0
  while(true) {
    console.log(res, pre, now, index)
    if (pre.length === now.length) {
      return res
    }
    if (pre[index] !== now[index]) {

      if (index === 0) {
        res.push({
          type: 'add',
          index: 0,
          content: now[index]
        })
        now.shift()
      } else {
        res.push({
          type: 'delete',
          index,
          content: pre[index]
        })
        now.splice(index, 0, pre[index])
        index++
      }
    } else {
      index++
    }
  }
}

// compareStr(pre.split(''), now.split(''))

/**
 * 要求：实现LazyMan的链式调用，完成LazyMan(name).eat().sleep()
 * @Author: salvatoreliaoxuan salvatoreliaoxuan@didiglobal.com
 * @Date: 2023-02-06 17:22:22
 * @LastEditors: salvatoreliaoxuan salvatoreliaoxuan@didiglobal.com
 * @LastEditTime: 2023-02-06 17:36:08
 * @param {name} 名字
 * @retrun {object} LazyMan 返回一个LazyManClass实例
 * @retrun {object} LazyMan.eat() 吃东西
 * @retrun {object} LazyMan.sleep() 睡多久
 * @example
 * const LazyManTony = new LazyManClass('Tony')
 * LazyManTony.eat('lunch').sleep(10).eat('dinner').sleep(20)
 */

class LazyManClass {
  constructor(name) {
    this.name = name
    this.task = []
    console.log(this.name)
    setTimeout(() => {
      this._next()
    })
  }
  _next() {
    console.log(this.task)
    const func = this.task.shift()
    func?.()
  }
  eat(f) {
    const self = this
    const fn = function(food) {
      return function() {
        console.log(food)
        self._next()
      }
    }(f)
    this.task.push(fn)
    return this
  }
  sleep(time) {
    const self = this
    const fn = function(t) {
      return function() {
        console.log('sleep……')
        setTimeout(() => {
          self._next()
        }, t * 1000);
      }
    }(time)
    this.task.push(fn)
    return this
  }
}

// const LazyManTony = new LazyManClass('Tony')
// setTimeout(() => {
//   LazyManTony.eat('lunch').sleep(10).eat('dinner').sleep(20)
// })

/**
 *  写一个mySetInterVal(fn, a, b), 每次间隔 a,a+b,a+2b,...,a+nb 的时间，执行一次fn
 * 然后写一个 myClear，停止上面的 mySetInterVal
 * */
let timer = null
let n = 0
const mySetInterVal = (fn, a, b) => {
  timer = setInterval(() => {
    clearInterval(timer)
    fn()
    n++
    mySetInterVal(fn, a, n * b)
  }, a + b);
}

const myClear = () => {
  clearInterval(timer)
  timer = null
  n = 0
}


// mySetInterVal(() => {
//   console.log(2)
// }, 1000, 1000)

var b = 10;
(function b(){
    b = 20;
    // console.log(b);
})();


/**
 * 斐波拉切数列
 * 1 1 2 3 5 8 13
 */

const getN = (n) => {
  if (n === 1 || n === 2) {
    return 1
  }
  return getN(n-1) + getN(n - 2)
}

const getForN = n => {
  let p1 = 1
  let p2 = 1
  let dp = 0
  for(let i = 2; i < n; i++){
    dp = p1 + p2
    p1 = p2
    p2 = dp
  }
  return dp
}

const c = getForN(6)
console.log('========>', c)

var removeElement = function (nums, val) {
  let n = nums.length
  let left = 0
  let right = 0
  while (right < n) {
      if (nums[right] !== val) {
          nums[left] = nums[right]
          left++
      }
      right++
  }
  console.log(nums)
  return left
};
const g = [0,1,2,2,3,0,4,2]
removeElement(g, 2)