import request from '@/utils/request'


export function marker(obj) {
  return request({
    url:"/gardens/tree/queryVicinityPrint",
    method: 'get',
    params:obj.params
  })
}

