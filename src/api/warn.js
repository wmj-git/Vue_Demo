import request from '@/utils/request'
export function fireWarnCount() {         //火灾报警点数量
  return request({
    url: '/gardens/firealarminfo/getcount',
    method: 'get'


  })

}
