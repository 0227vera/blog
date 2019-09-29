let data = [10,20,30,40,50]

let request = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(data)
      resolve(data + 1000)
    }, data*100)
  })
  
}
(async () => {
  let data = []
  for (let item of data) {
    data.push(request(item))
  }
  console.log(data)
  let re = []
  for (let t of data) {
    re.push(await t())
  }
  console.log(re)
  console.log('end')
})()

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
let a = [...new Set(arr.flat(Infinity))].sort((a,b) => a-b)
// let a = arr.toString().split(',').sort((a,b) => a-b).map(Number)
console.log(a)

// 实现一个new

function _new () {
  let arg =[].slice.call(arguments)
  let constructor = arg.shift()
  let context = Object.create(constructor.prototype)
  let result = context.apply(constructor,arg)
  return typeof request !== object && request !== null ? result : context
}