<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="detail_page">
      <div class="title">
        <h1>档案信息</h1>
        <div class="print">
          <i class="el-icon-printer"></i>
          导出
        </div>
      </div>
      <div class="center">
        <div class="item1 item">
          <div class="list">
            <div class="pic">
              <el-image
                style="width: 240px; height: 240px"
                :src="url"
                fit="contain"
              ></el-image>
            </div>
            <div class="table">
              <ul>
                <li>
                  <i>设备型号：</i>
                  <span>{{ deviceFeatureInfo.deviceModel }}</span>
                </li>
                <li>
                  <i>手机号码：</i>
                  <span>{{ deviceFeatureInfo.phone }}</span>
                </li>
                <li>
                  <i>品牌：</i>
                  <span>{{ deviceFeatureInfo.brand }}</span>
                </li>
                <li>
                  <i>系统版本：</i>
                  <span>{{ deviceFeatureInfo.version }}</span>
                </li>
                <!-- <li>
                  <i>是否变换mac：</i>
                  <span>{{ deviceFeatureInfo.macChange }}</span>
                </li> -->
                <li>
                  <i>MAC：</i>
                  <span>{{ deviceFeatureInfo.mac }}</span>
                </li>
                <li>
                  <i>imei：</i>
                  <span>{{ deviceFeatureInfo.imei }}</span>
                </li>
                <li>
                  <i>imsi：</i>
                  <span>{{ deviceFeatureInfo.imsi }}</span>
                </li>
                <!-- <li>
                  <i>互联网提供商：</i>
                  <span>{{ deviceFeatureInfo.isp }}</span>
                </li> -->
                <!-- <li>
                  <i>语言：</i>
                  <span>{{ deviceFeatureInfo.language }}</span>
                </li> -->
                <li>
                  <i>oaid：</i>
                  <span>{{ deviceFeatureInfo.oaid }}</span>
                </li>
                <!-- <li>
                  <i>归属地：</i>
                  <span>{{ deviceFeatureInfo.qCellCore }}</span>
                </li> -->
                <!-- <li>
                  <i>终端类型：</i>
                  <span>{{ deviceFeatureInfo.terminalType }}</span>
                </li> -->
                <!-- <li>
                  <i>时区：</i>
                  <span>{{ deviceFeatureInfo.timeZone }}</span>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="tit">
            <span>最新轨迹</span>
          </div>

          <div class="list">
            <ul>
              <el-row :gutter="10">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>上报时间：</span>
                    <i>{{ latestTraceLbsInfo.itime }}</i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>ip地址：</span>
                    <i>{{ latestTraceLbsInfo.ip }}</i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>国家：</span>
                    <i>{{ latestTraceLbsInfo.country }}</i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>详细地址：</span>
                    <i>{{ latestTraceLbsInfo.address }}</i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>工作地：</span>
                    <i>{{ latestTraceLbsInfo.poiType }}</i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>WIFI名称：</span>
                    <i>{{ latestTraceLbsInfo.ssid }}</i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>WIFIMac：</span>
                    <i>{{ latestTraceLbsInfo.wifi }}</i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>轨迹来源：</span>
                    <i>{{ latestTraceLbsInfo.coordinateSource }}</i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>经纬度：</span>
                    <i>{{ latestTraceLbsInfo.coordinate }}</i>
                  </div>
                </el-col>
              </el-row>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="tit">
            <span>地址信息</span>
          </div>
          <div class="list">
            <ul>
              <el-row :gutter="10">
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <span>家庭类型：</span>
                    <i>{{ addressInfo.homePoiType }}</i>
                    <br />
                    <span>家庭地址：</span>
                    <i>{{ addressInfo.homeAddress }}</i>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <span>工作类型：</span>
                    <i>{{ addressInfo.workPoiType }}</i>
                    <br />
                    <span>⼯作地址：</span>
                    <i>{{ addressInfo.workAddress }}</i>
                  </div>
                </el-col>
              </el-row>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="tit">
            <span>设备信息</span>
          </div>
          <el-table
            :data="
              historyDeviceList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sourceCertainty"
              label="相关度"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="model"
              label="设备型号"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="brand"
              label="品牌"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="imei"
              label="imei"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="imsi"
              label="imsi"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="mac"
              label="mac"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="oaid"
              label="oaid"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="startTime"
              label="开始关联时间"
              align="center"
              sortable
            >
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="historyDeviceList.length"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :page-sizes="[5, 20, 30]"
            :current-page="currentPage"
          >
          </el-pagination>
        </div>
        <div class="item">
          <div class="tit">
            <span>换机换卡详情</span>
          </div>
          <el-table
            :data="
              changeRecordDetailList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="phone"
              label="手机号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="model"
              label="设备型号"
              align="center"
            >
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="brand"
              label="品牌"
              align="center"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="osVersion"
              label="系统版本"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="imei"
              label="imei"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="imsi"
              label="imsi"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="mac"
              label="mac"
              align="center"
            >
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="qCellCore"
              label="归属地"
              align="center"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="isp"
              label="运营商"
              align="center"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="language"
              label="语⾔"
              align="center"
            >
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="startTime"
              label="开始关联时间"
              align="center"
              sortable
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="endTime"
              label="结束关联时间"
              align="center"
              sortable
            >
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="changeRecordDetailList.length"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :page-sizes="[5, 20, 30]"
            :current-page="currentPage"
          >
          </el-pagination>
        </div>
        <div class="item">
          <div class="tit">
            <span>历史IP查询</span>
          </div>
          <el-table
            :data="
              ipList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            "
            style="width: 100%"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="ip" label="ip" align="center">
            </el-table-column>
            <el-table-column prop="wifiMac" label="wifiMac" align="center">
            </el-table-column>
            <el-table-column prop="ssid" label="WiFi名称" align="center">
            </el-table-column>
            <el-table-column prop="connectType" label="连接类型" align="center">
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.connectType === 'S'"
                  size="small"
                  type="warning"
                  >扫描</el-tag
                >
                <el-tag
                  v-else-if="scope.row.connectType === 'C'"
                  size="small"
                  type="success"
                  >连接</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column prop="source" label="IP来源" align="center">
            </el-table-column>
            <el-table-column prop="location" label="经纬度" align="center">
            </el-table-column>

            <el-table-column
              prop="address"
              label="详细位置信息"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="itime"
              label="上报时间"
              align="center"
            >
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="ipList.length"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :page-sizes="[5, 20, 30]"
            :current-page="currentPage"
          >
          </el-pagination>
        </div>
        <div class="item">
          <div class="tit">
            <span>应用查询</span>
          </div>
          <el-table
            :data="
              appList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name"
              label="应⽤名称"
              width="150"
              align="center"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="appVer"
              label="应⽤版本"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="clsOne" label="应⽤分类" align="center">
            </el-table-column>
            <el-table-column
              prop="firstReportTimeTruly"
              label="⾸次安装时间"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="firstReportTime"
              label="末次安装时间"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="lastReportTime"
              label="最后活跃时间"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="uninstallTimes"
              label="卸载次数"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="statusCname" label="安装状态" align="center">
            </el-table-column>
            <el-table-column
              prop="isSystemApp"
              label="是否系统应⽤"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="isSmallApp"
              label="是否⼩众应⽤"
              align="center"
            >
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="appList.length"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :page-sizes="[5, 20, 30]"
            :current-page="currentPage"
          >
          </el-pagination>
        </div>
        <div class="item">
          <div class="tit">
            <span>轨迹查询</span>
          </div>
          <el-table
            :data="
              traceList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="时间"
              width="150"
              show-overflow-tooltip
              sortable
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column prop="longitude" label="经纬度" align="center">
              <template slot-scope="scope">
                {{ scope.row.longitude + "," + scope.row.latitude }}
              </template>
            </el-table-column>

            <el-table-column
              prop="wifi"
              label="wifi"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="ip"
              label="ip"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column
            ><el-table-column
              prop="coordinateSource"
              label="数据来源"
              align="center"
            >
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="traceList.length"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :page-sizes="[5, 20, 30]"
            :current-page="currentPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      dataForm: {
        name: "",
        type: "",
      },
      url: require("../../../assets/img/phone.jpg"),
      pageSize: 5,
      currentPage: 1,
      start: "",
      end: "",
      data: [],
      deviceFeatureInfo: "",
      addressInfo: "",
      latestTraceLbsInfo: "",
      historyDeviceList: [],
      changeRecordDetailList: [],
      ipList: [],
      appList: [],
      traceList: [],
    };
  },
  computed: {},
  mounted() {
/*    this.baseInfo(this.$route.query);
    this.deviceInfo(this.$route.query);
    this.historyIp(this.$route.query);
    this.appInfo(this.$route.query);
    this.trace(this.$route.query);*/
  },
  activated() {
    this.baseInfo(this.$route.query);
    this.deviceInfo(this.$route.query);
    this.historyIp(this.$route.query);
    this.appInfo(this.$route.query);
    this.trace(this.$route.query);
  },
  methods: {
    currentChange(e) {
      this.currentPage = e;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    //   获取基本信息
    baseInfo(item) {
      this.dataForm.type = item.type;
      this.dataForm.name = item.key;
      this.start = item.start;
      this.end = item.end;

      this.$http({
        url:
          "/kepler/v2/baseInfo?keyType=" +
          this.dataForm.type +
          "&key=" +
          this.dataForm.name,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          Message.warning(res.msg);
        }
        this.data = JSON.parse(res.data);
        this.deviceFeatureInfo = this.data.deviceFeatureInfo;
        this.addressInfo = this.data.addressInfo;
        this.latestTraceLbsInfo = this.data.latestTraceLbsInfo;
        console.log(this.data);
      });
    },
    // 获取设备信息
    deviceInfo(item) {
      this.dataForm.type = item.type;
      this.dataForm.name = item.key;

      this.$http({
        url:
          "/kepler/v2/deviceInfo?keyType=" +
          this.dataForm.type +
          "&key=" +
          this.dataForm.name,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          Message.warning(res.msg);
        }
        this.historyDeviceList = JSON.parse(res.data).historyDeviceList;
        this.changeRecordDetailList = JSON.parse(
          res.data
        ).changeRecordDetailList;
        console.log(JSON.parse(res.data));
      });
    },
    //   获取历史IP
    historyIp(item) {
      this.dataForm.type = item.type;
      this.dataForm.name = item.key;
      this.start = item.start;
      this.end = item.end;

      this.$http({
        url:
          "/kepler/v2/historyIp?keyType=" +
          this.dataForm.type +
          "&key=" +
          this.dataForm.name +
          "&start=" +
          this.start +
          "&end=" +
          this.end,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          Message.warning(res.msg);
        }
        console.log(JSON.parse(res.data));
        this.ipList = JSON.parse(res.data);
      });
    },
    // 获取设备app
    appInfo(item) {
      this.dataForm.type = item.type;
      this.dataForm.name = item.key;

      this.$http({
        url:
          "/kepler/v2/app?keyType=" +
          this.dataForm.type +
          "&key=" +
          this.dataForm.name,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          Message.warning(res.msg);
        }
        console.log(JSON.parse(res.data));
        this.appList = JSON.parse(res.data);
      });
    },

    //   获取历史轨迹
    trace(item) {
      this.dataForm.type = item.type;
      this.dataForm.name = item.key;
      this.start = item.start;
      this.end = item.end;

      this.$http({
        url:
          "/kepler/v2/trace?keyType=" +
          this.dataForm.type +
          "&key=" +
          this.dataForm.name +
          "&start=" +
          this.start +
          "&end=" +
          this.end,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          Message.warning(res.msg);
        }
        console.log(JSON.parse(res.data));
        this.traceList = JSON.parse(res.data);
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.detail_page {
  background: #fff;
  padding: 40px;
  .title {
    text-align: center;
    position: relative;
    width: 70%;
    margin: 0 auto;
    h1 {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    .print {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 18px;
      i {
        font-size: 24px;
        color: #333;
      }
    }
  }
  .center {
    width: 70%;
    margin: 0 auto;
    border: 2px solid #333;
    .item {
      min-height: 240px;
      .tit {
        border-top: 2px solid #333;
        display: flex;
        align-items: center;
        i {
          color: #333;
          font-size: 30px;
        }
        span {
          font-size: 20px;
          font-weight: bold;
          line-height: 1;
          margin: 10px;
        }
      }
      .list {
        padding: 0 30px;
        > ul {
          margin-top: 30px;
          .grid-content {
            font-size: 16px;
            line-height: 28px;
            span {
              color: #333;
              font-weight: bold;
            }
            i {
              color: #666;
            }
          }
        }
      }
    }
    .item1 {
      height: auto;
      .list {
        display: flex;
        margin-bottom: 0;
        padding: 0px;
        align-items: center;
        .pic {
          width: 240px;
        }
        .table {
          flex: 1;
          ul {
            display: flex;
            flex-wrap: wrap;
            border: 1px solid #333;
            border-bottom: 0 solid #000;
            border-top: 0 solid #000;
            border-left: 0 solid #dedede;
            border-right: 0 solid #dedede;
            li {
              width: 50%;
              display: flex;
              line-height: 60px;
              border-bottom: 1px solid #333;
              &:nth-last-child(1),
              &:nth-last-child(2) {
                border-bottom: 0 solid #000;
              }
              i {
                width: 30%;
                display: block;
                text-align: center;
                border-right: 1px solid #333;
                border-left: 1px solid #333;
                font-size: 16px;
                font-weight: bold;
              }
              span {
                flex: 1;
                display: block;
                text-align: center;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
