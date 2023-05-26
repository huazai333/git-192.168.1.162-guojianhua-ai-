<template >
  <div class="analyze_page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="通用技战法" name="first">
        <div class="center">
          <ul>
            <li v-for="item in modelList" :key="item.index">
              <div class="tit">
                <span>{{ item.type }}</span>
              </div>

              <a
                v-for="data in item.value"
                :key="data.index"
                @click="jump(data)"
              >
                <span v-if="data.result == 0" style="color:#777">
                  {{ JSON.parse(data.name) }}
                </span>

                <el-badge value="new" v-else-if="data.result == 1">
                  <span>
                    {{ JSON.parse(data.name) }}
                  </span>
                </el-badge>

                <span v-else>
                  {{ JSON.parse(data.name) }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关系分析" name="second">
        <div class="center">
          <ul>
            <li>
              <div class="tit">
                <span>关系分析</span>
              </div>
              <router-link to="device">设备关系分析</router-link>
              <router-link to="wifi">热点关系分析 </router-link>
              <router-link to="position">位置关联分析 </router-link>
              <router-link to="ip">IP关联分析 </router-link>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="时空分析" name="third">
        <div class="center">
          <ul>
            <li>
              <div class="tit">
                <span>伴随分析</span>
              </div>
              <router-link to="peerWifi">同行分析(热点) </router-link>
              <router-link to="peerTime">同行分析(时空) </router-link>
              <router-link to="peerEgging">同行反查</router-link>
              <!-- <router-link to="KeyPersonnelAccompanied">
                重点人员多次伴随
              </router-link> -->
            </li>
            <li>
              <div class="tit">
                <span>碰撞分析</span>
              </div>
              <router-link to="deviceLink"> 链路分析(设备与设备) </router-link>
              <router-link to="deviceWifiLink">
                链路分析(设备和热点)
              </router-link>
              <router-link to="wifiLink"> 链路分析(热点和热点) </router-link>
              <router-link to="groupPortrait"> 群体画像 </router-link>
              <router-link to="timeSpace"> 时空碰撞 </router-link>
            </li>
            <li>
              <div class="tit">
                <span>流动性分析</span>
              </div>
              <router-link to="foothold">落脚点分析 </router-link>
              <router-link to="habitat">栖息地分析 </router-link>
              <router-link to="track"> 人员轨迹分析 </router-link>
              <router-link to="contactAnalysis">密接分析</router-link>
              <router-link to="crowdTrajectory"> 人群轨迹查询 </router-link>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="预警分析" name="fourth">
        <div class="center">
          <ul>
            <li>
              <div class="tit">
                <span>敏感人群分析 </span>
                <i class="el-icon-plus" @click="sensitiveSet"></i>
              </div>
              <div v-for="(item, index) in list1" :key="index" class="items">
                <span @click="sensitiveSet(item)">{{
                  JSON.parse(item.name)
                }}</span>
              </div>
            </li>
            <li>
              <div class="tit">
                <span>异常窝点分析</span>
                <i class="el-icon-plus" @click="unusualSet"></i>
              </div>
              <div v-for="(item, index) in list2" :key="index" class="items">
                <span @click="unusualSet(item)">{{
                  JSON.parse(item.name)
                }}</span>
              </div>
            </li>
            <li>
              <div class="tit">
                <span>群体分析 </span>
                <i class="el-icon-plus" @click="groupSet"></i>
              </div>
              <div v-for="(item, index) in list3" :key="index" class="items">
                <span @click="groupSet(item)">{{ JSON.parse(item.name) }}</span>
              </div>
            </li>
            <li>
              <div class="tit">
                <span>异常聚集 </span>
                <i class="el-icon-plus" @click="abnormalAggregation"></i>
              </div>
              <div v-for="(item, index) in list4" :key="index" class="items">
                <span @click="abnormalAggregation(item)">{{
                  JSON.parse(item.name)
                }}</span>
              </div>
              <!-- <router-link to="nightDazed"> 昼伏夜出 </router-link>
              <router-link to="hoverAround"> 重点区域徘徊 </router-link> -->
            </li>

            <li>
              <div class="tit">
                <span>昼伏夜出 </span>
                <i class="el-icon-plus" @click="nocturnalSet"></i>
              </div>
              <div v-for="(item, index) in list5" :key="index" class="items">
                <span @click="nocturnalSet(item)">{{
                  JSON.parse(item.name)
                }}</span>
              </div>
            </li>

            <li>
              <div class="tit">
                <span>伴随分析 </span>
                <i class="el-icon-plus" @click="accompanySet"></i>
              </div>
              <div v-for="(item, index) in list6" :key="index" class="items">
                <span @click="accompanySet(item)">{{
                  JSON.parse(item.name)
                }}</span>
              </div>
            </li>

            <li>
              <div class="tit">
                <span>落脚点分析 </span>
                <i class="el-icon-plus" @click="footholdSet"></i>
              </div>
              <div v-for="(item, index) in list7" :key="index" class="items">
                <span @click="footholdSet(item)">{{
                  JSON.parse(item.name)
                }}</span>
              </div>
              <!-- <router-link to="keyPeople"> 重点人群落脚点分析 </router-link> -->
            </li>

            <li>
              <div class="tit">
                <span>重点区域徘徊</span>
                <i class="el-icon-plus" @click="areaWandering"></i>
              </div>
              <div v-for="(item, index) in list8" :key="index" class="items">
                <span @click="areaWandering(item)">{{
                  JSON.parse(item.name)
                }}</span>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      activeName: "first",
      modelList: "",
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      list7: [],
      list8: [],
    };
  },
  created() {
    this.modelResult();
    this.getModelList();
  },
  mounted() {
    this.modelResult();
    this.getModelList();
  },
  activated() {
    this.modelResult();
    this.getModelList();
  },
  methods: {
    // 模型结果
    modelResult() {
      this.$http({
        url: "/system/model/result",
        method: "get",
      }).then(({ data: res }) => {
        this.modelList = res.data;
      });
    },

    // 跳转模型结果页

    jump(item) {
      if (item.result !== 0) {
        this.$router.push({
          name: item.url,
          query: { item: item.id, itemName: item.name },
        });
      } else {
        this.$message.warning("暂无数据");
      }
    },

    // 获取模型列表
    getModelList() {
      this.$http({
        url: "/system/model/all",
        method: "get",
      }).then(({ data: res }) => {
        this.list1 = res.data.list1;
        this.list2 = res.data.list2;
        this.list3 = res.data.list3;
        this.list4 = res.data.list4;
        this.list5 = res.data.list5;
        this.list6 = res.data.list6;
        this.list7 = res.data.list7;
        this.list8 = res.data.list8;
      });
    },
    // 去配置页
    sensitiveSet(item) {
      this.$router.push({ name: "sensitiveSet", query: { item: item.id } });
    },
    unusualSet(item) {
      this.$router.push({ name: "unusualSet", query: { item: item.id } });
    },
    groupSet(item) {
      this.$router.push({ name: "groupSet", query: { item: item.id } });
    },
    abnormalAggregation(item) {
      this.$router.push({
        name: "abnormalAggregation",
        query: { item: item.id },
      });
    },
    nocturnalSet(item) {
      this.$router.push({
        name: "nocturnalSet",
        query: { item: item.id },
      });
    },
    accompanySet(item) {
      this.$router.push({
        name: "accompanySet",
        query: { item: item.id },
      });
    },
    footholdSet(item) {
      this.$router.push({
        name: "footholdSet",
        query: { item: item.id },
      });
    },
    areaWandering(item) {
      this.$router.push({
        name: "areaWandering",
        query: { item: item.id },
      });
    },
  },
};
</script>
<style lang="scss">
.analyze_page {
  background: #fff;
  padding: 40px;
  height: calc(100vh - 70px - 42px - 30px + 38px);
  .el-tabs {
    .el-tabs__header {
      top: 0 !important;
      box-shadow: none !important;
      margin-bottom: 0 !important;
      background: none !important;
      .el-tabs__nav-wrap {
        &::after {
          display: none;
        }
        .el-tabs__nav-scroll {
          .el-tabs__nav {
            width: 100%;
            margin-bottom: 40px;
            display: flex;
            .el-tabs__active-bar {
              display: none;
            }
            .el-tabs__item {
              text-align: center;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              color: #333;
              text-decoration: none;
              display: block;
              width: auto;
              flex: 1;
              padding: 0;
              background: #ddd;
              &.is-active {
                background: #2a3f54;
                border-radius: 3px;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .el-tabs__content {
      .el-tab-pane {
        text-align: center;
        .center {
          ul {
            background-color: #fff;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-items: flex-start;
            li {
              width: 18%;
              background: #dedede;
              padding: 20px;
              margin-right: 20px;
              min-height: 400px;
              margin-bottom: 20px;
              text-align: left;
              .tit {
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                  padding: 0 15px;
                  display: block;
                  height: 40px;
                  text-align: center;
                  line-height: 40px;
                  color: #333;
                  background: #2a3f54;
                  color: #fff;
                  font-size: 18px;
                }
                i {
                  font-size: 24px;
                  color: #2a3f54;
                  font-weight: bold;
                }
              }
              .items {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
                .set {
                  display: flex;
                  justify-content: center;
                }
              }
              a,
              p,
              span {
                display: block;
                color: #333;
                line-height: 40px;
                font-size: 16px;
                text-align: left;
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
