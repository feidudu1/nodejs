var http = require('http')
var fs = require('fs')

var request = require('request')  // 该模块需要安装

http
  .createServer(function (req, res) {
    // 一类代码／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／
    //
    // fs.readFile('../buffer/logo.png', function (err, data) {
    //   if (err) {
    //     res.end('file not exist!')
    //   } else {
    //     res.writeHead(200, {'Context-Type': 'text/html'})
    //     res.end(data)
    //   }
    // })
    // 一类代码／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／

    // 一类代码／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／
    //
    // fs.createReadStream('../buffer/logo.png').pipe(res) // 以上注释用这一行代码代替
    // 一类代码／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／

    // 一类代码／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／
    //
    request('http://static.mukewang.com/static/img/common/logo.png')  // 实现边下载边pipe
      .pipe(res)
    // 一类代码／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／／

  })
  .listen(8090)
