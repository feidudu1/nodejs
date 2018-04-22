var EventEmitter = require('events').EventEmitter
var life = new EventEmitter()
life.setMaxListeners(11)  // 默认支持10个事件，此处扩展到11

function water(who) {
  console.log('给' + who + '倒水');
}
// addEventListener
life.on('求安慰', water)
life.on('求安慰', who => {
  console.log('给' + who + '做饭');
})
life.on('求安慰', who => {
  console.log('给' + who + '..3');
})
life.on('求安慰', who => {
  console.log('给' + who + '..4');
})
life.on('求安慰', who => {
  console.log('给' + who + '..5');
})
life.on('求安慰', who => {
  console.log('给' + who + '..6');
})
life.on('求安慰', who => {
  console.log('给' + who + '..7');
})
life.on('求安慰', who => {
  console.log('给' + who + '..8');
})
life.on('求安慰', who => {
  console.log('给' + who + '..9');
})
life.on('求安慰', who => {
  console.log('给' + who + '..10');
})
life.on('求安慰', who => {
  console.log('给' + who + '..11');
})

life.on('求你爱', who => {
  console.log('给' + who + '..10');
})
life.on('求你爱', who => {
  console.log('给' + who + '..11');
})

// 移除事件
life.removeListener('求安慰', water)
// 批量移除事件
// life.removeAllListeners()
// 移除某一类事件
// life.removeAllListeners('求安慰')

// 查询监听的数量
console.log(life.listeners('求安慰').length);
console.log(EventEmitter.listenerCount(life, '求安慰'));  // life为实例名字，第二个为事件名字

var hasConfortListener = life.emit('求安慰', '汉子')
var hasLovedListener = life.emit('求你爱', '妹子')
var hasOther = life.emit('求哄哄', '妹子')

console.log(hasConfortListener);
console.log(hasLovedListener);
console.log(hasOther);
