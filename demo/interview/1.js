/**
 * add(1)(2)(3)
 */

const add = function()  {
  if(!add.result) add.result = 0
  add.result = [...arguments].reduce((sum,item) => sum + item, add.result)
  return add
}

const s = add(1, 2)(3)(4,5).result
console.log(s)

const func = () => {}
func.a = 30
console.log(func)

let e = {  
  length: 3,  
  "0": 1,  
  "1": 'sss',  
  "2": 'rerer'
}