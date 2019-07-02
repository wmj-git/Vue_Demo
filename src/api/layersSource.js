import request from '@/utils/request'

export function queryVicinityTree(obj) { //获取附近
  return request({
    url: "http://192.168.20.18:8080/api/v1/gardens//tree/queryVicinityTree",
    method: 'get',
    params: obj.params
  })
}
