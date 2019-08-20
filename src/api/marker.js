import request from '@/utils/request'


export function marker(obj) {
  return request({
    url:obj.url,
    method: 'get',
    params:obj.params
  })
}
