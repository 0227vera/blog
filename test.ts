/**
 * add(1)(2)(3)
 */

// let add = (n:number) => (m:number) => (k:number) => n + m + k
// const s = add(1)(2)(3)

// console.log(s)


interface Art{
    title: string
    count: string
    content: string
    time: number
    author: string
}

type optionFunc<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>


type artOption = optionFunc<Art, 'count' | 'author'>

const cloneObj = (obj:any) => {
    if (obj === null) return null
    if (typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    let clone = {}
    Object.keys(obj).forEach(item => {
        Object.assign(clone, {
            [item]: cloneObj(obj[item])
        })
    })
    return clone
}

let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
      x: 10
    },
    d: new Date(),
    f: undefined,
    g: /\s+/g,
    fn: function () { },
    symbol: Symbol.for('Symbol')
  }

console.log('======>', cloneObj(obj))

type AttrsFunc<T> = {
    [key in T extends keyof String]: string
}

type Attrs = AttrsFunc<Array<'a' | 'b'>>

let attr: Attrs = {}

