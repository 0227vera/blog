/**
 * 需求：打印3以下的数字3，之后就循环终止
 * 除了for循环，我能想到有如下三种
 */

let arr = [1, 2, 3, 4, 5, 6, 7];
// 1. forEach + try catch
try {
  arr.forEach((item) => {
    if (item > 3) throw "循环终止";
    else console.log(item);
  });
} catch (error) {
  console.log(error);
}
// 2. 利用every return false就终止的特性
arr.every((item) => {
  if (item > 3) {
    console.log("循环终止");
    return false;
  } else {
    console.log(item);
    return true;
  }
});
// 3. 利用some return true就终止的特性
arr.some((item) => {
  if (item > 3) {
    console.log("循环终止");
    return true;
  } else {
    console.log(item);
    return false;
  }
});
