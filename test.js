let obj = {
  name: 'salvatore',
  id: 'adfhlw452345lahfa1234lha0per8f7',
  type: 'new',
  area: 'ss'
}
let path = ''
Object.keys(obj).forEach(item => {
  path = path ? path += `&${item}=${obj[item]}` : path += `/?${item}=${obj[item]}`
})
console.log(path)