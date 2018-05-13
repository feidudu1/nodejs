var http = require('http')
var Promise = require('bluebird')
var baseUrl ='http://www.imooc.com/learn/'
var cheerio = require('cheerio')
var videoIds = [348, 259, 197, 134, 75]

function filterChapters(html) {
  var $ = cheerio.load(html)
  var chapters = $('.chapter.course-wrap')
  var title = $('.course-infos .path span').text()
  var number = $($('.static-item.l')[2]).find('.meta').text()
  // var number = Number($($('.static-item.l')[2]).find('.meta-value').text())
  // 期望拿到的数据结构
  // {
  //   title: title,
  //   number: number,
  //   chapterTitle: '',
  //   videos: [{
  //     title: '',
  //     id: ''
  //   }]
  // }
  var courseData = {
    title: title,
    number: number,
    chapter: []
  }
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
    courseData.chapter.push(chapterData)
  })
  return courseData
}

function printCourseInfo(coursesData) {
  coursesData.forEach(function(courseData) {
    console.log(courseData.number + '人学过' + courseData.title + '\n');
    courseData.chapter.forEach(function (item) {
      var chapterTitle = item.chapterTitle
      console.log(chapterTitle + '\n');
      item.videos.forEach(function(item) {
        console.log('【' + item.id + '】' + item.title.trim().split('\n')[0] + '\n');
      })
    })

  })
}

function getPageAsync(url) {
  return new Promise(function (resolve, reject) {
    console.log('正在爬取');
    http.get(url, res => {
      var html = ''
      res.on('data', data=> {
        html += data
      })
      res.on('end', () => {
        resolve(html)
      })
    }).on('error', (e) => {
      reject(e)
      console.log('获取数据出错');
    })
  })
}

var fetchCourseArray = []
videoIds.forEach(function (id) {
  fetchCourseArray.push(getPageAsync(baseUrl + id))
})

Promise
  .all(fetchCourseArray)
  .then(function (pages) {
    var coursesData = []
    pages.forEach(function (html) {
      var courseData = filterChapters(html)
      coursesData.push(courseData)
    })
    coursesData.sort(function (a, b) {
      return a.number < b.number
    })
    printCourseInfo(coursesData)
  })
