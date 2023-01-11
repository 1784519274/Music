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
  return `${minute < 10 ? `0${minute}` : minute}:${
    second < 10 ? `0${second}` : second
  }`
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

// 处理歌词
export const formatLyric = (lyricStr) => {
  const newArray = []
  const allArray = lyricStr.split('\n')
  try {
    allArray.forEach((item) => {
      if (item !== '') {
        const regexpRes = item.match(/\[(\S*)\]/)
        if (!regexpRes) {
          throw new Error('暂无歌词')
        }
        const key = handleLyricTime(regexpRes[1])
        const value = item.replace(regexpRes[0], '')
        newArray.push({
          key,
          value
        })
      }
    })
  } catch {
    newArray.push({
      key: 0,
      value: '歌词无时间关键词'
    })
  }
  return newArray
}

function handleLyricTime (timeStr) {
  const everyTime = timeStr.split(/[:.]/)
  if (everyTime.length < 3) {
    console.log('歌词时间格式不对')
    return
  }
  const secondNum =
    Number(everyTime[0]) * 60 +
    Number(everyTime[1]) +
    Number(everyTime[2] / 1000)
  return secondNum
}

export const getLyricIndex = (array, time) => {
  let index = 0
  for (const item of array) {
    if (time >= Number(item.key)) {
      index++
    } else {
      break
    }
  }
  return index
}

// 计算歌词应该滚动总高度
export const computedScrollTop = (array, index) => {
  let flag = 0
  let top = 0
  for (const item of array) {
    top += item.offsetHeight
    if (++flag >= index) {
      break
    }
  }
  return top
}
