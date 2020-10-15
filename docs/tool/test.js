// const strAdd = (str = 'asdferw')  => {
// 	let arr = str.split('').reverse()
//     arr = arr.map((item,index) => index % 3 === 0 ? item +  '|' : item )
//     const restr = arr.reverse().join('')
//     return restr.slice(0,-1)
// }
// const re = strAdd('asdlfhuasdfjalh')
// console.log('----->', re)


var x = 4
var a = {
    x: 5,
    b: {
        x: 6,
        c () {
            console.log(this.x)
            return this.x
        }
    }
}

var test = a.b.c
console.log('------->', test())
console.log('------->', a.b.c())