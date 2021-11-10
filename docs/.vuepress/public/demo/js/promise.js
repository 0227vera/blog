const STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECT: 'rejected'
}

class MyPromise {
  constructor(executor) {
    this.status = STATUS.PENDING
    this.value = undefined
    this.reason = undefined
    const resolve = value => {
      if (this.status === STATUS.PENDING) {
        this.value = value
        this.status = STATUS.RESOLVED
      }
    }
    const reject = reason => {
      if (this.status === STATUS.PENDING) {
        this.reason = reason
        this.status = STATUS.REJECT
      }
    }
    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFullfilled = () => {}, onRejected = () => {}) {
    const action = {
      [STATUS.RESOLVED]:() => {
        console.log(this.value)
        onFullfilled(this.value)
      },
      [STATUS.REJECT]:() => {
        onRejected(this.reason)
      }
    }
    action[this.status]?.()
    return this
  }
  catch(onRejected) {
    onRejected(this.reason)
    return this
  }
}

const p = new MyPromise(function(resolve, reject){resolve(1)})
p.then(res => {
  console.log('=======>', res)
}).catch(e => {
  console.log('e====+>', e)
})