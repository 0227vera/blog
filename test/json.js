const keys = [
  [0, "type"],
  [1, "originX"],
  [2, "originY"],
  [3, "left"],
  [4, "top"],
  [5, "width"],
  [6, "height"],
  [7, "fill"],
  [8, "stroke"],
  [9, "strokeWidth"],
  [10, "strokeDashArray"],
  [11, "strokeLineCap"],
  [12, "strokeLineJoin"],
  [13, "strokeMiterLimit"],
  [14, "scaleX"],
  [15, "scaleY"],
  [16, "angle"],
  [17, "flipX"],
  [18, "flipY"],
  [19, "opacity"],
  [20, "shadow"],
  [21, "visible"],
  [22, "clipTo"],
  [23, "backgroundColor"],
  [24, "fillRule"],
  [25, "paintFirst"],
  [26, "globalCompositeOperation"],
  [27, "transformMatrix"],
  [28, "skewX"],
  [29, "skewY"],
  [30, "content"],
  [
    31,
    {
      path: ["path"], // 当为矩形，箭头，铅笔的时候type
      ellipse: ["rx", "ry"], // 椭圆
      line: ["x1", "x2", "y1", "y2"], // 直线
      textbox: [
        "text",
        "fontSize",
        "fontWeight",
        "fontFamily",
        "fontStyle",
        "lineHeight",
        "underline",
        "overline",
        "linethrough",
        "textAlign",
        "textBackgroundColor",
        "charSpacing",
        "minWidth",
        "styles",
      ], // 文字
    },
  ],
];
const transNum = [16, 6, 3, 19, 14, 15, 28, 29, 13, 9, 4, 5];
const map = new Map(keys);
const values = [
  [false, "_0"],
  [true, "_1"],
  ["top", "_t"],
  ["bottom", "_b"],
  ["left", "_l"],
  ["right", "_r"],
  ["center", "_c"],
  [null, "_n"],
  ["path", "_p"],
  ["ellipse", "_e"],
  ["line", "_li"],
  ["textbox", "_te"],
  ["source-over", "_O"],
  ["fill", "_F"],
  ["nonzero", "_E"],
  ["miter", "_M"],
  ["butt", "_B"],
  ["round", "_R"],
  ["STXingkai", "_S"],
  ["normal", "_N"],
];
const valueMap = new Map(values); // 前面的map可以用数组代替的，但是这个地方的valueMap一定要是Map类型的数据结构
const segSymbol = "@";
const segSymbolFirst = "&_$";
// 压缩函数
// object ---> string
function compress(data) {
  // 常规的31种key值，这是每一个类型都会有的基础数据类型
  let arr = [];
  // 提取主题数据并将根据映射关系简写
  data.objects.forEach((item, index) => {
    arr[index] = [];
    for (let [key, value] of map) {
      if (key <= 30) {
        // 常规数据的改变
        arr[index][key] = valueMap.get(item[value]) || item[value];
      } else {
        arr[index][key] = [];
        value[item.type].forEach((vauleKey) => {
          arr[index][key].push(valueMap.get(item[vauleKey]) || item[vauleKey]);
        });
      }
    }
  });

  // 不要让常规数据是数组的形式，可以把[]两个字符的控件，转化为@一个字符，省下空间
  arr.forEach((item, index) => {
    let pop = item.pop();
    if (item[0] === "_p") {
      // 找出所有为path类型的数据，还可以再优化一次
      pop.forEach((item, index) => {
        pop[index] = item.join(segSymbol);
      });
    }
    arr[index] = [item.join(segSymbol)];
    arr[index].push(pop);
  });
  return `${data.version}${segSymbolFirst}${JSON.stringify(arr)}`;
}

// 解压函数
// string ---> object
const deValues = values.map((item) => [item[1], item[0]]);
const deValueMap = new Map(deValues);
function decompression(data) {
  let arr = data.split(segSymbolFirst);
  const version = arr[0];
  const objectsOrigin = JSON.parse(arr[1]);
  const objects = [];
  objectsOrigin.forEach((item, index) => {
    let objItem = {};
    objItem.version = version;
    let base = item[0].split(segSymbol); // 基础数据
    base.forEach((obj, index) => {
      let value = deValueMap.get(obj) === undefined ? obj : deValueMap.get(obj);
      objItem[map.get(index)] = !~transNum.indexOf(index) ? value : +value;
    });
    let special = item[1]; // 每个类型特有的数据
    if (objItem.type === "path") {
      let path = special[0].split(segSymbol).map((item) => {
        return item.split(",").map((num) => (isNaN(+num) ? num : +num));
      });
      objItem.path = path;
    } else if (objItem.type === "ellipse") {
      objItem.rx = +special[0];
      objItem.ry = +special[1];
    } else if (objItem.type === "line") {
      objItem.x1 = +special[0];
      objItem.x2 = +special[1];
      objItem.y1 = +special[2];
      objItem.y2 = +special[3];
    } else if (objItem.type === "textbox") {
      let keys = map.get(31).textbox;
      keys.forEach((item, index) => {
        objItem[item] =
          deValueMap.get(special[index]) === undefined
            ? special[index]
            : deValueMap.get(special[index]);
      });
    }
    objects.push(objItem);
  });

  return { version, objects };
}

let str =
  '2.3.6&_$[["_p@_l@_t@424.99800000000005@350.998@88@49.71@_n@#F56C6C@2@_n@_R@_R@10@1@1@0@_0@_0@1@_n@_1@_n@@_E@_F@_O@_n@0@0@qjg3193在2019-12-12 14:38:15对此处进行修改",["M,425.998,351.998@Q,426,352,429.5,359.5@Q,433,367,437,381@Q,441,395,442,398@Q,443,401,443.5,401.5@Q,444,402,446,397@Q,448,392,450.5,385@Q,453,378,455,373.5@Q,457,369,459,364.5@Q,461,360,462,358@Q,463,356,464.5,358.5@Q,466,361,468,365.5@Q,470,370,472.5,375@Q,475,380,478,384.5@Q,481,389,483,392@Q,485,395,486.5,396.5@Q,488,398,489.5,399@Q,491,400,494.5,400@Q,498,400,501,396@Q,504,392,506,388@Q,508,384,510,378@Q,512,372,512.5,369.5@Q,513,367,513.5,366@Q,514,365,514,364.5@Q,514,364,514,363.5@Q,514,363,514,362@Q,514,361,513.5,359@Q,513,357,513,355.5@Q,513,354,513,353@L,513,351.998"]],["_te@_l@_t@729@152@100@27.12@#409EFF@_n@1@_n@_B@_M@4@1@1@0@_0@_0@1@_n@_1@_n@@_E@_F@_O@_n@0@0@qjg3193在2019-12-12 14:38:15对此处进行修改",["",24,"_N","_S","_N",1.16,"_0","_0","_0","_l","",0,20,{}]],["_te@_l@_t@729@152@100@27.12@#409EFF@_n@1@_n@_B@_M@4@1@1@0@_0@_0@1@_n@_1@_n@@_E@_F@_O@_n@0@0@qjg3193在2019-12-12 14:38:15对此处进行修改",["",24,"_N","_S","_N",1.16,"_0","_0","_0","_l","",0,20,{}]],["_te@_l@_t@729@152@100@27.12@#409EFF@_n@1@_n@_B@_M@4@1@1@0@_0@_0@1@_n@_1@_n@@_E@_F@_O@_n@0@0@qjg3193在2019-12-12 14:38:15对此处进行修改",["",24,"_N","_S","_N",1.16,"_0","_0","_0","_l","",0,20,{}]],["_te@_l@_t@693@431@100@27.12@#409EFF@_n@1@_n@_B@_M@4@1@1@0@_0@_0@1@_n@_1@_n@@_E@_F@_O@_n@0@0@qjg3193在2019-12-12 14:38:15对此处进行修改",["",24,"_N","_S","_N",1.16,"_0","_0","_0","_l","",0,20,{}]],["_te@_l@_t@693@431@100@27.12@#409EFF@_n@1@_n@_B@_M@4@1@1@0@_0@_0@1@_n@_1@_n@@_E@_F@_O@_n@0@0@qjg3193在2019-12-12 14:38:15对此处进行修改",["",24,"_N","_S","_N",1.16,"_0","_0","_0","_l","",0,20,{}]],["_te@_l@_t@693@431@170.52@27.12@#409EFF@_n@1@_n@_B@_M@4@1@1@0@_0@_0@1@_n@_1@_n@@_E@_F@_O@_n@0@0@qjg3193在2019-12-12 14:38:15对此处进行修改",["web端添加的签批",24,"_N","_S","_N",1.16,"_0","_0","_0","_l","",0,20,{}]]]';

console.log("----------->", decompression(str));
