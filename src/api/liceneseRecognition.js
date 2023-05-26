import request from '@/utils/request'

export function collectionList(data) {
  return request({
    url: '/web/license/liceneseRecognition/list',
    method: 'get',
    params: data
  })
}
