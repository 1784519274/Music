import request from './request'

export const getHighquality = () => {
  return request({
    url: '/api/top/playlist/highquality',
    method: 'GET'
  })
}

// 获取热门歌单
export const getPlaylistHot = () => {
  return request({
    url: '/api/playlist/hot',
    method: 'GET'
  })
}

// 获取所有歌单列表
export const getPlaylistCatlist = () => {
  return request({
    url: '/api/playlist/catlist',
    method: 'GET'
  })
}

// 获取歌单
export const getPlaylist = (cat = '全部', pageNum = 1, limit = 48) => {
  return request({
    url: '/api/top/playlist',
    method: 'POST',
    params: {
      cat,
      limit,
      offset: (pageNum - 1) * limit
    }
  })
}

// 获取歌单详细信息
export const getPlayDetail = (id) => {
  return request({
    url: '/api/playlist/detail',
    method: 'POST',
    params: {
      id,
      s: 1000
    }
  })
}

// 获取歌单所有歌曲
export const getPlaylistSongsAll = (id) => {
  return request({
    url: '/api/playlist/track/all',
    method: 'POST',
    params: {
      id
    }
  })
}

// 获取音乐url
export const getSongUrl = (id) => {
  return request({
    url: '/api/song/url/v1',
    method: 'POST',
    params: {
      id,
      level: 'standard'
    }
  })
}

// 获取歌曲详情
export const getSongDetail = (ids) => {
  return request({
    url: '/api/song/detail',
    method: 'POST',
    params: {
      ids
    }
  })
}

// 获取歌单评论
export const getCommentPlaylist = (id, pageNum = 1, limit = 50) => {
  return request({
    url: '/api/comment/playlist',
    method: 'POST',
    params: {
      id,
      limit,
      offset: (pageNum - 1) * limit
    }
  })
}
// 获取歌曲收藏者
export const getPlaylistSubscribers = (id, pageNum = 1, limit = 99) => {
  return request({
    url: '/api/playlist/subscribers',
    method: 'POST',
    params: {
      id,
      limit,
      offset: (pageNum - 1) * limit
    }
  })
}
