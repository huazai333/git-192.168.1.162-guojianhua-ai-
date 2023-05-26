import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/yq/in/device',
    method: 'get',
    params: data
  })
}

export function exportAll() {
  return request({
    url: '/yq/in/device/export',
    method: 'post',
    responseType: 'blob'
  })
}

export function devlist(data) {
  return request({
    url: '/yq/touch/device',
    method: 'get',
    params: data
  })
}
export function gettouchlist(id) {
  return request({
    url: '/yq/touch/detail/' + id,
    method: 'get'
  })
}
export function getlist(id) {
  return request({
    url: '/yq/in/detail/' + id,
    method: 'get'
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

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getDevice() {
    return request({
      url: '/cameraInfo/getCameraInfoList',
      method: 'get'
    })
}

export function submit(dataForm) {
    return request({
      url: '/cameraAlgorithmTask/saveOrUpdate',
      method: 'post',
      data: dataForm
    })

  }


export function get(id) {

  return request({
    url: '/cameraInfo/getCameraTaskInfo',
    method: 'get',
    params: { id }
  })
}

export function getAndState(id) {

  return request({
    url: '/cameraInfo/getCameraTaskInfoAndState',
    method: 'get',
    params: { id }
  })
}

  export function getVideoImg(url) {
    return request({
      url: url,
      method: 'get',
    })
  }


export function getVideo(id) {
  return request({
    url: '/algorithmInfo/getCameraAlgorithmTaskList',
    method: 'get',
    params: {cameraId }
  })
}


export function getImg(id) {
  return request({
    url: '/cameraInfo/getCameraTaskInfoAndStspUrl',
    method: 'get',
    params: {id }
  })
}
export function getCount() {
  return request({
    url: '/configure/count/',
    method: 'get',
  })
}


  export function reset() {
    return request({
      url: '/configure/startTask',
      method: 'get'
    })
}

export function save(jsonObj) {
  return request({
    url: '/yxyTest/save',
    method: 'post',
    data: jsonObj
  })
}

export function open(cameraId) {
  return request({
    url: '/cameraPreview/open',
    method: 'get',
    params: {cameraId  }
  })
}

export function pause(cameraId) {
  return request({
    url: '/cameraPreview/pause',
    method: 'get',
    params: {cameraId }
  })
}

export function getCameraTaskInfoAndStspUrl(id) {
  return request({
    url: '/cameraInfo/getCameraTaskInfoAndStspUrl',
    method: 'get',
    params: { id }
  })
}

export function selectDict() {
  return request({
    url: '/dict/selectDict',
    method: 'get',
  })
}
