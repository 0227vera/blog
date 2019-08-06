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