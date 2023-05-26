<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-table :data="dataList" style="width: 100%" v-loading="dataListLoading">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="wifi"
        label="WIFMAC"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="ssid"
        label="热点名称"
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
        getDataListURL: "/system/es/wifi",
        activatedIsNeed: false,
        createdIsNeed: false,
        getDataListIsPage: true, // 数据列表接口，是否需要分页？
      },
      page: 0, // 当前页码
      dataForm: {
        wifiMac: "",
        start: "",
        end: "",
      },
      dataListLoading: true,
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
    location: function (row) {
      let location = row.location;
      return location.lon + "," + location.lat;
    },
    get(item) {
      this.dataForm.wifiMac = item.mac;
      this.dataForm.start = item.start;
      this.dataForm.end = item.end;
      this.page = 0;
    },
    // 跳转详情
    viewHandle(row) {
      this.$router.push({ name: "wifi-index-info", query: row });
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
