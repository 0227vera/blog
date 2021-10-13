const sum10 = arr => arr.reduce((sum, item) => item <= 10 ? (sum + +item) : sum, 0)
console.log(sum10([1,2,3,4,5,11]))

const str = 'kuai-shou-front-end'

// NOTE: 横线转驼峰
const lineToW = str => str.replace(/(-\w)/g, $1 => $1[1].toUpperCase())
// NOTE: 驼峰转横线
const wToLine = str => str.replace(/[A-Z]/g, $1 => `-${$1.toLowerCase()}`)

console.log(wToLine(lineToW(str)))