import request from '@/utils/request'
import { encrypt } from '@/utils/RSAUtil'
export function loginByUsername(username, password) {
  const obj = JSON.stringify({
    username,
    password
  });
  return new Promise(function(resolve, reject) {
    encrypt(obj).then(text => {
      request({
        url: '/login/authRsa',
        method: 'get',
        params: {
          text
        }
      }).then((res) => resolve(res))
    })
  })
}
export  function loginByToken(data) {
  return request({
    url: '/login/tokenAuth',
    method: 'post',
    data
  })
}
export function getRsa() {
  return request({
    url: '/login/getpbk',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/login/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
export function refreshToken(params) {
  return request({
    url: '/login/refreshAuthorization',
    method: 'get',
    params
  })
}

