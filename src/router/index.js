import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/request'
import {
    isURL
} from '@/utils/validate'
import {
    getPersonRegion,
    getDictDataListAll
} from '@/utils/index'

Vue.use(Router)

// 页面路由(独立页面)
export const pageRoutes = [{
        path: '/404',
        component: () => Promise.resolve(require(`@/views/pages/404`).default),
        name: '404',
        meta: {
            title: '404未找到'
        },
        beforeEnter(to, from, next) {
            // 拦截处理特殊业务场景
            // 如果, 重定向路由包含__双下划线, 为临时添加路由
            if (/__.*/.test(to.redirectedFrom)) {
                return next(to.redirectedFrom.replace(/__.*/, ''))
            }
            next()
        }
    },
    {
        path: '/login',
        component: () => Promise.resolve(require(`@/views/pages/login`).default),
        name: 'login',
        meta: {
            title: '登录'
        }
    }
]

// 模块路由(基于主入口布局页面)
export const moduleRoutes = {
    path: '/',
    component: () => Promise.resolve(require(`@/views/main`).default),
    name: 'main',
    redirect: {
        name: 'home'
    },
    meta: {
        title: '主入口布局'
    },
    children: [{
            path: '/home',
            component: () => Promise.resolve(require(`@/views/modules/algorithm/real-time-preview`).default),
            name: 'home',
            meta: {
                title: '首页',
                isTab: true
            }
        },
        // 内网
        {
            path: '/searchHome',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/home`).default),
            name: 'searchHome',
            meta: {
                title: '信息查询',
                isTab: true
            }
        },

        {
            path: '/equipment',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/equipment`).default),
            name: 'equipment',
            meta: {
                title: '设备列表',
                isTab: true
            }
        },
        {
            path: '/equipment-info',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/equipment-info`).default),
            name: 'equipment-info',
            meta: {
                title: '设备档案',
                isTab: true
            }
        },

        {
            path: '/wifi-index',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/wifi-index`).default),
            name: 'wifi-index',
            meta: {
                title: '热点列表',
                isTab: true
            }
        },
        {
            path: '/wifi-index-info',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/wifi-index-info`).default),
            name: 'wifi-index-info',
            meta: {
                title: 'WiFi档案',
                isTab: true
            }
        },

        {
            path: '/base-station',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/base-station`).default),
            name: 'base-station',
            meta: {
                title: '基站列表',
                isTab: true
            }
        },
        {
            path: '/base-station-info',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/base-station-info`).default),
            name: 'base-station-info',
            meta: {
                title: '基站档案',
                isTab: true
            }
        },

        {
            path: '/IP-index',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/IP-index`).default),
            name: 'IP-index',
            meta: {
                title: 'IP列表',
                isTab: true
            }
        },
        {
            path: '/ip-index-info',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/ip-index-info`).default),
            name: 'ip-index-info',
            meta: {
                title: 'IP档案',
                isTab: true
            }
        },

        {
            path: '/index',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/index`).default),
            name: 'index',
            meta: {
                title: 'APP列表',
                isTab: true
            }
        },

        {
            path: '/gps-index',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/gps-index`).default),
            name: 'gps-index',
            meta: {
                title: '位置列表',
                isTab: true
            }
        },
        {
            path: '/gps-index-info',
            component: () => Promise.resolve(require(`@/views/modules/Information-retrieval/gps-index-info`).default),
            name: 'gps-index-info',
            meta: {
                title: '位置详情',
                isTab: true
            }
        },

        // 全网
        {
            path: '/device-list',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive/device-list`).default),
            name: 'device-list',
            meta: {
                title: '设备列表',
                isTab: true
            }
        },
        {
            path: '/base-Information',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive/base-Information`).default),
            name: 'base-Information',
            meta: {
                title: '设备详情',
                isTab: true
            }
        },

        {
            path: '/wifi-Information',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive/wifi-Information`).default),
            name: 'wifi-Information',
            meta: {
                title: '热点列表',
                isTab: true
            }
        },

        {
            path: '/ip-Information',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive/ip-Information`).default),
            name: 'ip-Information',
            meta: {
                title: 'IP列表',
                isTab: true
            }
        },

        {
            path: '/application-Information',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive/application-Information`).default),
            name: 'application-Information',
            meta: {
                title: '应用列表',
                isTab: true
            }
        },

        {
            path: '/geo-Information',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive/geo-Information`).default),
            name: 'geo-Information',
            meta: {
                title: '经纬度列表',
                isTab: true
            }
        },

        {
            path: '/station-Information',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive/station-Information`).default),
            name: 'station-Information',
            meta: {
                title: '基站列表',
                isTab: true
            }
        },

        // 关系分析
        {
            path: '/device',
            component: () => Promise.resolve(require(`@/views/modules/data/device`).default),
            name: 'device',
            meta: {
                title: '设备关系分析',
                isTab: true
            }
        },
        {
            path: '/device_info',
            component: () => Promise.resolve(require(`@/views/modules/data/device_info`).default),
            name: 'device_info',
            meta: {
                title: '设备关系分析详情',
                isTab: true
            }
        },

        {
            path: '/wifi',
            component: () => Promise.resolve(require(`@/views/modules/data/wifi`).default),
            name: 'wifi',
            meta: {
                title: '热点关系分析',
                isTab: true
            }
        },
        {
            path: '/wifi_info',
            component: () => Promise.resolve(require(`@/views/modules/data/wifi_info`).default),
            name: 'wifi_info',
            meta: {
                title: '热点关系分析详情',
                isTab: true
            }
        },

        {
            path: '/foothold',
            component: () => Promise.resolve(require(`@/views/modules/data/foothold`).default),
            name: 'foothold',
            meta: {
                title: '落脚点分析',
                isTab: true
            }
        },
        {
            path: '/habitat',
            component: () => Promise.resolve(require(`@/views/modules/data/habitat`).default),
            name: 'habitat',
            meta: {
                title: '栖息地分析',
                isTab: true
            }
        },
        {
            path: '/peerWifi',
            component: () => Promise.resolve(require(`@/views/modules/data/peerWifi`).default),
            name: 'peerWifi',
            meta: {
                title: '同行分析(热点)',
                isTab: true
            }
        },
        {
            path: '/peerTime',
            component: () => Promise.resolve(require(`@/views/modules/data/peerTime`).default),
            name: 'peerTime',
            meta: {
                title: '同行分析(时空)',
                isTab: true
            }
        },
        {
            path: '/peerWifi_info',
            component: () => Promise.resolve(require(`@/views/modules/data/peerWifi_info`).default),
            name: 'peerWifi_info',
            meta: {
                title: '同行分析详情(热点)',
                isTab: true
            }
        },
        {
            path: '/peerTime_info',
            component: () => Promise.resolve(require(`@/views/modules/data/peerTime_info`).default),
            name: 'peerTime_info',
            meta: {
                title: '同行分析详情(时空)',
                isTab: true
            }
        },
        {
            path: '/peerEgging',
            component: () => Promise.resolve(require(`@/views/modules/data/peerEgging`).default),
            name: 'peerEgging',
            meta: {
                title: '同行反查',
                isTab: true
            }
        },
        {
            path: '/peerEgging_info',
            component: () => Promise.resolve(require(`@/views/modules/data/peerEgging_info`).default),
            name: 'peerEgging_info',
            meta: {
                title: '同行反查详情',
                isTab: true
            }
        },
        {
            path: '/contactAnalysis',
            component: () => Promise.resolve(require(`@/views/modules/data/contactAnalysis`).default),
            name: 'contactAnalysis',
            meta: {
                title: '密接分析',
                isTab: true
            }
        },
        {
            path: '/contactAnalysis_info',
            component: () => Promise.resolve(require(`@/views/modules/data/contactAnalysis_info`).default),
            name: 'contactAnalysis_info',
            meta: {
                title: '密接分析详情',
                isTab: true
            }
        },
        {
            path: '/ip',
            component: () => Promise.resolve(require(`@/views/modules/data/ip`).default),
            name: 'ip',
            meta: {
                title: 'ip分析',
                isTab: true
            }
        },
        {
            path: '/ip_info',
            component: () => Promise.resolve(require(`@/views/modules/data/ip_info`).default),
            name: 'ip_info',
            meta: {
                title: 'ip分析详情',
                isTab: true
            }
        },
        {
            path: '/position',
            component: () => Promise.resolve(require(`@/views/modules/data/position`).default),
            name: 'position',
            meta: {
                title: '位置分析',
                isTab: true
            }
        },
        {
            path: '/position_info',
            component: () => Promise.resolve(require(`@/views/modules/data/position_info`).default),
            name: 'position_info',
            meta: {
                title: '位置分析详情',
                isTab: true
            }
        },

        // 碰撞分析

        {
            path: '/deviceLink',
            component: () => Promise.resolve(require(`@/views/modules/collision/link/device`).default),
            name: 'deviceLink',
            meta: {
                title: '设备与设备',
                isTab: true
            }
        },
        {
            path: '/deviceWifiLink',
            component: () => Promise.resolve(require(`@/views/modules/collision/link/deviceWifi`).default),
            name: 'deviceWifiLink',
            meta: {
                title: '设备与热点',
                isTab: true
            }
        },
        {
            path: '/wifiLink',
            component: () => Promise.resolve(require(`@/views/modules/collision/link/wifi`).default),
            name: 'wifiLink',
            meta: {
                title: '热点和热点',
                isTab: true
            }
        },
        {
            path: '/linkInfo',
            component: () => Promise.resolve(require(`@/views/modules/collision/link/linkInfo`).default),
            name: 'linkInfo',
            meta: {
                title: '分析详情',
                isTab: true
            }
        },

        {
            path: '/groupPortrait',
            component: () => Promise.resolve(require(`@/views/modules/collision/groupPortrait`).default),
            name: 'groupPortrait',
            meta: {
                title: '群体画像',
                isTab: true
            }
        },

        {
            path: '/timeSpace',
            component: () => Promise.resolve(require(`@/views/modules/collision/timeSpace`).default),
            name: 'timeSpace',
            meta: {
                title: '时空碰撞',
                isTab: true
            }
        },
        {
            path: '/timeSpace_info',
            component: () => Promise.resolve(require(`@/views/modules/collision/timeSpace_info`).default),
            name: 'timeSpace_info',
            meta: {
                title: '时空碰撞详情',
                isTab: true
            }
        },

        // 流动性分析
        {
            path: '/track',
            component: () => Promise.resolve(require(`@/views/modules/fluidity/track`).default),
            name: 'track',
            meta: {
                title: '轨迹分析',
                isTab: true
            }
        },
        {
            path: '/crowdTrajectory',
            component: () => Promise.resolve(require(`@/views/modules/fluidity/crowdTrajectory`).default),
            name: 'crowdTrajectory',
            meta: {
                title: '人群轨迹',
                isTab: true
            }
        },

        // 群体分析
        {
            path: '/group',
            component: () => Promise.resolve(require(`@/views/modules/group/group`).default),
            name: 'group',
            meta: {
                title: '群体关系分析',
                isTab: true
            }
        },
        {
            path: '/group_info',
            component: () => Promise.resolve(require(`@/views/modules/group/group_info`).default),
            name: 'group_info',
            meta: {
                title: '群体关系分析详情',
                isTab: true
            }
        },

        // 预警分析
        {
            path: '/politics-hotspot',
            component: () => Promise.resolve(require(`@/views/modules/warning/politics-related/hotspot-drug-related`).default),
            name: 'politics-hotspot',
            meta: {
                title: '涉政异常窝点',
                isTab: true
            }
        },
        {
            path: '/politics-dev',
            component: () => Promise.resolve(require(`@/views/modules/warning/politics-related/dev-politics-related`).default),
            name: 'politics-dev',
            meta: {
                title: '涉政敏感设备',
                isTab: true
            }
        },

        {
            path: '/terrorism-hotspot',
            component: () => Promise.resolve(require(`@/views/modules/warning/terrorism-related/hotspot-drug-related`).default),
            name: 'terrorism-hotspot',
            meta: {
                title: '涉恐异常窝点',
                isTab: true
            }
        },
        {
            path: '/terrorism-dev',
            component: () => Promise.resolve(require(`@/views/modules/warning/terrorism-related/dev-terrorism-related`).default),
            name: 'terrorism-dev',
            meta: {
                title: '涉恐敏感设备',
                isTab: true
            }
        },

        {
            path: '/drug-hotspot',
            component: () => Promise.resolve(require(`@/views/modules/warning/drug-related/hotspot-drug-related`).default),
            name: 'drug-hotspot',
            meta: {
                title: '涉毒异常窝点',
                isTab: true
            }
        },
        {
            path: '/drug-dev',
            component: () => Promise.resolve(require(`@/views/modules/warning/drug-related/dev-drug-related`).default),
            name: 'drug-dev',
            meta: {
                title: '涉毒敏感设备',
                isTab: true
            }
        },

        {
            path: '/religion-hotspot',
            component: () => Promise.resolve(require(`@/views/modules/warning/religion-related/hotspot-drug-related`).default),
            name: 'religion-hotspot',
            meta: {
                title: '宗教异常窝点',
                isTab: true
            }
        },
        {
            path: '/religion-dev',
            component: () => Promise.resolve(require(`@/views/modules/warning/religion-related/dev-religion-related`).default),
            name: 'religion-dev',
            meta: {
                title: '宗教敏感设备',
                isTab: true
            }
        },

        {
            path: '/yellow-hotspot',
            component: () => Promise.resolve(require(`@/views/modules/warning/yellow-related/hotspot-drug-related`).default),
            name: 'yellow-hotspot',
            meta: {
                title: '涉黄异常窝点',
                isTab: true
            }
        },
        {
            path: '/yellow-dev',
            component: () => Promise.resolve(require(`@/views/modules/warning/yellow-related/dev-yellow-related`).default),
            name: 'yellow-dev',
            meta: {
                title: '涉黄敏感设备',
                isTab: true
            }
        },

        {
            path: '/gambling-hotspot',
            component: () => Promise.resolve(require(`@/views/modules/warning/gambling-related/hotspot-drug-related`).default),
            name: 'gambling-hotspot',
            meta: {
                title: '涉赌异常窝点',
                isTab: true
            }
        },
        {
            path: '/gambling-dev',
            component: () => Promise.resolve(require(`@/views/modules/warning/gambling-related/dev-gambling`).default),
            name: 'gambling-dev',
            meta: {
                title: '涉赌敏感设备',
                isTab: true
            }
        },

        {
            path: '/swindle-hotspot',
            component: () => Promise.resolve(require(`@/views/modules/warning/swindle-related/hotspot-drug-related`).default),
            name: 'swindle-hotspot',
            meta: {
                title: '涉诈异常窝点',
                isTab: true
            }
        },
        {
            path: '/swindle-dev',
            component: () => Promise.resolve(require(`@/views/modules/warning/swindle-related/dev-Swindle-related`).default),
            name: 'swindle-dev',
            meta: {
                title: '涉诈敏感设备',
                isTab: true
            }
        },



        {
            path: '/crowd-flow',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/crowd-flow`).default),
            name: 'crowd-flow',
            meta: {
                title: '流动性预警',
                isTab: true
            }
        },
        {
            path: '/eq-warning',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/eq-warning`).default),
            name: 'eq-warning',
            meta: {
                title: '关注设备预警',
                isTab: true
            }
        },
        {
            path: '/wifi-warning',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/wifi-warning`).default),
            name: 'wifi-warning',
            meta: {
                title: '关注热点预警',
                isTab: true
            }
        },
        {
            path: '/base-qy',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/base-qy`).default),
            name: 'base-qy',
            meta: {
                title: '关注区域预警',
                isTab: true
            }
        },
        {
            path: '/hotspot-warning',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/hotspot-warning`).default),
            name: 'hotspot-warning',
            meta: {
                title: '关注热点预警',
                isTab: true
            }
        },
        {
            path: '/hotspot-warning-info',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/hotspot-warning-info`).default),
            name: 'hotspot-warning-info',
            meta: {
                title: '关注热点预警详情',
                isTab: true
            }
        },

        {
            path: '/bk-equipment',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/bk-equipment`).default),
            name: 'bk-equipment',
            meta: {
                title: '设备布控',
                isTab: true
            }
        },
        {
            path: '/bk-ssid',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/bk-ssid`).default),
            name: 'bk-ssid',
            meta: {
                title: '热点布控',
                isTab: true
            }
        },
        {
            path: '/bk-region',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/bk-region`).default),
            name: 'bk-region',
            meta: {
                title: '区域布控',
                isTab: true
            }
        },

        {
            path: '/keyPeople',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/keyPeople`).default),
            name: 'keyPeople',
            meta: {
                title: '重点人群落脚点',
                isTab: true
            }
        },
        {
            path: '/nightDazed',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/nightDazed`).default),
            name: 'nightDazed',
            meta: {
                title: '昼伏夜出',
                isTab: true
            }
        },
        {
            path: '/KeyPersonnelAccompanied',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/KeyPersonnelAccompanied`).default),
            name: 'KeyPersonnelAccompanied',
            meta: {
                title: '重点人群多次伴随',
                isTab: true
            }
        },
        {
            path: '/hoverAround',
            component: () => Promise.resolve(require(`@/views/modules/comprehensive-query/hoverAround`).default),
            name: 'hoverAround',
            meta: {
                title: '区域徘徊',
                isTab: true
            }
        },


        // 模型配置页面

        // 敏感人群分析

        {
            path: '/sensitiveSet',
            component: () => Promise.resolve(require(`@/views/modules/setting/sensitiveSet`).default),
            name: 'sensitiveSet',
            meta: {
                title: '敏感人群分析模型',
                isTab: true
            }
        },
        {
            path: '/unusualSet',
            component: () => Promise.resolve(require(`@/views/modules/setting/unusualSet`).default),
            name: 'unusualSet',
            meta: {
                title: '异常窝点分析模型',
                isTab: true
            }
        },
        {
            path: '/groupSet',
            component: () => Promise.resolve(require(`@/views/modules/setting/groupSet`).default),
            name: 'groupSet',
            meta: {
                title: '群体分析模型',
                isTab: true
            }
        },
        {
            path: '/abnormalAggregation',
            component: () => Promise.resolve(require(`@/views/modules/setting/abnormalAggregation`).default),
            name: 'abnormalAggregation',
            meta: {
                title: '异常聚集分析模型',
                isTab: true
            }
        },
        {
            path: '/nocturnalSet',
            component: () => Promise.resolve(require(`@/views/modules/setting/nocturnalSet`).default),
            name: 'nocturnalSet',
            meta: {
                title: '昼伏夜出分析模型',
                isTab: true
            }
        },
        {
            path: '/accompanySet',
            component: () => Promise.resolve(require(`@/views/modules/setting/accompanySet`).default),
            name: 'accompanySet',
            meta: {
                title: '伴随分析模型',
                isTab: true
            }
        },
        {
            path: '/footholdSet',
            component: () => Promise.resolve(require(`@/views/modules/setting/footholdSet`).default),
            name: 'footholdSet',
            meta: {
                title: '落脚地分析模型',
                isTab: true
            }
        },
        {
            path: '/areaWandering',
            component: () => Promise.resolve(require(`@/views/modules/setting/areaWandering`).default),
            name: 'areaWandering',
            meta: {
                title: '重点区域徘徊分析模型',
                isTab: true
            }
        },

        {
            path: '/sensitiveSet_info',
            component: () => Promise.resolve(require(`@/views/modules/setting/sensitiveSet_info`).default),
            name: 'sensitiveSet_info',
            meta: {
                title: '敏感人群分析模型详情',
                isTab: true
            }
        },
        {
            path: '/unusualSet_info',
            component: () => Promise.resolve(require(`@/views/modules/setting/unusualSet_info`).default),
            name: 'unusualSet_info',
            meta: {
                title: '异常窝点分析模型详情',
                isTab: true
            }
        },
        {
            path: '/groupSet_info',
            component: () => Promise.resolve(require(`@/views/modules/setting/groupSet_info`).default),
            name: 'groupSet_info',
            meta: {
                title: '群体分析模型详情',
                isTab: true
            }
        },
        {
            path: '/abnormalAggregation_info',
            component: () => Promise.resolve(require(`@/views/modules/setting/abnormalAggregation_info`).default),
            name: 'abnormalAggregation_info',
            meta: {
                title: '异常聚集分析模型详情',
                isTab: true
            }
        },
        {
            path: '/nocturnalSet_info',
            component: () => Promise.resolve(require(`@/views/modules/setting/nocturnalSet_info`).default),
            name: 'nocturnalSet_info',
            meta: {
                title: '昼伏夜出分析模型详情',
                isTab: true
            }
        },
        {
            path: '/accompanySet_info',
            component: () => Promise.resolve(require(`@/views/modules/setting/accompanySet_info`).default),
            name: 'accompanySet_info',
            meta: {
                title: '伴随分析模型详情',
                isTab: true
            }
        },
        {
            path: '/footholdSet_info',
            component: () => Promise.resolve(require(`@/views/modules/setting/footholdSet_info`).default),
            name: 'footholdSet_info',
            meta: {
                title: '落脚地分析模型详情',
                isTab: true
            }
        },
        {
            path: '/areaWandering_info',
            component: () => Promise.resolve(require(`@/views/modules/setting/areaWandering_info`).default),
            name: 'areaWandering_info',
            meta: {
                title: '重点区域徘徊分析模型详情',
                isTab: true
            }
        },

        // 视线库（标签）
        {
            path: '/sightLibrary',
            component: () => Promise.resolve(require(`@/views/modules/data/sightLibrary`).default),
            name: 'sightLibrary',
            meta: {
                title: '视线库',
                isTab: true
            }
        },

        // 实时预览
        {
            path: '/real-time-preview',
            component: () => Promise.resolve(require(`@/views/modules/algorithm/real-time-preview`).default),
            name: 'real-time-preview',
            meta: {
                title: '实时预览',
                isTab: true
            }
        },
        // 算法配置
        {
            path: '/distribution-configuration',
            component: () => Promise.resolve(require(`@/views/modules/algorithm/distribution-configuration`).default),
            name: 'distribution-configuration',
            meta: {
                title: '算法配置',
                isTab: true
            }
        },

        {
            path: '/algorithm-configuration',
            component: () => Promise.resolve(require(`@/views/modules/algorithm/algorithm-configuration`).default),
            name: 'algorithmConfiguration',
            meta: {
                title: '算法配置',
                isTab: true
            }
        },
        // 历史查询
        {
            path: '/data-configuration-index',
            component: () => Promise.resolve(require(`@/views/modules/algorithm/data-configuration-index`).default),
            name: 'data-configuration-index',
            meta: {
                title: '算法管理',
                isTab: true
            }
        },
        {
            path: '/data-configuration',
            component: () => Promise.resolve(require(`@/views/modules/algorithm/data-configuration`).default),
            name: 'data-configuration',
            meta: {
                title: '算法管理',
                isTab: true
            }
        },
        // distribution-service
        {
            path: '/distribution-service',
            component: () => Promise.resolve(require(`@/views/modules/algorithm/distribution-service`).default),
            name: 'distribution-service',
            meta: {
                title: '数据对接',
                isTab: true
            }
        },


    ]
}

export function addDynamicRoute(routeParams, router) {
    // 组装路由名称, 并判断是否已添加, 如是: 则直接跳转
    var routeName = routeParams.routeName
    var dynamicRoute = window.SITE_CONFIG['dynamicRoutes'].filter(item => item.name === routeName)[0]
    if (dynamicRoute) {
        return router.push({
            name: routeName,
            params: routeParams.params
        })
    }
    // 否则: 添加并全局变量保存, 再跳转
    dynamicRoute = {
        path: routeName,
        component: () => Promise.resolve(require(`@/views/modules/${routeParams.path}`).default),
        name: routeName,
        meta: {
            ...window.SITE_CONFIG['contentTabDefault'],
            menuId: routeParams.menuId,
            title: `${routeParams.title}`
        }
    }
    router.addRoutes([{
        ...moduleRoutes,
        name: `main-dynamic__${dynamicRoute.name}`,
        children: [dynamicRoute]
    }])
    window.SITE_CONFIG['dynamicRoutes'].push(dynamicRoute)
    router.push({
        name: dynamicRoute.name,
        params: routeParams.params
    })
}

const router = new Router({
    mode: 'hash',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: pageRoutes.concat(moduleRoutes)
})

router.beforeEach((to, from, next) => {
    // 添加动态(菜单)路由
    // 已添加或者当前路由为页面路由, 可直接访问
    if (window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] || fnCurrentRouteIsPageRoute(to, pageRoutes)) {
        return next()
    }
    //行政区域
    getPersonRegion()
    //字典
    getDictDataListAll()
    // 获取字典列表, 添加并全局变量保存
    /* http.get('/sys/dict/type/all').then(({ data: res }) => {
      if (res.code !== 0) {
        return
      }
      window.SITE_CONFIG['dictList'] = res.data
    }).catch(() => {}) */
    // 获取菜单列表, 添加并全局变量保存
    http.get('/sys/menu/nav').then(({
        data: res
    }) => {
        if (res.code !== 0) {
            Vue.prototype.$message.error(res.msg)
            return next({
                name: 'login'
            })
        }
        window.SITE_CONFIG['menuList'] = res.data
        fnAddDynamicMenuRoutes(window.SITE_CONFIG['menuList'])
        next({
            ...to,
            replace: true
        })
    }).catch(() => {
        next({
            name: 'login'
        })
    })
})

/**
 * 判断当前路由是否为页面路由
 * @param {*} route 当前路由
 * @param {*} pageRoutes 页面路由
 */
function fnCurrentRouteIsPageRoute(route, pageRoutes = []) {
    var temp = []
    for (var i = 0; i < pageRoutes.length; i++) {
        if (route.path === pageRoutes[i].path) {
            return true
        }
        if (pageRoutes[i].children && pageRoutes[i].children.length >= 1) {
            temp = temp.concat(pageRoutes[i].children)
        }
    }
    return temp.length >= 1 ? fnCurrentRouteIsPageRoute(route, temp) : false
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
    var temp = []
    for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].children && menuList[i].children.length >= 1) {
            temp = temp.concat(menuList[i].children)
            continue
        }
        // 组装路由
        var route = {
            path: '',
            component: null,
            name: '',
            meta: {
                ...window.SITE_CONFIG['contentTabDefault'],
                menuId: menuList[i].id,
                title: menuList[i].name
            }
        }
        // eslint-disable-next-line
        let URL = (menuList[i].url || '').replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)) // URL支持{{ window.xxx }}占位符变量
        if (isURL(URL)) {
            route['path'] = route['name'] = `i-${menuList[i].id}`
            route['meta']['iframeURL'] = URL
        } else {
            URL = URL.replace(/^\//, '').replace(/_/g, '-')
            route['path'] = route['name'] = URL.replace(/\//g, '-')
            route['component'] = () => Promise.resolve(require(`@/views/modules/${URL}`).default)
        }
        routes.push(route)
    }
    if (temp.length >= 1) {
        return fnAddDynamicMenuRoutes(temp, routes)
    }
    // 添加路由
    router.addRoutes([{
            ...moduleRoutes,
            name: 'main-dynamic-menu',
            children: routes
        },
        {
            path: '*',
            redirect: {
                name: '404'
            }
        }
    ])
    window.SITE_CONFIG['dynamicMenuRoutes'] = routes
    window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] = true
}

export default router