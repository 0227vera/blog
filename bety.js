// a_b_ccc_D_EEE_f ==> aBCccdeEEF

const transformStr = str => str.replace(/(_\w)/g, $ => $[1].toUpperCase())

const transform_str = str => str.replace(/[A-Z]/g, s => `_${s.toLowerCase()}`)

const newStr = transformStr('a_b_ccc_D_EEE_f')
console.log(newStr)
const newerStr = transform_str(newStr)
console.log(newerStr)