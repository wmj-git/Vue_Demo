import request from '@/utils/request'


export function queryVicinityPrint(obj) {
  return request({
    url:"/tree/queryVicinityPrint",
    method: 'get',
    params:obj.params
  })
}

export function findOne(obj) {
  return request({
    url:"/tree/findOne",
    method: 'get',
    params:obj.params
  })
}
