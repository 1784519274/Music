import request from './request'

// 获取歌手详情
export const getArtistDetail = (id) => {
  return request({
    url: '/api/artist/detail',
    method: 'POST',
    params: {
      id
    }
  })
}
