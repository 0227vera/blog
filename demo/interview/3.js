const STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECT: 'reject'
}

class MyPromise{
  constructor (doNow) {
    this.value = undefined
    this.reason = undefined
    this.status = STATUS.PENDING
    const resolve = value => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.RESOLVED
        this.value = value
      }
    }
    const reject = reason => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECT
        this.reason = reason
      }
    }
    try {
      doNow(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onSuccess = () => {}, onFail = () => {}) {
    const actions = {
      [STATUS.RESOLVED]: () => {
        onSuccess(this.value)
      },
      [STATUS.REJECT]: () => {
        onFail(this.resolve)
      }
    }
    actions[this.status]?.()
    return this
  }
  catch(onFail){
    onFail(this.reason)
    return this
  }
}

const promise = new MyPromise(function(resolve, reject){
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
promise.then(res => {
  console.log('res======>', res)
}).catch(e => {
  console.log('e======>', e)
})