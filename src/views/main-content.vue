<template>
  <main :class="['aui-content', { 'aui-content--tabs': $route.meta.isTab }]">
    <!-- tab展示内容 -->
    <template v-if="$route.meta.isTab">
      <!-- <el-dropdown class="aui-content--tabs-tools">
        <i class="el-icon-arrow-down"></i>
        <el-dropdown-menu slot="dropdown" :show-timeout="0">
          <el-dropdown-item @click.native="tabRemoveHandle($store.state.contentTabsActiveName)">{{ $t('contentTabs.closeCurrent') }}</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseOtherHandle()">{{ $t('contentTabs.closeOther') }}</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseAllHandle()">{{ $t('contentTabs.closeAll') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <el-tabs v-model="$store.state.contentTabsActiveName" @tab-click="tabSelectedHandle" @tab-remove="tabRemoveHandle">
        <el-tab-pane
          v-for="item in $store.state.contentTabs"
          :key="item.name"
          :name="item.name"
          :label="item.title"
          :closable="item.name !== 'home'"
          :class="{ 'is-iframe': tabIsIframe(item.iframeURL) }">
            <template v-if="item.name === 'home'">
                <svg slot="label" class="icon-svg aui-content--tabs-icon-nav" aria-hidden="true"><use xlink:href="#icon-home"></use></svg>
            </template>
            <el-scrollbar class="main-content-scrollbar">
                <iframe v-if="tabIsIframe(item.iframeURL)" :src="item.iframeURL" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
                <keep-alive v-else>
                    <router-view v-if="item.name === $store.state.contentTabsActiveName" />
                </keep-alive>
            </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </template>
    <!-- 其他方式, 展示内容 -->
    <template v-else>
      <keep-alive>
        <router-view />
      </keep-alive>
    </template>
  </main>
</template>

<script>
import { isURL } from '@/utils/validate'
import visitor from '@/websocket/visitor'
import system from '@/websocket/system'
export default {
  mixins:[visitor,system],
  data () {
    return {
    }
  },
  methods: {
    // tabs, 是否通过iframe展示
    tabIsIframe (url) {
      return isURL(url)
    },
    // tabs, 选中tab
    tabSelectedHandle (tab) {
      tab = this.$store.state.contentTabs.filter(item => item.name === tab.name)[0]
      if (tab) {
        this.$router.push({
          'name': tab.name,
          'params': { ...tab.params },
          'query': { ...tab.query }
        })
      }
    },
    // tabs, 删除tab
    tabRemoveHandle (tabName) {
      if (tabName === 'home') {
        return false
      }
      this.$store.state.contentTabs = this.$store.state.contentTabs.filter(item => item.name !== tabName)
      if (this.$store.state.contentTabs.length <= 0) {
        this.$store.state.sidebarMenuActiveName = this.$store.state.contentTabsActiveName = 'home'
        return false
      }
      // 当前选中tab被删除
      if (tabName === this.$store.state.contentTabsActiveName) {
        let tab = this.$store.state.contentTabs[this.$store.state.contentTabs.length - 1]
        this.$router.push({
          name: tab.name,
          params: { ...tab.params },
          query: { ...tab.query }
        })
      }
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle () {
      this.$store.state.contentTabs = this.$store.state.contentTabs.filter(item => {
        return item.name === 'home' || item.name === this.$store.state.contentTabsActiveName
      })
    },
    // tabs, 关闭全部
    tabsCloseAllHandle () {
      this.$store.state.contentTabs = this.$store.state.contentTabs.filter(item => item.name === 'home')
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss">
.el-scrollbar__wrap{
  background: #fff !important;
}
.aui-content__wrapper{
    margin-left: 0 !important;
}
body .aui-content>.el-tabs>.el-tabs__header{
    left: 0 !important;
    top: 60px !important;
    display: none !important;
}
body .aui-content--tabs-tools{
    top:60px !important;
}
.aui-navbar__menu .el-menu-item, .aui-navbar__menu .el-submenu > .el-submenu__title{
    line-height: 60px !important;
    height: 60px !important;
}
.aui-sidebar__menu .el-menu-item, .aui-sidebar__menu .el-submenu__title{
    height: 60px !important;
    line-height: 60px !important;
}
</style>