export const stringFromArray = (array) => {
  let str = ''
  array.forEach((element, index) => {
    str += element
    if (index < array.length - 1) {
      str += ' / '
    }
  })
  return str
}

export const numberUnit = (num) => {
  if (num > 99999 && num < 10000 * 10000) {
    return `${Math.round(num / 10000)}万`
  }
  if (num >= 10000 * 10000) {
    return `${Math.round(num / 10000 / 10000)}亿`
  }
  return num
}

// 时间戳13位
export const formatDate = (time, needSecond = false) => {
  // 时间戳转日期
  const date = new Date(time)
  const y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? '0' + MM : MM
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let m = date.getMinutes()
  m = m < 10 ? '0' + m : m
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
  // return y + '-' + MM + '-' + d
  return needSecond
    ? y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    : y + '-' + MM + '-' + d
}

export const formatSecToStr = (seconds) => {
  const handleData = Math.round(seconds / 1000)
  const middleData = handleData / 60
  const minuteNum = Math.floor(middleData)
  const secondsNum = Math.floor((middleData - minuteNum) * 60)
  return `${minuteNum < 10 ? `0${minuteNum}` : minuteNum}:${
    secondsNum < 10 ? `0${secondsNum}` : secondsNum
  }`
}

export const formatMusicPlay = (seconds) => {
  const minute = Math.floor(seconds / 60)
  const second = Math.floor(seconds - minute * 60)
  return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
}

// 整理播放列表id
export const formatPlayListId = (array) => {
  let idStr = ''
  array.forEach((element, index) => {
    idStr += element.id
    if (index < array.length - 1) {
      idStr += ','
    }
  })
  return idStr
}
