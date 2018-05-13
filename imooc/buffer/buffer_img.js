var fs = require('fs')
// readFile的第一个参数为路径名，如果执行node的文件是imooc，则会读取错误，导致Buffer.isBuffer(origin_buffer)为false
fs.readFile('./logo.png', function (err, origin_buffer) {
  console.log(Buffer.isBuffer(origin_buffer));
  fs.writeFile('./logo_buffer.png', origin_buffer, function (err) {
    if (err) {
      console.log(err);
    }
  })
  // var base64Image = new Buffer(origin_buffer).toString('base64')
  var base64Image = origin_buffer.toString('base64')
  console.log(base64Image);  // 这个是base64编码的
  var decodeImage = Buffer.from(base64Image, 'base64')  // 这个被还原成图片格式了
  console.log(Buffer.compare(origin_buffer, decodeImage));
  fs.writeFile('./logo_decoded.png', decodeImage, function (err) {
    if (err) {
      console.log(err);
    }
  })
})
