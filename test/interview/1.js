for (var i = 0;  i < 3; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j)
    }, 0);
  })(i)
}

console.log('-------')

/**
 * add(1)(2)(3)
 */

const add = num => {

  return add
}