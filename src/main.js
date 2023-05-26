import Vue from 'vue'
import Element from 'element-ui'
import App from '@/App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import '@/icons'
import '@/element-ui/theme/index.css'
import '@/assets/scss/aui.scss'
import  http from '@/utils/request'
import renRadioGroup from '@/components/ren-radio-group'
import renSelect from '@/components/ren-select'
import renProcessMultiple from '@/components/ren-process-multiple'
import renProcessStart from '@/components/ren-process-start'
import renProcessRunning from '@/components/ren-process-running'
import renProcessDetail from '@/components/ren-process-detail'
import renDeptTree from '@/components/ren-dept-tree'
import renRegionTree from '@/components/ren-region-tree'
import dataV from '@jiaminghi/data-view'
import qs from 'qs'
import Cookies from 'js-cookie'
     






import {
	hasPermission,
	getDictLabel,
	cellDbclick
} from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import '@/directive/index'

Vue.config.productionTip = false
Vue.use(dataV);
Vue.use(renRadioGroup)
Vue.use(renSelect)
Vue.use(renDeptTree)
Vue.use(renRegionTree)
Vue.use(renProcessMultiple)
Vue.use(renProcessStart)
Vue.use(renProcessRunning)
Vue.use(renProcessDetail)
Vue.prototype.$qs = qs


Vue.use(Element, {
	size: Cookies.get('size') || 'medium' // set element-ui default size
	// locale: enLang // 如果使用中文，无需设置，请删除
  })

Vue.use(Element, {
	size: 'default',
	i18n: (key, value) => i18n.t(key, value)
})

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
	ak: 'vACsiZ5BtCERzZKbPboonaYIBM6YhgA9'
})

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = window.echarts
// 挂载全局
Vue.prototype.$http = http
Vue.prototype.$hasPermission = hasPermission
Vue.prototype.$getDictLabel = getDictLabel
Vue.prototype.$cellDbclick = cellDbclick
Vue.prototype.$ImgServerUrl = window.GLOBAL_CONFIG['IMG_SERVER_URL']
// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
