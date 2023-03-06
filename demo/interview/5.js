/**
 * Proxy
 * 两个参数:
 * target: 目标对象
 * handle: 钩子的拦截处理，如果为空则对proxy所有操作直接给target
 */

const targetObj = {
  name: 'salvatore',
  role: 'admin'
}

const handle = {
  /**
   * 
   * @param {*} target 是目标对象，该对象作为第一个参数传递给 new Proxy，
   * @param {*} property 目标属性名
   * @param {*} receiver 
   * @returns 
   */
  get(target, property, receiver) {
    // NOTE: receiver基本上不会被使用
    if(property === 'name') {
      target[property] = 'nic'
    }
    return target[property] || property
  },
  /**
   * 
   * @param {*} target 是目标对象，该对象作为第一个参数传递给 new Proxy
   * @param {*} property 目标属性名称
   * @param {*} value 目标属性要设置的值
   * @param {*} receiver 与 get 钩子类似，仅与 setter 访问器相关
   */
  set(target, property, value, receiver) {
    if (property !== 'danger' && value) {
      target[property] = value
      return true
    } else {
      throw new Error('key can not danger')
    }
  }
}

let proxy = new Proxy(targetObj, handle)

console.log(proxy.name)

proxy.age = 25

proxy.danger = true

console.log(proxy.age, proxy.danger)

// 封装一个网络库，限制最大在途请求数不超过Max。
