<template >
  <div class="detail_page">
    <div class="center">
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-info"></i>
          <span>热点信息</span>
        </div>
        <div class="list">
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <span>wifiMac:</span>
                <i>
                  {{ wifiData.wifiMac }}
                </i>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-cpu"></i>
          <span>热点关系分析</span>
        </div>
        <el-table :data="tableList" style="width: 100%">
          
          <el-table-column label="设备信息" align="center">
              
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devPhone"
              label="手机号"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devImei"
              label="Imei"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devImsi"
              label="Imsi"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="devMac"
              label="Mac"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="connectDeviceFrequency"
            label="连接次数"
            sortable
          ></el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="connectDeviceTime"
            label="最近一次连接时间"
            :formatter="dataFormat"
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
    </div>

    <el-dialog
      title="连接规律"
      :visible.sync="detail"
      @open="open()"
      width="60%"
    >
      <div class="allecharts">
        <div id="monthEcharts" class="echarts"></div>
        <div id="weekEcharts" class="echarts"></div>
        <div id="dayEcharts" class="echarts"></div>
        <div id="hourEcharts" class="echarts"></div>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  filters: {},
  data() {
    return {
      task_id: "",
      tableList: [],
      wifiData: [],
      chartInstance: null,
      allData: null,
      detail: false,
      monthData: [],
      weekData: [],
      dayData: [],
      hourData: [],
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
    // 获取详情信息
    getInfo(item) {
      this.task_id = item.task_id;
      this.$http({
        url: "/hadoop/task/getResult?task_id=" + this.task_id,
        method: "get",
      }).then(({ data: res }) => {
        this.wifiData = res.data;
        this.tableList = res.data.children;
      });
    },
    // 时间戳转换时间
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
      let date = Math.max.apply(null, row.connectDeviceTime);
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
      console.log(item.row);
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
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        // },
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
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        // },
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
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        // },
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
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        // },
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
    width: 50%;
    height: 300px;
  }
}
</style>
