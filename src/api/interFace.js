import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/InterfaceServices/list',
    method: 'get',
    params: data
  })
}


export function update(accountForm) {
  return request({
    url: '/InterfaceServices/upStart',
    method: 'put',
    data: accountForm
  })
}


export function remove(data) {
  return request({
    url: '/InterfaceServices/' + data,
    method: 'delete'
  })
}


export function register(accountForm) {
  return request({
    url: '/InterfaceServices/save',
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
