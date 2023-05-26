<template>
  <el-card>
    <!-- table区域 -->
    <div>
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>

        <el-table-column
          prop="name"
          label="区域名称"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="区域内设备总数"
          prop="num"
          show-overflow-tooltip
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="上报时间"
          show-overflow-tooltip
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column label="区域详情" show-overflow-tooltip align="center">
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

    <el-dialog title="区域详情" :visible.sync="detail" width="60%">
      <el-table :data="trajectory.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column
          label="设备信息"
          show-overflow-tooltip
          align="center"
        >
          
          <el-table-column
            prop="phone"
            label="手机号码"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="imei"
            label="IMEI"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="imsi"
            label="IMSI"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="mac"
            label="Mac"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
           <!-- <el-table-column
            prop="key"
            label="key"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column> -->
        </el-table-column>
         <el-table-column
            prop="num"
            label="出现次数"
            show-overflow-tooltip
            align="center"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="itime"
            label="最近一次出现时间"
            show-overflow-tooltip
            align="center"
            :formatter="dataFormat"
            sortable
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
        :page-sizes="[10,50,100]"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      detail: false,
      trajectory: [],
      pageSize: 10,
      currentPage: 1,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    currentChange(e) {
      this.currentPage = e;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    //获取列表数据
    getList() {
      this.$http({ url: "system/areaHover/all", method: "get" }).then((res) => {
        if (res.data.code == 0) {
        //   console.log(res.data);
          this.list = res.data.data;
        }
      });
    },
    getRule(item) {
      this.trajectory = item.row.info;
    },
    // 时间戳转换时间
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
      let date = Math.max.apply(null, row.itime);
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

<style lang="scss">
.el-table__expanded-cell[class*="cell"] {
  padding: 10px !important;
}
</style>