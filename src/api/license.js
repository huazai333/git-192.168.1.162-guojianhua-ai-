import request from '@/utils/request'

export function collectList(data) {
  return request({
    url: '/web/license/collect/list',
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

export function remove(id) {
  return request({
    url: '/web/license/collect/remove/' + id,
    method: 'get'
  })
}
