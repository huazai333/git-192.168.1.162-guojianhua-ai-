<template>
  <nav
    class="aui-navbar"
    :class="`aui-navbar--${$store.state.navbarLayoutType}`"
  >
    <!-- <div class="aui-navbar__header">
      <h3
        class="aui-navbar__brand"
        @click="$router.push({ name: 'real-time-preview' })"
      >
        算法平台
      </h3>
    </div> -->

    <div class="aui-navbar__body" style="justify-content: center">
      <el-menu
        :default-active="$store.state.sidebarMenuActiveName"
        :collapse="$store.state.sidebarFold"
        :unique-opened="true"
        :collapseTransition="false"
        mode="horizontal"
        class="aui-sidebar__menu"
      >
        <div class="header">
          <div class="nav">
            <ul>
              <li :class="{ active: shows == 1 }" @click="oShow(1)">
                <a>
                  <router-link :to="{ name: 'real-time-preview' }"
                    >实时预览</router-link
                  >
                </a>
              </li>
              <li :class="{ active: shows == 2 }" @click="oShow(2)">
                <a>
                  <router-link :to="{ name: 'distribution-configuration' }"
                    >算法配置</router-link
                  >
                </a>
              </li>
              <li :class="{ active: shows == 3 }" @click="oShow(3)">
                <a>
                  <router-link :to="{ name: 'data-configuration-index' }"
                    >算法管理</router-link
                  >
                </a>
              </li>
              <li :class="{ active: shows == 4 }" @click="oShow(4)">
                <a>
                  <router-link :to="{ name: 'distribution-service' }"
                    >数据对接</router-link
                  >
                </a>
              </li>
            </ul>
          </div>
        </div>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password
      v-if="updatePasswordVisible"
      ref="updatePassword"
    ></update-password>
    <!-- 弹窗 修改个人信息 -->
    <update-info v-if="updateInfoVisible" ref="updateInfo"></update-info>
  </nav>
</template>

<script>
import { messages } from "@/i18n";
import screenfull from "screenfull";
import UpdatePassword from "./main-navbar-update-password";
import updateInfo from "./main-navbar-update-info";
import { clearLoginInfo } from "@/utils";
import SubMenu from "./main-sidebar-sub-menu";
export default {
  inject: ["refresh"],
  data() {
    return {
      i18nMessages: messages,
      updatePasswordVisible: false,
      updateInfoVisible: false,
      messageTip: false,
      shows: 1,
    };
  },
  components: {
    UpdatePassword,
    updateInfo,
    SubMenu,
  },
  created() {
    // 未读通知数
    this.getUnReadCount();
    this.$store.state.sidebarMenuList = window.SITE_CONFIG["menuList"];
  },
  methods: {
    oShow(num) {
      this.shows = num;
    },
    myNoticeRouter() {
      this.$router.replace("sys-notice-user");
    },
    getUnReadCount() {
      this.$http
        .get(`/sys/notice/mynotice/unread`)
        .then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg);
          }
          if (res.data > 0) {
            this.messageTip = true;
          }
        })
        .catch(() => {});
    },
    openindex() {
      if (this.$route.name == "home") {
        let dom = document.querySelectorAll(".home")[0];
        screenfull.toggle(dom);
      } else {
        this.$router.replace({ name: "home" });
      }
      this.$store.commit("SET_FULL_SCREEN", true);
    },
    // 全屏
    fullscreenHandle() {
      if (!screenfull.enabled) {
        return this.$message({
          message: this.$t("fullscreen.prompt"),
          type: "warning",
          duration: 500,
        });
      }
      screenfull.toggle();
    },
    // 修改密码
    updatePasswordHandle() {
      this.updatePasswordVisible = true;
      this.$nextTick(() => {
        this.$refs.updatePassword.init();
      });
    },
    updateSelfInfoHandle() {
      this.updateInfoVisible = true;
      this.$nextTick(() => {
        this.$refs.updateInfo.init();
      });
    },
    // 退出
    logoutHandle() {
      this.$confirm(
        this.$t("prompt.info", { handle: this.$t("logout") }),
        this.$t("prompt.title"),
        {
          confirmButtonText: this.$t("confirm"),
          cancelButtonText: this.$t("cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.$http
            .post("/auth/oauth/logout")
            .then(({ data: res }) => {
              if (res.code !== 0) {
                return this.$message.error(res.msg);
              }
              clearLoginInfo();
              this.$router.push({ name: "login" });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" >
.el-dropdown-menu {
  box-shadow: 5px 5px 5px #888888 !important;
  background: white;
}

.aui-sidebar__menu {
  width: auto !important;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0 solid #000 !important;
}
.aui-navbar {
  height: 60px !important;
  .aui-navbar__header {
    height: 60px !important;
    overflow: hidden !important;
    .aui-navbar__brand {
      background: #2a3f54 !important;
    }
  }
}
.aui-content--tabs {
  padding-top: 0 !important;
}

.el-menu--horizontal > .el-submenu:focus .el-submenu__title a,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title a {
  color: #303133 !important;
}

body .main-content-scrollbar {
  height: calc(100vh - 70px - 42px - 30px + 38px) !important;
}
</style>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .nav {
    ul {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        margin: 0 20px;
        list-style: none;
        &.active {
          a{
            border-bottom: 4px solid rgb(244, 142, 0);
          }
        }
        a {
          font-size: 18px;
          color: #fff;
          text-decoration: none;
            height: 60px;
            line-height: 60px;
            display: block;
        }
      }
    }
  }
}
</style>