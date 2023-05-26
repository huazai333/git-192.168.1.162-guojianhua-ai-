import request from '@/utils/request'
export function temperatureList(params) {
  return request({
    url: '/user/temperature/list',
    method: 'get',
    params
  })
}
export function list(params) {
  return request({
    url: '/user/investigate/list',
    method: 'get',
    params
  })
}

export function validatePassword(accountForm) {
  return request({
    url: '/account/password',
    method: 'post',
    data: accountForm
  })
}

export function update(accountForm) {
  return request({
    url: '/account/detail',
    method: 'put',
    data: accountForm
  })
}

export function updateAccount(accountForm) {
  return request({
    url: '/account/' + accountForm.Id,
    method: 'put',
    data: accountForm
  })
}

export function remove(accountId) {
  return request({
    url: '/account/' + accountId,
    method: 'delete'
  })
}

export function register(accountForm) {
  return request({
    url: '/account',
    method: 'post',
    data: accountForm
  })
}

export function login(accountForm) {
  return request({
    url: '/account/token',
    method: 'post',
    data: accountForm
  })
}

export function detail() {
  return request({
    url: '/account/detail',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/account/token',
    method: 'delete'
  })
}

export function deviceList(params) {
  return request({
    url: '/user/device/list',
    method: 'get',
    params
  })
}
