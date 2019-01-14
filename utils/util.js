const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//格式为y-m-d
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
// 拓展对象
function extend(target) {
  var sources = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < sources.length; i++) {
    var source = sources[i];
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  extend: extend
}