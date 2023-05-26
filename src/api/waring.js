import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/yxyTest/list',
    method: 'get',
    params: data
  })
}

export function remove(data) {
  return request({
    url: '/cameraInfo/remove',
    method: 'get',
    params: data
  })
}


export function register(accountForm) {
  return request({
    url: '/cameraInfo/save',
    method: 'post',
    data: accountForm
  })
}


export function addTask(data) {
  return request({
    url: '/web/task/add',
    method: 'post',
    data
  })
}

export function setListName() {
  return request({
    url: '/cameraInfo/listName',
    method: 'get'
  })
}
