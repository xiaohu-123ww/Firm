// 图片处理
export function disposeImg (img) {
  if (img !== undefined) {
    img = String(img)
    if (img.substr(0, 1) === '/') {
      img = img.substr(1)
    }
    return 'http://1.13.8.165/' + img
  }
}
export function parseTime (time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date

  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
export function changeDateToStr1 (date) {
  // var y = date.getFullYear()
  // var m = date.getMonth() + 1
  // m = m < 10 ? ('0' + m) : m
  // var d = date.getDate()
  // d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  var second = date.getSeconds()
  second = second < 10 ? ('0' + second) : second
  return h + ':' + minute + ':' + second
}
