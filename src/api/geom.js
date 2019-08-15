import request from '@/utils/request'


export function geom(obj) {
  return request({
    url:obj.url,
    method: 'get',
    params:obj.params
  })
}

