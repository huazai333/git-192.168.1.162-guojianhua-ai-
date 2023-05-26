<template >
  <div class="detail_page">
    <h1 style="text-align:center;margin-bottom:40px;">{{task_name}}分析结果</h1>
    <div class="center">
      <div class="item1 item">
          <el-table :data="dataList" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="itime"
          label="同行位置(经纬度)"
        >
            <template slot-scope="scope">
              {{scope.row.lng+","+scope.row.lat}}
            </template>
        </el-table-column>
          
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
          prop="itime"
          label="同行时间"
          sortable
          :formatter="dataFormat"
        >
        </el-table-column>
        </el-table>
      </div>
    </div>
   
  </div>
</template>
 
<script>
export default {
  filters: {},
  data() {
    return {
        dataList:[],
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
    // 获取详情信息
    getInfo(item) {
      this.task_id = item.task_id;
      this.task_name = item.task_name; 
      this.$http({
        url: "/hadoop/task/getResult?task_id=" + this.task_id,
        method: "get",
      }).then(({ data: res }) => {
          console.log(res)
          this.dataList = res.data.devList
      });
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
