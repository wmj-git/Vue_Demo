import request from '@/utils/request'

export function submit(obj) {//表格数据删
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}


