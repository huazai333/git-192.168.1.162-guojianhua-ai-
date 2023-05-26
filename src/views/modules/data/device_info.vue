<template >
  <div class="detail_page">
    <h1 style="text-align:center;">{{task_name}}分析结果</h1>
    <div class="center">
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-info"></i>
          <span>设备信息</span>
        </div>
        <div class="list">
          <el-row :gutter="20">
            <!-- <el-col :span="8">
              <div class="grid-content bg-purple">
                <span>Key:</span>
                <i>
                  {{ allData.devKey }}
                </i>
              </div>
            </el-col> -->
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>手机号码:</span>
                <i>
                  {{ allData.devPhone }}
                </i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>Imei:</span>
                <i>
                  {{ allData.devImei }}
                </i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>Imsi:</span>
                <i>
                  {{ allData.devImsi }}
                </i>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>Mac:</span>
                <i>
                  {{ allData.devMac }}
                </i>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-cpu"></i>
          <span>已连接热点</span>
        </div>
        <el-table :data="wifiList" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="wifiMac"
            label="连接wifiMac"
          ></el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="connectWifiFrequency"
            label="连接次数"
            sortable
          ></el-table-column>

          <el-table-column
            show-overflow-tooltip 
            align="center"
            prop="connectWifiTime"
            label="最近一次连接时间"
            :formatter="dataFormat"
            sortable
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="connectDeviceTime"
            label="连接规律"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  type="text"
                  @click="
                    detail = true;
                    getRule(scope);
                  "
                  >查看</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-cpu"></i>
          <span>同热点设备</span>
        </div>
        <el-table :data="devList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.wifi" style="width: 100%; padding: 0">
                <el-table-column
                  label="公共热点"
                  show-overflow-tooltip
                  align="center"
                >
                  <el-table-column
                    prop="wifiMac"
                    label="热点Mac"
                    show-overflow-tooltip
                    align="center"
                  >
                  </el-table-column>

                  <el-table-column
                    prop="commonWifiNum"
                    label="连接次数"
                    show-overflow-tooltip
                    align="center"
                    sortable
                  >
                    <template slot-scope="scope">
                      {{ scope.row.connectTime.length }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="connectTime"
                    label="最近一次连接时间"
                    :formatter="dataFormat1"
                    show-overflow-tooltip
                    align="center"
                    sortable
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    prop="connectDeviceTime"
                    label="连接规律"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-button
                          type="text"
                          @click="
                            detail = true;
                            getRule(scope);
                          "
                          >查看</el-button
                        >
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>

          
            <!-- <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devKey"
              label="设备key"
            >
            </el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devPhone"
              label="设备手机号"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devImei"
              label="设备IMEI"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devImsi"
              label="设备IMSI"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devMac"
              label="设备Mac"
            >
            </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="commonWifiNum"
            label="公共热点数量"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-cpu"></i>
          <span>同IP设备</span>
        </div>
        <el-table :data="ipList" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          
            <!-- <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devKey"
              label="设备key"
            >
            </el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devPhone"
              label="设备手机号"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devImei"
              label="设备IMEI"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devImsi"
              label="设备IMSI"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devMac"
              label="设备Mac"
            >
            </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="commonIpNum"
            label="公共IP数量"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="ip"
            label="IP列表"
          >
            <template slot-scope="scope">
              <div style="max-height: 80px; overflow-y: auto">
                <!-- .sort((old, New) => {
                      return New - old  ;
                    }) -->
                <div v-for="(item, index) in scope.row.ip" :key="index">
                  {{ item }}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-cpu"></i>
          <span>同时空设备</span>
        </div>
        <el-table :data="stList" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          
            <!-- <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devKey"
              label="设备key"
            >
            </el-table-column> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devPhone"
              label="设备手机号"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devImei"
              label="设备IMEI"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devImsi"
              label="设备IMSI"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devMac"
              label="设备Mac"
            >
            </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="commonCoordinateNum"
            label="同时空次数"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="coordinateTime"
            label="详情"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  type="text"
                  @click="
                    detail1 = true;
                    getRule1(scope);
                  "
                  >查看</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      title="连接规律"
      :visible.sync="detail"
      @open="open()"
      width="70%"
    >
      <div class="allecharts">
        <div id="monthEcharts" class="echarts"></div>
        <div id="weekEcharts" class="echarts"></div>
        <div id="dayEcharts" class="echarts"></div>
        <div id="hourEcharts" class="echarts"></div>
      </div>
    </el-dialog>

    <el-dialog title="同时空详情" :visible.sync="detail1" width="60%">
      <el-table :data="trajectory" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="位置经纬度"
        >
         <template slot-scope="scope">
              {{scope.row.lon+","+scope.row.lat}}
            </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="time"
          label="时间"
        >
        <template slot-scope="scope">
              <div style="max-height: 80px; overflow-y: auto">
                <!-- .sort((old, New) => {
                      return New - old  ;
                    }) -->
                <div v-for="(item, index) in scope.row.time" :key="index">
                  {{ dataFormat3(item) }}
                </div>
              </div>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  filters: {},
  data() {
    return {
      task_id: "",
      allData: [],
      wifiList: [],
      devList: [],
      ipList: [],
      stList: [],
      trajectory:[],
      chartInstance: null,
      detail: false,
      detail1: false,
      monthData: [],
      weekData: [],
      dayData: [],
      hourData: [],
      task_name:"",
    };
  },
  computed: {},
  created() {
    this.getInfo(this.$route.query);
  },
  mounted() {
    this.getInfo(this.$route.query);
  },
  activated() {
    this.getInfo(this.$route.query);
  },
  methods: {
    getRule1(item) {
      this.trajectory = item.row.coordinateTime;
      console.log(this.trajectory)
    },
    // 获取详情信息
    getInfo(item) {
      this.task_id = item.task_id; 
      this.task_name = item.task_name; 
      this.$http({
        url: "/hadoop/task/getResult?task_id=" + this.task_id,
        method: "get",
      }).then(({ data: res }) => {
        this.allData = res.data;
        this.wifiList = res.data.wifiList;
        this.devList = res.data.devList;

        this.ipList = res.data.ipList;
        this.stList = res.data.stList;
      });
    },
    // 时间戳转换时间
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
      let date = row.connectWifiTime[0];
      if (date) {
        let time = new Date(date * 1000);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return (
          y +
          "-" +
          this.add0(m) +
          "-" +
          this.add0(d) +
          " " +
          this.add0(h) +
          ":" +
          this.add0(mm) +
          ":" +
          this.add0(s)
        );
      }
      return "";
    },
    dataFormat1: function (row) {
      let date = row.connectTime[0];
      if (date) {
        let time = new Date(date * 1000);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return (
          y +
          "-" +
          this.add0(m) +
          "-" +
          this.add0(d) +
          " " +
          this.add0(h) +
          ":" +
          this.add0(mm) +
          ":" +
          this.add0(s)
        );
      }
      return "";
    },
    dataFormat3: function (row) {
      let date = row;
      if (date) {
        let time = new Date(date * 1000);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return (
          y +
          "-" +
          this.add0(m) +
          "-" +
          this.add0(d) +
          " " +
          this.add0(h) +
          ":" +
          this.add0(mm) +
          ":" +
          this.add0(s)
        );
      }
      return "";
    },
    // 默认展开
    expandAll() {
      var els = document.getElementsByClassName("el-table__expand-icon"); //获取点击的箭头元素
      for (let i = 0; i < els.length; i++) {
        els[i].click();
      }
    },
    getRule(item) {
      this.monthData = item.row.divideByMonth;
      this.weekData = item.row.divideByWeek;
      this.dayData = item.row.divideByDay;
      this.hourData = item.row.divideByHour;
    },
    // 创建方法
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const monthChart = this.$echarts.init(
        document.getElementById("monthEcharts")
      );
      // 绘制图表
      const monthoption = {
        title: {
          text: "月连接规律",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "月：次数",
            type: "pie",
            radius: "70%",
            data: this.monthData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      monthChart.setOption(monthoption);

      // 基于准备好的dom，初始化echarts实例
      const weekChart = this.$echarts.init(
        document.getElementById("weekEcharts")
      );
      // 绘制图表
      const weekoption = {
        title: {
          text: "周连接规律",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "周：次数",
            type: "pie",
            radius: "70%",
            data: this.weekData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      weekChart.setOption(weekoption);

      // 基于准备好的dom，初始化echarts实例
      const dayChart = this.$echarts.init(
        document.getElementById("dayEcharts")
      );
      // 绘制图表
      const dayoption = {
        title: {
          text: "日连接规律",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "日：次数",
            type: "pie",
            radius: "70%",
            data: this.dayData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      dayChart.setOption(dayoption);

      // 基于准备好的dom，初始化echarts实例
      const hourChart = this.$echarts.init(
        document.getElementById("hourEcharts")
      );
      // 绘制图表
      const houroption = {
        title: {
          text: "时连接规律",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "时：次数",
            type: "pie",
            radius: "70%",
            data: this.hourData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      hourChart.setOption(houroption);
    },
    open() {
      this.$nextTick(() => {
        //  执行echarts方法
        this.initEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.detail_page {
  background: #fff;
  padding: 40px;
  .center {
    width: 100%;
    margin: 0 auto;
    .title {
      text-align: center;
      h1 {
        font-size: 30px;
        font-weight: bold;
        margin-top: 20px;
      }
    }
    .item {
      .tit {
        border-bottom: 2px solid #333;
        margin-top: 40px;
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        margin-bottom: 30px;
        i {
          color: #333;
          font-size: 30px;
        }
        span {
          font-size: 20px;
          font-weight: bold;
          line-height: 1;
        }
      }
      .list {
        padding: 0 30px;
      }
    }
    .item1 {
      .list {
        .grid-content {
          font-size: 16px;
          line-height: 30px;
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
}
.allecharts {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .echarts {
    width: 40%;
    height: 300px;
  }
}
.el-table__cell,
.el-table__expanded-cell {
  padding: 0 !important;
}
</style>
