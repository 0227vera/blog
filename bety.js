/**
 * version1 = '1.2', version2 = '0.2', diffVersion(verison1, version2)返回1
 * version1 = '1.2', version2 = '3.2', diffVersion(verison1, version2)返回-1
 * version1 = '1.2', version2 = '1.2', diffVersion(verison1, version2)返回0
 */

function diffVersion(v1, v2) {

}

const coder = {
  skills: ['js', 'css'],
  run: function() {
    for (var i = 0; i < this.skills.length - 1; ++i) {
      setTimeout(function() {
        console.log(this.skills[i] + i);
      }, 1000);
    }

  }
}

// coder.run()


const tree = [{
  value:"a",
  children:[
    {
      value:"c",
      children:[
        {
          value:"f",
          children:[]
        },
        {
          value:"g",
          children:[]
        }
      ]
    },
    {
      value:"b",
      children: [
        {
          value:"d",
          children:[
            {
              value:"e",
              children:[
                {
                  value: "h",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}]

const dfs = (root, goal) => {
  const stack = [...root]
  let dir = ''
  while(stack.length) {
    const node = stack.shift()
    dir += `${node.value}-`
    if (node.value === goal) {
      dir = dir.slice(0, -1)
      return dir
    }
    const child = node.children || []
    for(let i = child.length -1; i >=0; i--) {
      const item = child[i]
      stack.unshift(item)
    }
  }
  return -1
}

const bfs = (root, goal) => {
  const stack = [...root]
  let dir = ''
  while(stack.length) {
    const node = stack.shift()
    dir += `${node.value}-`
    if (node.value === goal) {
      dir = dir.slice(0, -1)
      return dir
    }
    node.children.forEach(item => stack.push(item))
  }
  return -1
}

console.log(bfs(tree, 'h'))
// console.log(dfs(tree, 'h'))

class EventBus{
  constructor() {
    this.list = []
  }
  on(name, func) {
    const isHasName = this.list.find(item => item.name === name)
    if (isHasName) {
      this.list.forEach(item => {
        if (item.name === name) {
          item.cbs.push(func)
        }
      })
    } else {
      this.list.push({
        name,
        cbs: [func]
      })
    }
  }
  emit(name, ...params) {
    const Funcs = this.list.find(item => item.name === name)?.cbs || []
    Funcs.forEach(cb => {
      cd.apply(this, params)
    })
  }
  once(name, func) {
    this.list.push({
      name,
      cd: params => {
        func(params)
        this.remove(name)
      }
    })
  }
  remove(name) {
    this.list = this.list.filter(item => item.name !== name)

  }
  removeAll() {
    this.list = []
  }
}

/**
 * 并发请求
 * @params {string[]} urls 待请求的url数组
 * @params {number} maxNum 最大的并发数
 */

const fetch = (url, index) => {
  return new Promise(resolve => {
    const time = Math.random() * 1000
    setTimeout(() => {
      resolve({
        url,
        index,
        time
      })
    }, time)
  })
}

function concuiRequest(urls, maxNum) {
  return new Promise((resolve) => {
    if (!urls.length) {
      resolve([])
    }
    let index = 0
    const result = []
    let finishCount = 0
    async function request() {
      const i = index
      const url = urls[index]
      index++
      try {
        const res = await fetch(url, index)
        result[i] = res
      } catch (error) {
        result[i] = error
      } finally {
        console.log(result)
        if (finishCount === urls.length) {
          resolve(result)
        }
        if (index < urls.length) {
          request()
        }
      }
    }
    for(let i = 0; i < Math.min(urls.length, maxNum); i++) {
      console.log(i)
      request()
    }
  })
}

let urls = []
for (let i = 0; i < 20; i++) {
  urls.push(`url---${i}`)
}
console.log(urls)

concuiRequest(urls, 3).then(res => {
  console.log(res)
})


let control;
async function getList() {
  control?.abort()
  controller = new AbortController()
  try {
    const list = await fetch('url', {
      signal: controller.signal
    })
    console.log(list)
  } catch (error) {
    console.log(error)
  }
}