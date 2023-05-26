import request from '@/utils/request'

export function collectionList(data) {
  return request({
    url: '/web/face/FaceReg/list',
    method: 'get',
    params: data
  })
}
