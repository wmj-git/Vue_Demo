import request from '@/utils/request'
export function fetchPie() {
  return request({
    url: 'http://localhost:3000/chartdata',
    method: 'get'


  })

}

export function fetchCircle() {
  return request({
    url: 'http://localhost:3000/chartdata',
    method: 'get'


  })
}
  export function fetchLine() {
    return request({
      url: 'http://localhost:4000/chartdata',
      method: 'get'


    })

  }

export function fetchChart(obj) {
  return request({
    url:obj.chart_url,
    method: 'get',
    params: obj.params
  })
}
