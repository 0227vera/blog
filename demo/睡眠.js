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
    this.taskList = []
    console.log(`Hi I am ${this.name}`)
    // note: 需要在完成eat/sleep方法推入之后的首次调用
    setTimeout(() => {
      this._next()
    })
  }
  _next() {
    const func = this.taskList.shift()
    func?.()
  }
  eat(food) {
    const _this = this
    const fn = function (f) {
      return function () {
        console.log(`I am eating ${f}`)
        _this._next()
      }
    }(food)
    this.taskList.push(fn)
    return this
  }
  sleep(time) {
    const _this = this
    const fn = function (t) {
      cons(t)
      return function () {
        // cons(t)
        setTimeout(() => {
          _this._next()
        }, t * 1000)
      }
    }(time)
    this.taskList.push(fn)
    return this
  }
}

const cons = (time) => {
  let t = time
  if (t) {
    setTimeout(() => {
      console.log(`sleep ${t}s`)
      t--
      cons(t)
    }, t * 1000)
  }
}
const LazyManTony = new LazyManClass('Tony')

LazyManTony.sleep(1).eat('lunch').sleep(2).eat('dinner').sleep(3).eat('junk food')