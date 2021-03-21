const GetAllSum = arr => arr.reduce((sum,item) => sum + +item.value, 0)
const GetTimeSum = (arr, time) => arr.filter(item => +item.dim === time).reduce((sum,item) => sum + +item.value, 0)


// 近一个月2.5-3.5的
const after = [
    {
        "dim":"1",
        "dimZh":"2s",
        "value":"9521"
    },
    {
        "dim":"2",
        "dimZh":"3s",
        "value":"8941"
    },
    {
        "dim":"10",
        "dimZh":"10+s",
        "value":"6882"
    },
    {
        "dim":"3",
        "dimZh":"4s",
        "value":"5023"
    },
    {
        "dim":"4",
        "dimZh":"5s",
        "value":"3006"
    },
    {
        "dim":"6",
        "dimZh":"7s",
        "value":"2362"
    },
    {
        "dim":"7",
        "dimZh":"8s",
        "value":"2039"
    },
    {
        "dim":"5",
        "dimZh":"6s",
        "value":"1986"
    },
    {
        "dim":"0",
        "dimZh":"1s",
        "value":"1655"
    },
    {
        "dim":"8",
        "dimZh":"9s",
        "value":"1289"
    },
    {
        "dim":"9",
        "dimZh":"10s",
        "value":"1009"
    }
]
// 相同时间段数据
const before = [
    {
        "dim":"2",
        "dimZh":"3s",
        "value":"55669"
    },
    {
        "dim":"1",
        "dimZh":"2s",
        "value":"51987"
    },
    {
        "dim":"3",
        "dimZh":"4s",
        "value":"26868"
    },
    {
        "dim":"10",
        "dimZh":"10+s",
        "value":"17231"
    },
    {
        "dim":"4",
        "dimZh":"5s",
        "value":"14128"
    },
    {
        "dim":"6",
        "dimZh":"7s",
        "value":"8746"
    },
    {
        "dim":"5",
        "dimZh":"6s",
        "value":"8239"
    },
    {
        "dim":"7",
        "dimZh":"8s",
        "value":"7373"
    },
    {
        "dim":"0",
        "dimZh":"1s",
        "value":"4828"
    },
    {
        "dim":"8",
        "dimZh":"9s",
        "value":"4333"
    },
    {
        "dim":"9",
        "dimZh":"10s",
        "value":"3006"
    }
]

// 工程精简前后一个月数据对比

console.log('总流失人数比较--------> 前比后：', GetAllSum(before), ':', GetAllSum(after))

// 工程精简ns内流失人员比例

console.log(`0-1s以内的人数前后比例-------> ${GetTimeSum(before, 1) / GetTimeSum(after, 1)}，差值`, GetTimeSum(before, 1) - GetTimeSum(after, 1))
console.log(`1-2s以内的人数前后比例-------> ${GetTimeSum(before, 2) / GetTimeSum(after, 2)}，差值`, GetTimeSum(before, 2) - GetTimeSum(after, 2))
console.log(`2-3s以内的人数前后比例-------> ${GetTimeSum(before, 3) / GetTimeSum(after, 3)}，差值`, GetTimeSum(before, 3) - GetTimeSum(after, 3))
console.log(`3-4s以内的人数前后比例-------> ${GetTimeSum(before, 4) / GetTimeSum(after, 4)}，差值`, GetTimeSum(before, 4) - GetTimeSum(after, 4))
console.log(`4-5s以内的人数前后比例-------> ${GetTimeSum(before, 5) / GetTimeSum(after, 5)}，差值`, GetTimeSum(before, 5) - GetTimeSum(after, 5))
console.log(`5-6s以内的人数前后比例-------> ${GetTimeSum(before, 6) / GetTimeSum(after, 6)}，差值`, GetTimeSum(before, 6) - GetTimeSum(after, 6))
console.log(`6-7s以内的人数前后比例-------> ${GetTimeSum(before, 7) / GetTimeSum(after, 7)}，差值`, GetTimeSum(before, 7) - GetTimeSum(after, 7))
console.log(`7-8s以内的人数前后比例-------> ${GetTimeSum(before, 8) / GetTimeSum(after, 8)}，差值`, GetTimeSum(before, 8) - GetTimeSum(after, 8))
console.log(`8-9s以内的人数前后比例-------> ${GetTimeSum(before, 9) / GetTimeSum(after, 9)}，差值`, GetTimeSum(before, 9) - GetTimeSum(after, 9))

// console结果
// 总流失人数比较--------> 前比后： 202408 : 43713
// 0-1s以内的人数前后比例-------> 5.460245772502889，差值 42466
// 1-2s以内的人数前后比例-------> 6.226261044625881，差值 46728
// 2-3s以内的人数前后比例-------> 5.348994624726259，差值 21845
// 3-4s以内的人数前后比例-------> 4.699933466400532，差值 11122
// 4-5s以内的人数前后比例-------> 4.148539778449144，差值 6253
// 5-6s以内的人数前后比例-------> 3.7027942421676547，差值 6384
// 6-7s以内的人数前后比例-------> 3.6159882295242767，差值 5334
// 7-8s以内的人数前后比例-------> 3.3615205585725367，差值 3044
// 8-9s以内的人数前后比例-------> 2.979187314172448，差值 1997