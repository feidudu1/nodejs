var http = require('http')
var url = 'http://www.imooc.com/learn/348'
var cheerio = require('cheerio')

function filterChapters(html) {
  var $ = cheerio.load(html)
  var chapters = $('.chapter.course-wrap')
  // 期望拿到的数据结构
  // [{
  //   chapterTitle: '',
  //   videos: [
  //     title: '',
  //     id: ''
  //   ]
  // }]
  var courseData = []
  chapters.each(function(item){
    var chapter = $(this)
    var chapterTitle = chapter.find('h3').text().trim()
    var videos = chapter.find('.video').children('li')
    var chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    }
    videos.each(function(item) {
      var video = $(this).find('.J-media-item')
      var videoTitle = video.text()
      var id = video.attr('href').split('video/')[1]
      chapterData.videos.push({
        title: videoTitle,
        id: id
      })
    })
    courseData.push(chapterData)
  })
  return courseData
}

function printCourseInfo(courseData) {
  courseData.forEach(function(item) {
    var chapterTitle = item.chapterTitle
    console.log(chapterTitle + '\n');
    item.videos.forEach(function(item) {
      console.log('【' + item.id + '】' + item.title.trim().split('\n')[0] + '\n');
    })
  })
}

http.get(url, res => {
  var html = ''
  res.on('data', data=> {
    html += data
  })
  res.on('end', () => {
    var courseData = filterChapters(html)
    printCourseInfo(courseData)
  })
}).on('error', () => {
  console.log('获取数据出错');
})
