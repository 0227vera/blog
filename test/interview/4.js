/*
 *示例：
 *给定数组：[2,6,3,8,10,9]
 *返回数组：[6,8,8,10,-1,-1]
 */

const func = arr => arr.reduce((newArr, item, index) => {
    newArr[index] = arr.slice(index).filter(f => f > item)?.[0] || -1
    return newArr
  }, [])

console.log(func([2,6,3,8,10,9]))