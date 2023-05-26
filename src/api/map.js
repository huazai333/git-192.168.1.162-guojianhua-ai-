import request from '@/utils/request'

export function list(id) {
  return request({
    url: '/yq/in/detail/'+id,
    method: 'get',
  })
}
export function search(data) {
  return request({
    url: '/yq/in/device',
    method: 'get',
    params: data
  })
}
export function getInfo(token) {
  return request({
    url: '/web/user/info',
    method: 'get',
    params: { token }
  })
}


