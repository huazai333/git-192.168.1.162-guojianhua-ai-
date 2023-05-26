<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-table :data="dataList" v-loading="dataListLoading">
      <el-table-column type="index" align="center" label="序号" width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="packages"
        label="包名"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="appVer"
        label="应用版本"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="suspectedType"
        label="应用分类"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          
            {{scope.row.classOne+"-"+scope.row.classTwo}}
           
        </template>
      </el-table-column>
      <el-table-column
        prop="suspectedType"
        label="可疑类型"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if=" scope.row.suspectedType != '' " size="small" type="danger"  effect="dark"
            >
            {{scope.row.suspectedType}}
            </el-tag
          >
        </template>
      </el-table-column>
     <!-- <el-table-column
        prop="status"
        label="状态"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '0'" size="small" type="warning"
            >卸载</el-tag
          >
          <el-tag
            v-else-if="scope.row.status === '1'"
            size="small"
            type="success"
            >保留</el-tag
          >
          <el-tag
            v-else-if="scope.row.status === '2'"
            size="small"
            type="danger"
            >新安装</el-tag
          >
        </template>
      </el-table-column>-->
      <el-table-column
        prop="installType"
        label="应用类型"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.installType === '0'"
            size="small"
            type="warning"
            >普通应用</el-tag
          >
          <el-tag
            v-else-if="scope.row.installType === '1'"
            size="small"
            type="success"
            >系统应用</el-tag
          >
          <el-tag
            v-else-if="scope.row.installType === '2'"
            size="small"
            type="danger"
            >系统应用后来升级过</el-tag
          >
          <el-tag
            v-else-if="scope.row.installType === '3'"
            size="small"
            type="warning"
            >预装应用</el-tag
          >
          <el-tag v-else size="small" type="warning">未知</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="uninstallTimes"
        label="卸载次数"
        show-overflow-tooltip
        align="center"
        width="100"
        sortable
      >
      </el-table-column> -->
      <!--<el-table-column
        prop="firstReportTimeTruly"
        label="首次安装时间"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.firstReportTimeTruly
              | formatterDate(scope.row.firstReportTimeTruly)
          }}
        </template>
      </el-table-column>-->
      <!-- <el-table-column
        prop="firstReportTime"
        label="最后安装时间"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.firstReportTime | formatterDate(scope.row.firstReportTime)
          }}
        </template>
      </el-table-column> -->




      <el-table-column
        prop="firstReportTime"
        label="首次次上报时间"
        show-overflow-tooltip
        align="center"
        sortable
      >
        <template slot-scope="scope">
          {{
            scope.row.firstReportTime | formatterDate(scope.row.firstReportTime)
          }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"
      :page-sizes="[10, 20, 30]"
      :current-page="currentPage"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
export default {
  filters: {
    formatterDate(date) {
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
          (m < 10 ? "0" + m : m) +
          "-" +
          (d < 10 ? "0" + d : d) +
          " " +
          (h < 10 ? "0" + h : h) +
          ":" +
          (mm < 10 ? "0" + mm : mm) +
          ":" +
          (s < 10 ? "0" + s : s)
        );
      }
      return "";
    },
  },
  mixins: [mixinViewModule],

  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: "/system/app/es",
        activatedIsNeed: false,
        createdIsNeed: false,
        getDataListIsPage: true, // 数据列表接口，是否需要分页？
      },
      page:0,
      pageSize: 10,
      currentPage: 1,
      dataForm: {
        packages: "",
        name: "",
      },
      dataList: [],
      dataListLoading:true,
    };
  },
  mounted() {
    //this.get(this.$route.query);
    //this.query();
  },
  activated() {
    // 获取数据
    this.get(this.$route.query);
    this.query();
  },
  methods: {
    currentChange(e) {
      this.currentPage = e;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    get(item) {
      this.dataForm.packages = item.packages;
      this.dataForm.name = item.name;
      //   this.page = item.page
      this.page = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-table {
  .student-img {
    vertical-align: top;
    width: 33px;
    height: 40px;
  }
}
</style>
