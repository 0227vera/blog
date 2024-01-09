function A (name, age) {
    this.name = name
    this.age = age
    this.showName = function () {
        console.log(`My name is ${this.name}`)
    }
}

A.prototype.saySelf = function () {
    console.log(`My name is ${this.name}, I am ${this.age} years old`)
}

function B (name, age, love) {
    A.call(this, name, age)
    this.love = love
}

B.prototype = A.prototype
B.prototype.constructor = B

// const a = new B('salvatore', 20, 'basketball')
// console.log(a)

const debounce = (fn, wait, immediate = false) => {
    let timeout = null
    return function (...arg) {
        const context = this
        if (immediate) {
            const flag = !timeout
            if (flag) {
                fn.apply(context, arg)
            } else {
                clearInterval(timeout)
            }
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            return
        }
        clearInterval(timeout)
        timeout = setTimeout(() => {
            fn.apply(context, arg)
        }, wait)
    }
}

const throttle = (fn, wait) => {
    let  timeout = null
    return function (...arg) {
        const context = this
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                fn.apply(context, arg)
            }, wait)
        }
    }
}

/**
 *  写一个mySetInterVal(fn, a, b), 每次间隔 a,a+b,a+2b,...,a+nb 的时间，执行一次fn
 * 然后写一个 myClear，停止上面的 mySetInterVal
 * */

let timer = null
let n = 0

const mySetInterVal = (fn, a, b) => {
    timer = setInterval(() => {
        fn()
        clearInterval(timer)
        n++
        mySetInterVal(fn, a, n * b)
    }, a + b)
}

const myClear = () => {
    clearInterval(timer)
    timer = null
    n = 0
}

const func = () => console.log('aaaaaa')

// mySetInterVal(func, 1000, 2000)

// setTimeout(() => {
//     myClear()
// }, 1000 * 10)

/**
 * 实现 add(1)(2)(3)
 */

const add = x => y => z => x + y + z
// console.log(add(1)(2)(3))


const Status = {
    Pendding: 'pendding',
    Fulfilled: 'fulfilled',
    Rejected: 'rejected'
}

class MyPromise {
    constructor(funcNow) {
        this.status = Status.Pendding
        this.value = undefined
        this.reason = undefined
        this.resolveList = []
        this.rejectList = []
        const resolve = value => {
            console.log(value)
            if (this.status === Status.Pendding) {
                this.status = Status.Fulfilled
                this.value = value
                this.resolveList.forEach(fn => {
                    fn?.(this.value)
                })
            }
        }
        const reject = reason => {
            if (this.status === Status.Pendding) {
                this.status = Status.Rejected
                this.reason = reason
                this.rejectList.forEach(fn =>{
                    fn?.(this.reason)
                })
            }
        }
        try {
            funcNow(resolve, reject)
        } catch (error) {
            throw(new Error(error))
        }
        
    }
    then(onResulved, onRejected) {
        console.log('stauts', this.status)
        if (this.status === Status.Fulfilled) {
            onResulved(this.value)
        } else if (this.status === Status.Rejected) {
            onRejected(this.reason)
        } else if (this.status === Status.Pendding) {
            onResulved && this.resolveList.push(onResulved)
            onRejected && this.rejectList.push(onRejected)
        }
        return this
        
    }
    catch(onRejected) {
        this.rejectList.push(onRejected)
        return this
    }
}

const p = new Promise((resolve, reject) => {
    resolve(111)
    setTimeout(() => {
        reject('3333333')
    }, 3000);
})
console.log(p)
p.then(res => {
    console.log('success======>', res)
    return 444
}).catch(err => {
    console.error('err======>', err)
})

const str = 'kuai-shou-front-end'

const lineTow = str => str.replace(/-\w/g, $1 => $1[1].toUpperCase())

const lineHeng = str => str.replace(/[A-Z]/g, $1 => `-${$1.toLowerCase()}`)
console.log(lineTow(str))
console.log(lineHeng('ashfaAadfgiBaj;aC'))


// forEach
if (!Array.prototype.forEach) {
    if (Object.prototype.toString.call(this) !== '[object Array]') {
        return 'forEach的调用方应该为数组'
    }
    Array.prototype.forEach = function(a, b) {
        for(let i = 0; i <= this.length; i++) {
            a.call(b, this[i], i, b)
        }
    }
}

console.log(9999)
const arr = [1]
arr.forEach(function(item, index, self) {
    console.log(item, index, self)
    console.log(this)
}, [2,3])

// apply接受两个参数，this,参数数组
if (!Function.prototype.apply) {
    Function.prototype.apply = function() {
        if (Object.prototype.toString.call(this) !== '[object Function]') {
            return 'call methods caller should be function'
        }

    }
}