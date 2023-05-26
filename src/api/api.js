import request from '@/utils/request'
// 设备布控列表
export function getBkeq(data) {
    return request({
        url: '/system/per/getAll',
        method: 'get',
        params: data
    })
}
// 热点布控列表
export function getBkssid(data) {
    return request({
        url: '/system/scssidinfo',
        method: 'get',
        params: data
    })
}
//热点预警信息查询
export function getHos(data){
    return request({
        url:'/system/ssidwarning/sel',
        method:'get',
        params:data
    })
}
//区域布控列表
export function getBkregion(data){
    return request({
        url:'/system/reg/getAll',
        method:'get',
        params:data
    })
}
