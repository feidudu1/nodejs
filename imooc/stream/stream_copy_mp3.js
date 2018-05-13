var fs = require('fs')
var readStream = fs.createReadStream('./eco.mp3')
var writeStream = fs.createWriteStream('./eco_copy.mp3')

readStream.on('data', function (chunk) {
  if (writeStream.write(chunk) === false) {  // 如果在缓存区，先暂停读取
    console.log('still cached');
    readStream.pause()
  }
})

readStream.on('end', function () {
  writeStream.end()
})

writeStream.on('drain', function () {
  console.log('data drains');
  readStream.resume()
})
