<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-table
      :data="
        wifiList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column
        prop="geoHash"
        label="geoHash"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="wifiMac" label="wifiMac" align="center">
      </el-table-column>
      <el-table-column prop="ssid" label="WiFi名称" align="center">
      </el-table-column>
      <el-table-column
        prop="coordinate"
        label="经纬度"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="connectCount"
        label="近三个⽉连接次数"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="lastTime"
        label="最近连接时间"
        width="180"
        align="center"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="wifiList.length"
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
import { Message } from "element-ui";
export default {
  data() {
    return {
      dataForm: {
        lng: "",
        lat: "",
      },
      data: [],
      wifiList: [],
      pageSize: 10,
      currentPage: 1,
    };
  },
  mounted() {
    this.getDeviceInfo(this.$route.query);
  },
  activated() {
    this.getDeviceInfo(this.$route.query);
  },
  methods: {
    currentChange(e) {
      this.currentPage = e;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },

    getDeviceInfo(item) {
      this.dataForm.lng = item.lng;
      this.dataForm.lat = item.lat;
      this.$http({
        url:
          "/kepler/v2/geo?lat=" +
          this.dataForm.lat +
          "&lng=" +
          this.dataForm.lng,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          Message.warning(res.msg);
        }
        this.data = JSON.parse(res.data);
        this.wifiList = this.data.wifiList;
      });
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
