<template >
  <div class="analyze_page2">
    <el-tabs v-model="activeName">
      <el-tab-pane label="设备预警" name="first">
        <div class="center">
          <!-- 查询区域 -->
          <div>
            <el-form
              :inline="true"
              :model="queryParameter"
              class="demo-form-inline"
              :rules="formAddRules"
            >
              <el-form-item label="预警设备号码:" prop="devicePhone">
                <el-input
                  v-model="queryParameter.devicePhone"
                  placeholder="预警设备号码"
                ></el-input>
              </el-form-item>
              <el-form-item label="预警设备imei:" prop="deviceImei">
                <el-input
                  v-model="queryParameter.deviceImei"
                  placeholder="预警设备imei"
                ></el-input>
              </el-form-item>
              <el-form-item label="预警设备imsi:" prop="deviceImsi">
                <el-input
                  v-model="queryParameter.deviceImsi"
                  placeholder="预警设备imsi"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchQuery()"
                  >查询</el-button
                >
                <el-button type="warning" @click="resetForms()"
                  >重置</el-button
                > </el-form-item
              ><router-link to="bk-equipment">
                <el-button type="primary" style="float: right"
                  >添加布控设备</el-button
                >
              </router-link>
            </el-form>
          </div>
          <!-- table区域 -->
          <div>
            <el-table :data="dataSource" style="width: 100%">
                <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
              <el-table-column
                prop="devicePhone"
                label="预警设备号码"
                width="180"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="deviceImei"
                label="预警设备imei"
                width="180"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="deviceImsi"
                label="预警设备imsi"
                width="180"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="deviceMac"
                label="预警设备mac"
                width="180"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="devDescribe"
                label="布控设备描述"
                width="180"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="controlReason"
                label="布控原因"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="热点预警" name="second">
        <div class="center">
          <!-- 查询区域 -->
          <div>
            <el-form
              :inline="true"
              :model="wifiqueryParameter"
              class="demo-form-inline"
              :rules="wififormAddRules"
            >
              <el-form-item label="热点名称:">
                <el-input
                  v-model="wifiqueryParameter.ssid"
                  placeholder="热点名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="热点mac:" prop="mac">
                <el-input
                  v-model="wifiqueryParameter.mac"
                  placeholder="热点mac"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="wifisearchQuery()"
                  >查询</el-button
                >
                <el-button type="warning" @click="wifiresetForms()"
                  >重置</el-button
                >
              </el-form-item>
              <router-link to="bk-ssid">
                <el-button type="primary" style="float: right"
                  >添加布控热点</el-button
                >
              </router-link>
            </el-form>
          </div>
          <!-- table区域 -->
          <div>
            <el-table :data="wifidataSource" style="width: 100%">
                <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
              <el-table-column
                prop="ssid"
                label="热点名称"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="mac"
                label="热点mac"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="ssidType"
                label="预警类型"
                align="center"
                width="210"
              >
                <template slot-scope="scope">
                  <div>
                    <span v-if="scope.row.ssidType === 1">扫描连接报警</span>
                    <span v-else>异常设备报警</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                prop="controlReason"
                label="布控原因"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="date"
                label="预警时间"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="区域预警" name="third">
        <div class="center">
          <h5>关注区域预警</h5>
          <!-- <ul>
            <li>
              <div class="tit">
                <span>区域预警</span>
                <router-link to="bk-region">
                  <i class="el-icon-plus"></i>
                </router-link>
              </div>
              <router-link to="base-qy">关注区域预警</router-link>
              <router-link to="crowd-flow">流动性预警</router-link>
            </li>
          </ul> -->
          <el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
            <el-form-item label="预警类型：" prop="warningType">
              <el-select v-model="dataForm.warningType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域名称：" prop="aresName">
              <el-input
                v-model="dataForm.aresName"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="search">查询</el-button>
              <el-button type="warning" @click="resetQuery()">重置</el-button>
            </el-form-item>
            <router-link to="bk-region">
              <el-button type="primary" style="float: right"
                >添加布控区域</el-button
              >
            </router-link>
          </el-form>
          <el-table :data="dataList">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="aresId"
              label="预警区域id"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="aresName"
              label="预警区域名称"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="warningDate"
              label="预警时间"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="warningType"
              label="预警类型"
              align="center"
              width="210"
            >
              <template slot-scope="scope">
                <div>
                  <span v-if="scope.row.warningType === 1">出界预警</span>
                  <span v-else>入界预警</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="controlAddress"
              label="布控地址"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
          </el-table>
          <el-pagination
          background
      :current-page="page"
      :page-sizes="[6, 10, 20, 50, 100, 500]"
      :page-size="limit"
      :total="total"
      layout="total, prev, pager, next"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"
    >
    </el-pagination>
        </div>
        <div class="center">
          <h5>流动性预警</h5>
          <el-table :data="lddataSource" style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="aresName"
              label="预警区域名称"
              width="180"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="流出区域设备"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-link type="primary" @click="Inflow(scope)">{{
                  scope.row.crowdInflowCount
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="流入区域设备"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-link type="primary" @click="floww(scope)">{{
                  scope.row.crowdOutflowCount
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="startDate"
              label="统计开始时间"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="endDate"
              label="统计结束时间"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
import { getDictLabel, getDictDataList } from "@/utils";
export default {
  filters: {
    filterLabel(val, type) {
      return getDictLabel(type, val);
    },
  },
  mixins: [mixinViewModule],
  data() {
    return {
      activeName: "first",
      //查询参数
      total: 0, //总页数
      queryInfo: {
        page: 1,
        limit: 10,
      },

      dataSource: [], //表格数据
      queryParameter: {
        devicePhone: null,
        deviceImei: null,
        deviceImsi: null,
      },
      formAddRules: {
        devicePhone: [
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        deviceImei: [
          {
            pattern: /^[\d]{15}(?:[\d]{2})?$/,
            message: "请输入正确的IMEI号码",
            trigger: "blur",
          },
        ],
        deviceImsi: [
          {
            pattern: /^4600[0,1,2,3,5,6,7]\d{10}$/g,
            message: "请输入正确的IMSI号码",
            trigger: "blur",
          },
        ],
      },

      wifidataSource: [], //表格数据
      wifiqueryParameter: {
        ssid: null,
        mac: null,
      },
      wififormAddRules: {
        mac: [
          {
            pattern: /^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$/,
            message: "请输入正确的MAC号码",
            trigger: "blur",
          },
        ],
      },

      mixinViewModuleOptions: {
        getDataListURL: "/system/areawarning",
        getDataListIsPage: true,
        activatedIsNeed: false,
        createdIsNeed: true,
      },
      page: 0,
      limit: 6,
      genderList: getDictDataList("informationType"),
      dataForm: {
        aresName: "",
        warningType: "",
      },
      dataList: [],
      checkList: [],
      loading: false,
      options: [
        {
          value: "1",
          label: "出界报警",
        },
        {
          value: "2",
          label: "入界报警",
        },
      ],

      lddataSource: [], //表格数据
    };
  },
  created() {
    this.getList();

    this.wifigetList();

    this.ldgetList();
  },
  methods: {
    getList() {
      this.$http({
        url: "/system/devicewarning/sel",
        params: {
          ...this.queryInfo,
        },
      }).then((res) => {
        this.dataSource = res.data.data.list;
      });
    },
    async searchQuery() {
      let params = {
        devicePhone: this.queryParameter.devicePhone,
        deviceImei: this.queryParameter.deviceImei,
        deviceImsi: this.queryParameter.deviceImsi,
      };
      const { data: res } = await this.$http("/system/devicewarning/sel", {
        params: params,
      });
      this.dataSource = res.data.list;
    },
    resetForms() {
      this.queryParameter = {};
      this.getList();
    },

    wifigetList() {
      this.$http({
        url: "/system/wifiWarning/sel",
        params: {
          ...this.queryInfo,
        },
      }).then((res) => {
        this.wifidataSource = res.data.data.list;
      });
    },
    async wifisearchQuery() {
      let params = {
        ssid: this.wifiqueryParameter.ssid,
        mac: this.wifiqueryParameter.mac,
      };
      const { data: res } = await this.$http("/system/wifiWarning/sel", {
        params: params,
      });
      this.wifidataSource = res.data.list;
    },
    wifiresetForms() {
      this.wifiqueryParameter = {};
       this.wifigetList();
    },

    search() {
      this.page = 0;
      let params = {
        aresName: this.dataForm.aresName,
        warningType: this.dataForm.warningType,
      };
      this.query();
    },
    resetQuery() {
      this.page = 0;
      this.dataForm = {
        aresName: "",
        warningType: "",
      };
      this.query();
    },

    //获取列表数据
    ldgetList() {
      this.$http({ url: "system/crowdwarning", method: "get" }).then((res) => {
        if (res.data.code == 0) {
          this.lddataSource = res.data.data.list;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.analyze_page2 {
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
        .center {
          margin-bottom: 30px;
          h5 {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 30px;
          }
        }
      }
    }
  }
}
</style>
