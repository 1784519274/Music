import request from './request'

export const banner = () => {
  return request({
    url: '/api/banner',
    method: 'GET'
  })
}

export const recommend = (limit = 8) => {
  return request({
    url: '/api/personalized',
    method: 'POST',
    params: {
      limit,
      timestamp: new Date().getTime()
    }
  })
}

export const getLevelInfo = () => {
  return request({
    url: '/api/vip/growthpoint',
    method: 'GET'
  })
}
