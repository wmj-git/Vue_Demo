import request from '@/utils/request'


export function queryVicinityPrint(obj) {
  return request({
    url:"/gardens/tree/queryVicinityPrint",
    method: 'get',
    params:obj.params
  })
}

export function findOne(obj) {
  return request({
    url:"/gardens/tree/findOne",
    method: 'get',
    params:obj.params
  })
}

export function queryAllcount(obj) {
  return request({
    url:"/gardens/tree/queryAllcount",
    method: 'get',
    params:obj.params
  })
}
