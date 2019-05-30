let push = Function.prototype.apply.bind(Array.prototype.push)
// let push = Array.prototype.push.bind(Array)
let arr = [1,2,43,4]
let a = push(arr,[3])
console.log(arr)
arr.pop()
console.log(arr)