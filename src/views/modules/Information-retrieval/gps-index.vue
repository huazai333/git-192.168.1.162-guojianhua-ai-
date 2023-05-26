<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-table :data="dataList">
      <el-table-column
        prop="country"
        type="country"
        label="国家"
        width="100"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="province"
        label="省"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="town" 
        type="address"
        label="详细信息"
        width="100"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="lng"
        label="经度"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="lat"
        label="纬度"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="itime"
        label="上报时间"
        :formatter="dataFormat"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataList.length"
      :page-size="pageSize"
      @current-change="currentChange"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 30]"
      :current-page="currentPage"
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
        getDataListURL: "/system/es/area",
        activatedIsNeed: false,
        createdIsNeed: false,
        getDataListIsPage: true, // 数据列表接口，是否需要分页？
      },
      pageSize: 10,
      currentPage: 1,
      dataForm: {
        lon: "",
        lat: "",
        start: "",
        end: "",
      },
      dataList: [],
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
    get(item) {
      this.dataForm.lon = item.lon;
      this.dataForm.lat = item.lat;
      this.dataForm.start = item.start;
      this.dataForm.end = item.end;
      //   this.page = item.page
    },
    // 跳转详情
    viewHandle(row) {
      this.$router.push({ name: "gps-index-info", query: row });
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
