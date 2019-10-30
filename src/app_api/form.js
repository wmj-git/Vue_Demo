import request from '@/utils/request'

export function del(obj) {//表格数据删
  return request({
    url: obj.url,
    method: obj.method,
    data: obj.params
  })
}


