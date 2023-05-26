<template >
  <div class="detail_page">
    <h1 style="text-align:center;margin-bottom:40px">{{task_name}}分析结果</h1>
    <el-table
      :data="
        tableList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" align="center" width="50">
      </el-table-column>
      <!-- <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.record" style="width: 100%" label="">
            <el-table-column
              prop="name"
              label="出现地点"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="num"
              label="出现次数"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="times"
              label="具体时间"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <div style="max-height: 100px; overflow-y: auto">
                  <div
                    v-for="(item, index) in scope.row.times.sort((old, New) => {
                      return New - old  ;
                    })"
                    :key="index"
                  >
                    {{ dataFormat(item) }}
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="phone"
        label="手机号"
      ></el-table-column>
      <!-- <el-table-column
        show-overflow-tooltip
        align="center"
        prop="key"
        label="key"
      >
      </el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="imei"
        label="Imei"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="imsi"
        label="Imsi"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="mac"
        label="Mac"
      >
      </el-table-column>
      <el-table-column
        prop="trajectory"
        label="碰撞详情"
        show-overflow-tooltip
        align="center"
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
      :total="tableList.length"
      :page-size="pageSize"
      @current-change="currentChange"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 30]"
      :current-page="currentPage"
    >
    </el-pagination>

    <el-dialog title="碰撞详情" :visible.sync="detail" width="60%">
      <el-table :data="trajectory" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>

        <el-table-column
              prop="name"
              label="出现地点"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="num"
              label="出现次数"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="times"
              label="具体时间"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <div style="max-height: 50px; overflow-y: auto">
                    <!-- .sort((old, New) => {
                      return New - old  ;
                    }) -->
                  <div v-for="(item, index) in scope.row.times" :key="index">
                    {{ dataFormat(item) }}
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
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      detail: false,
      trajectory: [],
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
    // 获取详情信息
    getInfo(item) {
      this.task_id = item.task_id;
      this.task_name = item.task_name; 
      this.$http({
        url: "/hadoop/task/getResult?task_id=" + this.task_id,
        method: "get",
      }).then(({ data: res }) => {
        this.tableList = res.data.result;
      });
    },
    getRule(item) {
      this.trajectory = item.row.record;
    },
  },
};
</script>
<style lang="scss" >
.detail_page {
  background: #fff;
  padding: 40px;
  .el-table__expanded-cell[class*="cell"] {
    padding: 10px !important;
  }
}
</style>
