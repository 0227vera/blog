const FULFUILLED = 'fulfuilled'
const REJECTED = 'rejected'
const PEDDING = 'penning'

function runMicroTash(cb) {
    if (process && process.nextTick) {
        return process.nextTick(cb)
    } else if (MutationObserver) {
        const div = document.createTextNode('1')
        const ob = new MutationObserver(cb)
        ob.observe(div, {
            childList: true
        })
        div.childNodes = '2'
    } else {
        setTimeout(() => {
            cb()  
        })
    }
}

function isPromiseLike (value) {
    return !!(value && typeof value === 'object' && typeof value.then === 'function')
}

class MyPromise {
    /**
     * 
     * @param {*} executor 立即执行函数，包含resolve和reject两个函数
     */
    constructor(executor) {
        this._data = null
        this._status = PEDDING
        this._taskList = []
        executor(this._resolve.bind(this), this._reject.bind(this))
    }
    /**
     * 状态改变函数
     * @param {*} data 需要返回的函数
     * @param {*} status 需要改变的状态
     * @returns 
     */
    _changeStatus(data, status) {
        if (this._status !== PEDDING) return
        this._data = data
        this._status = status
        this._runTaskList()
    }
    /**
     * 
     * @param {*} value 立即执行的resolve对应的参数
     */
    _resolve(value) {
        this._changeStatus(value, FULFUILLED)
    }
    /**
     * 
     * @param {*} err 立即执行的reject对应的参数
     */
    _reject(err) {
        this._changeStatus(err, REJECTED)
    }
    /**
     * 添加队列
     * @param {*} fn 对应的立即执行函数
     * @param {*} status 对应的状态值
     * @param {*} resolve 返回resolve
     * @param {*} reject 返回reject
     */
    _pushTaskList(fn, status, resolve, reject) {
        this._taskList.push({ fn, status, resolve, reject })
    }
    _runTaskList() {
        if (this._status === PEDDING) {
            return
        }
        while(this._taskList[0]) {
            const task = this._taskList.shift()
            this._runOneTaskList(task)
        }
        this._taskList.forEach(task => {
            this._runOneTaskList(task)
        })

    }
    _runOneTaskList({ fn, status, resolve, reject }) {
        runMicroTash(() => {
            if (this._status !== status) {
                return
            }
            if (typeof fn !== 'function') {
                if (this._status === FULFUILLED) {
                    resolve(this._data)
                } else {
                    reject(this._data)
                }
                return
            }
            try {
                const result = fn(this._data)
                if (isPromiseLike(result)) {
                    result.then(resolve, reject)
                } else {
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    then(onFulfuilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this._pushTaskList(onFulfuilled, FULFUILLED, resolve, reject)
            this._pushTaskList(onRejected, REJECTED, resolve, reject)
            this._runTaskList()
        })
    }
    catch (onRejected) {
        return this.then(null, onRejected)
    }
}


const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(33)
    }, 1000);
})



const p1 = p.then((res) => {
    console.log(res)
    return new MyPromise((resolve, reject) => {
        reject('error')
    })
}).catch(err => {
    console.log('错误是：', err)
    return new MyPromise((resolve, reject) => {
        resolve('成功')
    })
}).then(res => {
    console.log(res)
})

setTimeout(() => {
    console.log(p1)
}, 2000)