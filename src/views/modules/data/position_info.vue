<template >
  <div class="detail_page">
    <h1 style="text-align:center;">{{task_name}}分析结果</h1>
    <div class="center">
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-cpu"></i>
          <span>设备列表</span>
        </div>
        <el-table
          :data="
            devList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
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
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="frequency"
            label="连接次数"
            sortable
          ></el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="time"
            label="连接时间"
          >
            <template slot-scope="scope">
              <div style="max-height: 80px; overflow-y: auto">
                <!-- .sort((old, New) => {
                      return New - old  ;
                    }) -->
                <div v-for="(item, index) in scope.row.time" :key="index">
                  {{ dataFormat(item) }}
                </div>
              </div>
            </template>
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
        </el-table>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="devList.length"
          :page-size="pageSize"
          @current-change="currentChange"
          @size-change="handleSizeChange"
          :page-sizes="[10]"
          :current-page="currentPage"
        >
        </el-pagination>
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

      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-cpu"></i>
          <span>热点列表</span>
        </div>
        <el-table
          :data="
            wifiResult.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="wifiName"
              label="热点名称"
            >
            </el-table-column>
          <el-table-column
              show-overflow-tooltip
              align="center"
              prop="wifiMac"
              label="Mac地址"
            >
            </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="wifiResult.length"
          :page-size="pageSize"
          @current-change="currentChange"
          @size-change="handleSizeChange"
          :page-sizes="[10]"
          :current-page="currentPage"
        >
        </el-pagination>
      </div>
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-cpu"></i>
          <span>基站列表</span>
        </div>
        <el-table
          :data="
            cellResult.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="cellId"
              label="基站ID"
            >
            </el-table-column>
          <el-table-column
              show-overflow-tooltip
              align="center"
              prop="locationAreaCode"
              label="位置区码"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="mobileCountryCode"
              label="移动设备国家代码"
            >
            </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="cellResult.length"
          :page-size="pageSize"
          @current-change="currentChange"
          @size-change="handleSizeChange"
          :page-sizes="[10]"
          :current-page="currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  filters: {},
  data() {
    return {
      task_id: "",
      devList: [],
      wifiResult: [],
      chartInstance: null,
      cellResult: [],
      detail: false,
      monthData: [],
      weekData: [],
      dayData: [],
      hourData: [],
      pageSize: 10,
      currentPage: 1,
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
    currentChange(e) {
      this.currentPage = e;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 获取详情信息
    getInfo(item) {
      this.task_id = item.task_id;
      this.task_name = item.task_name; 
      this.$http({
        url: "/hadoop/task/getResult?task_id=" + this.task_id,
        method: "get",
      }).then(({ data: res }) => {
        this.devList = res.data.deviceList;
        this.wifiResult = res.data.wifiResult;
        this.cellResult = res.data.cellResult;
      });
    },
    // 时间戳转换时间
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
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
