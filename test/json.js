let data = require('./json.json')
const fs = require('fs')
// export 
// data = { version:'1.0.0', objects=[] } 

const keys = [
  [0, 'type'],
  [1, 'originX'],
  [2, 'originY'],
  [3, 'left'],
  [4, 'top'],
  [5, 'width'],
  [6, 'height'],
  [7, 'fill'],
  [8, 'stroke'],
  [9, 'strokeWidth'],
  [10, 'strokeDashArray'],
  [11, 'strokeLineCap'],
  [12, 'strokeLineJoin'],
  [13, 'strokeMiterLimit'],
  [14, 'scaleX'],
  [15, 'scaleY'],
  [16, 'angle'],
  [17, 'flipX'],
  [18, 'flipY'],
  [19, 'opacity'],
  [20, 'shadow'],
  [21, 'visible'],
  [22, 'clipTo'],
  [23, 'backgroundColor'],
  [24, 'fillRule'],
  [25, 'paintFirst'],
  [26, 'globalCompositeOperation'],
  [27, 'transformMatrix'],
  [28, 'skewX'],
  [29, 'skewY'],
  [30, 'content'],
  [31, {
    path: ['path'], // 当为矩形，箭头，铅笔的时候type
    ellipse: ['rx', 'ry'], // 椭圆
    line: ['x1', 'x2', 'y1', 'y2'], // 直线
    textbox: ['text', 'fontSize', 'fontWeight', 'fontFamily', 'fontStyle', 'lineHeight', 'underline', 'overline', 'linethrough', 'textAlign', 'textBackgroundColor', 'charSpacing', 'minWidth', 'styles'] // 文字
  }]
]
const map = new Map(keys)
const values = [
  [false, '_0'],
  [true, '_1'],
  ['top','_t'],
  ['bottom','_b'],
  ['left','_l'],
  ['right','_r'],
  ['center','_c'],
  [null,'_n'],
  ['path','_p'],
  ['ellipse', '_e'],
  ['line', '_li'],
  ['textbox', '_te'],
  ['source-over','_O'],
  ['fill','_F'],
  ['nonzero','_E'],
  ['miter','_M'],
  ['butt','_B'],
  ['round','_R'],
  ['STXingkai','_S'],
  ['normal','_N'],

]
const valueMap = new Map(values) // 前面的map可以用数组代替的，但是这个地方的valueMap一定要是Map类型的数据结构
const seg_symbol = '@'
const seg_symbol_first = '&_$'
// 压缩函数
function compress(data) {
  // 常规的31种key值，这是每一个类型都会有的基础数据类型
  let result = data.version
  let arr = []
  // 提取主题数据并将根据映射关系简写
  data.objects.forEach((item,index) => {
    arr[index] = []
    for (let [key,value] of map) {
      if (key <= 30) { // 常规数据的改变
        arr[index][key] = valueMap.get(item[value]) || item[value]
      } else {
        arr[index][key] = []
        value[item.type].forEach(vaule_key => {
          arr[index][key].push(valueMap.get(item[vaule_key]) || item[vaule_key])
        })
      }
    }
  })
  
  // 不要让常规数据是数组的形式，可以把[]两个字符的控件，转化为@一个字符，省下空间
  arr.forEach((item,index) => {
      let pop = item.pop()
      if (item[0] === '_p') { // 找出所有为path类型的数据，还可以再优化一次
        pop.forEach((item,index) => {
          pop[index] = item.join(seg_symbol)
        })
      }
      arr[index] = [item.join(seg_symbol)]
      arr[index].push(pop)
  })
  return `${data.version}${seg_symbol_first}${JSON.stringify(arr)}`
}

let compress_data = compress(data)
// 解压函数
const de_values = values.map(item => [item[1],item[0]])
const deValueMap = new Map(de_values)
// export 
function decompression (data) {
  let arr = data.split(seg_symbol_first)
  const version = arr[0]
  const objects_origin = JSON.parse(arr[1])
  const objects = []
  objects_origin.forEach(item => {
    let obj_item = {}
    obj_item.version = version
    let base = item[0].split(seg_symbol) // 基础数据
    base.forEach((obj,index) => {
      obj_item[map.get(index)] = deValueMap.get(obj) || obj
    })
    let special = item[1] // 每个类型特有的数据
    if (obj_item.type === 'path') {
      let path = special[0].split(seg_symbol).map(item => item.split(','))
      objects.path = path
    } else if (obj_item.type === 'ellipse') {
      obj_item.rx = special[0]
      obj_item.ry = special[1]
    } else  if (obj_item.type === 'line') {
      obj_item.x1 = special[0]
      obj_item.x2 = special[1]
      obj_item.y1 = special[2]
      obj_item.y2 = special[3]
    } else if (obj_item.type === 'textbox') {
      let keys = map.get(31).textbox
      keys.forEach((item,index) => {
        obj_item[item] = deValueMap.get(special[index]) || special[index]
      })
    }
    objects.push(obj_item)
  })

  return {version,objects}
}
