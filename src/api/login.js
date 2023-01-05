import request from './request'

// 85568c4d-edcb-418b-94aa-4fa8e68e00b9
export const getLoginKey = () => {
  return request({
    url: '/api/login/qr/key',
    method: 'POST',
    params: {
      timestamp: String(new Date().getTime())
    }
  })
}

export const getLoginQR = (key) => {
  return request({
    url: '/api/login/qr/create',
    method: 'GET',
    params: {
      key,
      qrimg: 1
    }
  })
}

export const getLoginCheck = (key) => {
  return request({
    url: '/api/login/qr/check',
    method: 'POST',
    params: {
      key,
      timestamp: String(new Date().getTime())
    }
  })
}

export const getAccountInfo = (key) => {
  return request({
    url: '/api/user/account',
    method: 'GET'
  })
}

export const getUserDetail = (uid) => {
  return request({
    url: '/api/user/detail',
    method: 'POST',
    params: {
      uid
    }
  })
}
