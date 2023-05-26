<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-table :data="dataList" style="width: 100%" v-loading="dataListLoading">
        <el-table-column
        type="index"
        align="center"
        label="序号"
        width="100">
        </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="cellId"
        label="基站id"
        width="200"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="locationAreaCode"
        label="位置区码"
        width="200"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="mobileCountryCode"
        label="移动设备代码"
        width="200"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="mobileNetworkCode"
        label="移动网络号码"
        width="200"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="位置信息"
        prop="address"
      >
      
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="location"
        label="经纬度"
        :formatter="location"
      >
      </el-table-column>
      
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="day"
        label="上报时间"
        sortable
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="viewHandle(scope.row)"
              >档案信息</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      background
      :current-page="page"
      :page-size="limit"
      :total="total"
      layout="total,  prev, pager, next"
      @current-change="pageCurrentChangeHandle"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";

export default {
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: "/system/es/cell",
        activatedIsNeed: false,
        createdIsNeed: false,
        getDataListIsPage: true, // 数据列表接口，是否需要分页？
      },
      page: 0, // 当前页码
      dataForm: {
        cellId: "",
        start: "",
        end: "",
      },
      dataList: [],
      dataListLoading:true,
    };
  },
  mounted() {
    this.get(this.$route.query);
    this.query();
  },
  activated() {
    // 获取数据
    this.get(this.$route.query);
    this.query();
  },
  methods: {
   
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
    location:function(row){
        let location = row.location;
        return location.lon +","+ location.lat
    },
    get(item) {
      this.dataForm.cellId = item.cellId;
      this.dataForm.start = item.start;
      this.dataForm.end = item.end;
    this.page = 0;
    },
     // 跳转详情
    viewHandle(row) { 
      this.$router.push({ name: "base-station-info", query: row });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-table {
  .student-img {
    vertical-align: top;
    width: 53px;
    height: 70px;
  }
}
</style>
