
// let str = '"8f2dd4ab9f0f4b89a1be68d2f2622b7b,aaf64e6d738b43aaa0ccd941afe9ec21,","",leadAudit,user_task001,"aaf64e6d738b43aaa0ccd941afe9ec21,"'
// let p = str.replace(/"(.*?)"/g, match => {
//   console.log('match---->', match)
//   if(match){
//     return match.replace(/,/g,';')
//   }
// })
// console.log('--=-=-=-=-=>>>', p)
// let arr = p.split(',')
// console.log('========>', arr)

let sa = {
  name:'xuanliao',
  age:25,
  say: function () {
    console.log(`我叫${this.name},我今年${this.age}`)
  }
}

let salvatore = Object.create(sa)
salvatore.age = 23
salvatore.say()