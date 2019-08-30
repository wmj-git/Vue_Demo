import request from '@/utils/request'
export  function digital(obj) {
  return request({
    url: '/gardens/counts/countsAll',
    method: 'get',
    params:obj
  })
}
