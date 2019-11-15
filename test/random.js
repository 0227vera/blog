let createOrderArr = num => Array.from(new Array(num), (item,index) => index+1)
let traAryByRandom2 = array => {
  let length = array.length
  let res = [...array]
  for (let i = length - 1; i > 0; i-- ) {
    let index =  Math.floor( Math.random() * res.length )
    if (res[index] !== res[i]) [res[index], res[i]] = [res[i], res[index]]  
  }
  return res
}
console.log(traAryByRandom2(createOrderArr(500)))