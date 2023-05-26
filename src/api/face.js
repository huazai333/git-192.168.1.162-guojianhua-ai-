import request from '@/utils/request'

export function collectionList(data) {
  return request({
    url: '/web/face/collect/list',
    method: 'get',
    params: data
  })
}

export function remove(data) {
  return request({
    url: '/web/face/collect/delete/' + data,
    method: 'delete'
  })
}

