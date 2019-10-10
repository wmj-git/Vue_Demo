import request from '@/utils/request'
export function playerOpen(url,params) {         //火灾报警点数量
  return request({
    url: url+'/gardens/monitoringpoints/open/'+params.id,
    method: 'get'
  })
}
export function playerClose(url,params) {         //火灾报警点数量
  return request({
    url: url+'/gardens/monitoringpoints/close/'+params.id,
    method: 'get'
  })

}
