// var i = 0
// while (true) {
//   i ++
// }

var c = 0
function printit(c) {
  console.log(c);
}
function plus(callback) {
  setTimeout(function () {
    c += 1
    callback(c)
  }, 1000)
}

plus(printit)
