import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import user from './modules/user'
import visitor from './modules/visitor'
import system from './modules/system'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state: {
        // 导航条, 布局风格, defalut(白色) / colorful(鲜艳)
        navbarLayoutType: 'colorful',
        // 侧边栏, 布局皮肤, default(白色) / dark(黑色)
        sidebarLayoutSkin: 'default',
        // 侧边栏, 折叠状态
        sidebarFold: false,
        // 侧边栏, 菜单
        sidebarMenuList: [],
        sidebarMenuActiveName: '',
        // 内容, 是否需要刷新 
        contentIsNeedRefresh: false,
        // 内容, 标签页(默认添加首页)
        contentTabs: [{
            ...window.SITE_CONFIG['contentTabDefault'],
            'name': 'home',
            'title': 'home'
        }],
        contentTabsActiveName: 'home',
        //行政 区域
        personRegionList: [],
        //字典表
        dictType: [],
        defaultCheckedKeys: '',
    },
    modules: {
        user,
        visitor,
        system
    },
    mutations: { 
        // 重置vuex本地储存状态
        resetStore(state) {
            Object.keys(state).forEach((key) => {
                state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
            })
        },
        // 改变区域的值
        setPersonRegionList(state, arr) {
            state.personRegionList = arr
        },
        //修改 字典表 的值
        setDictList(state, arr) {
            state.dictType = arr
        },
    },
    getters
})