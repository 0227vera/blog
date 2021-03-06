// 求平均值
const GetAverage = arr => arr.reduce((sum,item) => sum += +item.value, 0) / arr.length
// 求最大值
const GetMax = arr => arr.reduce((max,item) => max > item.value ? max : item.value, 0)
/**
 * 获取有效的数据
 * @param {*} arr 
 * 第一个filter是因为工程精简是20210205上线，不使用等号是因为排除上线当天的影响
 * 第二个filter是排除各种原因微信没有搜集到数据的原因
 * 第三个filter使用需要排除1s以内的情况，因为1s以内我们认为是没有下载包的只看加载的情况，
 * 这个使用的数据更多取决于手机的好坏而不是包大小的影响
 */
// 以21年2月5号（这个是扫码付上线的时间）为一个节点
const Node = "20210205"
const Limit = 2000
const GetBeforeValidData = arr => arr.filter(item => item.refdate < Node).filter(item => +item.value).filter(item => item.value >= Limit)
const GetAfterValidData = arr => arr.filter(item => item.refdate > Node).filter(item => +item.value).filter(item => item.value >= Limit)

// 从20年12月1号到21年3月1号的数据
// homePage所有的数据
// 数据来源：https://mp.weixin.qq.com/wxamp/cgi/performance/mp/getLaunchData?token=1201611447&lang=zh_CN&moduleId=10017&begin=1609776&end=1614607242&params=%7B%22networktype%22:%22-1%22,%22device_level%22:%22-1%22,%22scene%22:8,%22device%22:%22-1%22,%22isdownloadcode%22:%22-1%22%7D&random=0.6737723138023206
const homePageData = [
    {
        "refdate":"20201201",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201202",
        "value":"1104.0000",
        "ratio":""
    },
    {
        "refdate":"20201203",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201204",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201205",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201206",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201207",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201208",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201209",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201210",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201211",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201212",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201213",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201214",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201215",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201216",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201217",
        "value":"1318.0000",
        "ratio":""
    },
    {
        "refdate":"20201218",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201219",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201220",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201221",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201222",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201223",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201224",
        "value":"717.7500",
        "ratio":""
    },
    {
        "refdate":"20201225",
        "value":"5367.0000",
        "ratio":""
    },
    {
        "refdate":"20201226",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201227",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201228",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201229",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201230",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201231",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210101",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210102",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210103",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210104",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210105",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210106",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210107",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210108",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210109",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210110",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210111",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210112",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210113",
        "value":"2607.0000",
        "ratio":""
    },
    {
        "refdate":"20210114",
        "value":"7796.0000",
        "ratio":""
    },
    {
        "refdate":"20210115",
        "value":"642.0000",
        "ratio":""
    },
    {
        "refdate":"20210116",
        "value":"2991.0000",
        "ratio":""
    },
    {
        "refdate":"20210117",
        "value":"1140.0000",
        "ratio":""
    },
    {
        "refdate":"20210118",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210119",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210120",
        "value":"2376.0000",
        "ratio":""
    },
    {
        "refdate":"20210121",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210122",
        "value":"1460.0000",
        "ratio":""
    },
    {
        "refdate":"20210123",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210124",
        "value":"1982.6667",
        "ratio":""
    },
    {
        "refdate":"20210125",
        "value":"1568.0000",
        "ratio":""
    },
    {
        "refdate":"20210126",
        "value":"1852.5000",
        "ratio":""
    },
    {
        "refdate":"20210127",
        "value":"1524.0000",
        "ratio":""
    },
    {
        "refdate":"20210128",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210129",
        "value":"1560.5000",
        "ratio":""
    },
    {
        "refdate":"20210130",
        "value":"616.0000",
        "ratio":""
    },
    {
        "refdate":"20210131",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210201",
        "value":"1012.0000",
        "ratio":""
    },
    {
        "refdate":"20210202",
        "value":"1690.0000",
        "ratio":""
    },
    {
        "refdate":"20210203",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210204",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20210205",
        "value":"1194.0000",
        "ratio":""
    },
    {
        "refdate":"20210206",
        "value":"1490.8333",
        "ratio":""
    },
    {
        "refdate":"20210207",
        "value":"2279.3333",
        "ratio":""
    },
    {
        "refdate":"20210208",
        "value":"5026.1667",
        "ratio":""
    },
    {
        "refdate":"20210209",
        "value":"1937.2000",
        "ratio":""
    },
    {
        "refdate":"20210210",
        "value":"1681.8750",
        "ratio":""
    },
    {
        "refdate":"20210211",
        "value":"4469.7500",
        "ratio":""
    },
    {
        "refdate":"20210212",
        "value":"1219.0000",
        "ratio":""
    },
    {
        "refdate":"20210213",
        "value":"2669.4000",
        "ratio":""
    },
    {
        "refdate":"20210214",
        "value":"2546.1111",
        "ratio":""
    },
    {
        "refdate":"20210215",
        "value":"3998.6000",
        "ratio":""
    },
    {
        "refdate":"20210216",
        "value":"2359.0000",
        "ratio":""
    },
    {
        "refdate":"20210217",
        "value":"3292.3000",
        "ratio":""
    },
    {
        "refdate":"20210218",
        "value":"1853.1250",
        "ratio":""
    },
    {
        "refdate":"20210219",
        "value":"2098.2000",
        "ratio":""
    },
    {
        "refdate":"20210220",
        "value":"2097.0000",
        "ratio":""
    },
    {
        "refdate":"20210221",
        "value":"1425.5000",
        "ratio":""
    },
    {
        "refdate":"20210222",
        "value":"1184.0000",
        "ratio":""
    },
    {
        "refdate":"20210223",
        "value":"1736.8000",
        "ratio":""
    },
    {
        "refdate":"20210224",
        "value":"1344.7500",
        "ratio":""
    },
    {
        "refdate":"20210225",
        "value":"2394.4444",
        "ratio":""
    },
    {
        "refdate":"20210226",
        "value":"1808.4000",
        "ratio":""
    },
    {
        "refdate":"20210227",
        "value":"2702.8000",
        "ratio":""
    },
    {
        "refdate":"20210228",
        "value":"1730.4000",
        "ratio":""
    },
    {
        "refdate":"20210301",
        "value":"2773.3000",
        "ratio":""
    }
]

// 扫码付所有的数据
// 数据来源：https://mp.weixin.qq.com/wxamp/cgi/performance/mp/getLaunchData?token=1201611447&lang=zh_CN&moduleId=10017&begin=1609776&end=1614607242&params=%7B%22networktype%22:%22-1%22,%22device_level%22:%22-1%22,%22scene%22:4,%22device%22:%22-1%22,%22isdownloadcode%22:%22-1%22%7D&random=0.2099359449937217
const scanCodePayData = [
    {
        "refdate":"20201201",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201202",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201203",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201204",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201205",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201206",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201207",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201208",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201209",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201210",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201211",
        "value":"1408.4000",
        "ratio":""
    },
    {
        "refdate":"20201212",
        "value":"1586.7000",
        "ratio":""
    },
    {
        "refdate":"20201213",
        "value":"1742.0000",
        "ratio":""
    },
    {
        "refdate":"20201214",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201215",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201216",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201217",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201218",
        "value":"1040.0000",
        "ratio":""
    },
    {
        "refdate":"20201219",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201220",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201221",
        "value":"1987.3333",
        "ratio":""
    },
    {
        "refdate":"20201222",
        "value":"406.0000",
        "ratio":""
    },
    {
        "refdate":"20201223",
        "value":"2385.0000",
        "ratio":""
    },
    {
        "refdate":"20201224",
        "value":"1534.5000",
        "ratio":""
    },
    {
        "refdate":"20201225",
        "value":"1879.2500",
        "ratio":""
    },
    {
        "refdate":"20201226",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201227",
        "value":"0",
        "ratio":""
    },
    {
        "refdate":"20201228",
        "value":"1518.3333",
        "ratio":""
    },
    {
        "refdate":"20201229",
        "value":"2459.8571",
        "ratio":""
    },
    {
        "refdate":"20201230",
        "value":"1299.1250",
        "ratio":""
    },
    {
        "refdate":"20201231",
        "value":"2736.3684",
        "ratio":""
    },
    {
        "refdate":"20210101",
        "value":"2834.7857",
        "ratio":""
    },
    {
        "refdate":"20210102",
        "value":"3383.5000",
        "ratio":""
    },
    {
        "refdate":"20210103",
        "value":"2248.6667",
        "ratio":""
    },
    {
        "refdate":"20210104",
        "value":"1386.9500",
        "ratio":""
    },
    {
        "refdate":"20210105",
        "value":"2410.2500",
        "ratio":""
    },
    {
        "refdate":"20210106",
        "value":"3311.9333",
        "ratio":""
    },
    {
        "refdate":"20210107",
        "value":"3184.3636",
        "ratio":""
    },
    {
        "refdate":"20210108",
        "value":"2602.6667",
        "ratio":""
    },
    {
        "refdate":"20210109",
        "value":"3326.4667",
        "ratio":""
    },
    {
        "refdate":"20210110",
        "value":"2972.1250",
        "ratio":""
    },
    {
        "refdate":"20210111",
        "value":"2618.2459",
        "ratio":""
    },
    {
        "refdate":"20210112",
        "value":"2910.0204",
        "ratio":""
    },
    {
        "refdate":"20210113",
        "value":"3343.3971",
        "ratio":""
    },
    {
        "refdate":"20210114",
        "value":"3054.6067",
        "ratio":""
    },
    {
        "refdate":"20210115",
        "value":"2789.2895",
        "ratio":""
    },
    {
        "refdate":"20210116",
        "value":"2828.7571",
        "ratio":""
    },
    {
        "refdate":"20210117",
        "value":"3299.8143",
        "ratio":""
    },
    {
        "refdate":"20210118",
        "value":"2546.2872",
        "ratio":""
    },
    {
        "refdate":"20210119",
        "value":"2857.2069",
        "ratio":""
    },
    {
        "refdate":"20210120",
        "value":"2955.6206",
        "ratio":""
    },
    {
        "refdate":"20210121",
        "value":"2945.5690",
        "ratio":""
    },
    {
        "refdate":"20210122",
        "value":"2920.9648",
        "ratio":""
    },
    {
        "refdate":"20210123",
        "value":"2942.5954",
        "ratio":""
    },
    {
        "refdate":"20210124",
        "value":"2925.6993",
        "ratio":""
    },
    {
        "refdate":"20210125",
        "value":"2947.9474",
        "ratio":""
    },
    {
        "refdate":"20210126",
        "value":"2899.7005",
        "ratio":""
    },
    {
        "refdate":"20210127",
        "value":"2855.9823",
        "ratio":""
    },
    {
        "refdate":"20210128",
        "value":"2913.1213",
        "ratio":""
    },
    {
        "refdate":"20210129",
        "value":"2868.3683",
        "ratio":""
    },
    {
        "refdate":"20210130",
        "value":"2847.2115",
        "ratio":""
    },
    {
        "refdate":"20210131",
        "value":"2867.1041",
        "ratio":""
    },
    {
        "refdate":"20210201",
        "value":"2818.7718",
        "ratio":""
    },
    {
        "refdate":"20210202",
        "value":"2895.4959",
        "ratio":""
    },
    {
        "refdate":"20210203",
        "value":"2796.8173",
        "ratio":""
    },
    {
        "refdate":"20210204",
        "value":"2746.5849",
        "ratio":""
    },
    {
        "refdate":"20210205",
        "value":"2701.6875",
        "ratio":""
    },
    {
        "refdate":"20210206",
        "value":"2638.0072",
        "ratio":""
    },
    {
        "refdate":"20210207",
        "value":"2748.5019",
        "ratio":""
    },
    {
        "refdate":"20210208",
        "value":"2656.4202",
        "ratio":""
    },
    {
        "refdate":"20210209",
        "value":"2575.9414",
        "ratio":""
    },
    {
        "refdate":"20210210",
        "value":"2567.9334",
        "ratio":""
    },
    {
        "refdate":"20210211",
        "value":"2683.5387",
        "ratio":""
    },
    {
        "refdate":"20210212",
        "value":"2654.1324",
        "ratio":""
    },
    {
        "refdate":"20210213",
        "value":"2654.1121",
        "ratio":""
    },
    {
        "refdate":"20210214",
        "value":"2616.0368",
        "ratio":""
    },
    {
        "refdate":"20210215",
        "value":"2590.5515",
        "ratio":""
    },
    {
        "refdate":"20210216",
        "value":"2563.9640",
        "ratio":""
    },
    {
        "refdate":"20210217",
        "value":"2566.8942",
        "ratio":""
    },
    {
        "refdate":"20210218",
        "value":"2576.9893",
        "ratio":""
    },
    {
        "refdate":"20210219",
        "value":"2571.8438",
        "ratio":""
    },
    {
        "refdate":"20210220",
        "value":"2595.6892",
        "ratio":""
    },
    {
        "refdate":"20210221",
        "value":"2582.7972",
        "ratio":""
    },
    {
        "refdate":"20210222",
        "value":"2600.6062",
        "ratio":""
    },
    {
        "refdate":"20210223",
        "value":"2604.4107",
        "ratio":""
    },
    {
        "refdate":"20210224",
        "value":"2579.9325",
        "ratio":""
    },
    {
        "refdate":"20210225",
        "value":"2576.3777",
        "ratio":""
    },
    {
        "refdate":"20210226",
        "value":"2621.1009",
        "ratio":""
    },
    {
        "refdate":"20210227",
        "value":"2621.8896",
        "ratio":""
    },
    {
        "refdate":"20210228",
        "value":"2656.4404",
        "ratio":""
    },
    {
        "refdate":"20210301",
        "value":"2640.7352",
        "ratio":""
    }
]

console.log('------------homePage的数据------------')
const homePageDataBefore = GetBeforeValidData(homePageData)
console.log("优化前的最大值=====>", GetMax(homePageDataBefore))
console.log("优化前的平均值=====>", GetAverage(homePageDataBefore))

const homePageDataAfter = GetAfterValidData(homePageData)
console.log("优化后的最大值=====>", GetMax(homePageDataAfter))
console.log("优化后的平均值=====>", GetAverage(homePageDataAfter))

console.log('------------扫码付的数据------------')
// 获取扫码付款数据最准确应该是20210120上线之后
const scanCodePayDataBefore = GetBeforeValidData(scanCodePayData).filter(item => item.refdate > 20210120)
console.log("优化前的最大值=====>", GetMax(scanCodePayDataBefore))
console.log("优化前的平均值=====>", GetAverage(scanCodePayDataBefore))

const scanCodePayDataAfter = GetAfterValidData(scanCodePayData)
console.log("优化后的最大值=====>", GetMax(scanCodePayDataAfter))
console.log("优化后的平均值=====>", GetAverage(scanCodePayDataAfter))


// 打印结果如下：
// ------------homePage的数据------------
// 优化前的最大值=====> 7796.0000
// 优化前的平均值=====> 4227.4
// 优化后的最大值=====> 5026.1667
// 优化后的平均值=====> 2977.4158076923077
// ------------扫码付的数据------------
// 优化前的最大值=====> 2947.9474
// 优化前的平均值=====> 2879.4622533333336
// 优化后的最大值=====> 2748.5019
// 优化后的平均值=====> 2614.3686041666665

