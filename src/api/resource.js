import request from '@/utils/request'

export function findByThisUser() {
  return request({
    url: "/user/resource/findByThisUser",
    method: 'get'
  })
}

export function findMenuByThisUser(obj) {
  return request({
    url: "/user/resource/findMenuByThisUser",
    method: 'get',
    params: obj
  })
}

export function addResource(_data) {
  return request({
    url: "/user/resource/addResource",
    method: 'post',
    data: _data
  })
}

export function delResource(_data) {
  return request({
    url: "/user/resource/del",
    method: 'DELETE',
    data: _data
  })
}


export function updateResource(_data) {
  return request({
    url: "/user/resource/updateResource",
    method: 'post',
    data: _data
  })
}

export function queryResource(obj) {
  return request({
    url: "/user/role/queryResource",
    method: 'get',
    params: obj
  })
}


export function setRoleResource(_data) {
  return request({
    url: "/user/role/setRoleResource",
    method: 'post',
    data: _data
  })
}
