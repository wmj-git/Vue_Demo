import request from '@/utils/request'
export function fireWarn() {
  return request({
    url: 'http://localhost:3000/chartdata',
    method: 'get'


  })

}
