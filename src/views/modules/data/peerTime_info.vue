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
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>手机号码：</span>
                <i>
                  {{ analysis_device_info.devPhone }}
                </i>
              </div>
            </el-col>
            
            <!-- <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>设备key：</span>
                <i>
                  {{ analysis_device_info.devKey }}
                </i>
              </div>
            </el-col> -->
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>IMEI：</span>
                <i>
                  {{ analysis_device_info.devImei }}
                </i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>IMSI：</span>
                <i>
                  {{ analysis_device_info.devImsi }}
                </i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>Mac：</span>
                <i>
                  {{ analysis_device_info.devMac }}
                </i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>轨迹数量：</span>
                <i>
                  {{ space_time_result.trajectory_num }}
                </i>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-cpu"></i>
          <span>同行分析</span>
        </div>
        <el-table :data="accompany_device" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="device_info.devPhone"
              label="设备手机号"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="device_info.devImei"
              label="设备IMEI"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="device_info.devImsi"
              label="设备IMSI"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="device_info.devMac"
              label="设备Mac"
            >
            </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="accompany_num"
            label="同行次数"
            sortable
          >
            <template slot-scope="scope">
              {{ scope.row.accompany_num + "次" }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="proportion"
            label="同行占比"
            sortable
          >
            <template slot-scope="scope">
              {{scope.row.proportion*100+"%"}}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="trajectory"
            label="轨迹详情"
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
    <el-dialog title="轨迹详情" :visible.sync="detail" width="60%">
      <el-table
        :data="
          trajectory.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="wifimac"
          label="WiFiMac"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="位置经纬度"
        >
         <template slot-scope="scope">
              {{scope.row.lng+","+scope.row.lat}}
            </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="itime"
          label="时间"
          sortable
          :formatter="dataFormat"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="trajectory.length"
        :page-size="pageSize"
        @current-change="currentChange"
        @size-change="handleSizeChange"
        :page-sizes="[10]"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  filters: {},
  data() {
    return {
      task_id: "",
      space_time_result: "",
      analysis_device_info: [],
      accompany_device: [],
      detail: false,
      trajectory: [],
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
      console.log(val);
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
        this.space_time_result = res.data.space_time_result;
        this.analysis_device_info = res.data.space_time_result.analysis_device_info;
        this.accompany_device = res.data.space_time_result.accompany_device;
      });
    },
    getRule(item) {
      this.trajectory = item.row.trajectory;
    },
    // 时间戳转换时间
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
      let date = row.itime;
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
