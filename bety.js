// 数组洗牌,  [1, 2, 3, 4, 5]随机打乱

const createRandomIndex = (length, arr = []) => {
  const randomIndex = Math.floor(Math.random() * length)
  if (arr.includes(randomIndex)) {
    return createRandomIndex(length, arr)
  } else {
    arr.push(randomIndex)
    return arr.length === length ? arr : createRandomIndex(length, arr)
  }
}

const randomArr = (arr)=> {
  const randomIndex = createRandomIndex(arr.length)
  return randomIndex.map(item => arr[item])
}

const newArr = randomArr([1, 2, 3, 4, 5])

console.log(newArr)