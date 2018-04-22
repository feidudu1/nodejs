var http = require('https')
var querystring = require('querystring')

var postData = querystring.stringify({
  'content': '我自己写的request',
  'mid': '6687'
})

var options = {
  hostname: 'www.imooc.com',
  port: 443,
  path: '/course/docomment',
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Connection': 'keep-alive',
    'Content-Length': postData.length,  // 其他的headers都是copy的控制台的，但是长度要根据提交文本的长度确定
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'imooc_uuid=1063f717-2f10-4122-9d1a-5b869d637901; imooc_isnew_ct=1507820996; imooc_isnew=2; UM_distinctid=1621ede96e913f-0bdc517f1c3ff9-32637b05-232800-1621ede96eb1c9; loginstate=1; apsid=hlNzU3MDhhMDVjNWM1OTkwNmNkODY5MTk4YjEwNTUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjcyODU4NgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0aWFuYmlhbjVAMTYzLmNvbQAAAAAAAAAAAAAAAAAAADM1ZDA1YzE3NjYyODQ3MjhhYTAzNTIwNTIwYTVlM2M0rB%2FUWmbCO1c%3DYT; PHPSESSID=8gqrlm2r6ih3rov65btat88nk3; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1522840692,1523851017,1524318532,1524658959; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1524709860; cvde=5ae0730e69395-44',
    'Host': 'www.imooc.com',
    'Origin': 'https://www.imooc.com',
    'Referer': 'https://www.imooc.com/video/6687',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

var req = http.request(options, function(res){
  console.log('Status:' + res.statusCode);
  console.log('headers:' + JSON.stringify(res.headers));
  res.on('data', function(chunk){
    console.log(Buffer.isBuffer(chunk));
    console.log(typeof chunk);
  })
  res.on('end', function() {
    console.log('评论完毕');
  })
})
req.on('error', function(e) {
  console.log('Error:' + e.message);
})
req.write(postData)
req.end()
