<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-table
      :data="data.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
    >
      <el-table-column prop="source" label="上报来源" align="center">
        </el-table-column>
        <el-table-column prop="ssid" label="WiFi名称" align="center">
        </el-table-column>
        <el-table-column
          prop="wifiMac"
          label="wifiMac"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="location"
          label="WiFi经纬度"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          show-overflow-tooltip
          label="WiFi位置信息"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="phone" label="phone" align="center">
        </el-table-column>
        <el-table-column prop="deviceModel" label="设备型号" align="center">
        </el-table-column>

        <el-table-column prop="deviceBrand" label="设备品牌" align="center">
        </el-table-column>
        <el-table-column
          prop="workAddress"
          show-overflow-tooltip
          label="⼯作地"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="homeAddress"
          show-overflow-tooltip
          label="居住地"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="connectTime"
          label="连接时间"
          width="155"
          align="center"
        >
        </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.length"
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
        ip: "",
        startDate:'',
        endDate:'',
      },
      data: [],
      pageSize:10,
        currentPage:1,
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
        this.dataForm.ip = item.ip;
      this.dataForm.startDate = item.start;
      this.dataForm.endDate = item.end;
      this.$http({
        url:
          "/kepler/v2/ipList?ip=" +
          this.dataForm.ip +
          "&startTime=" +
          this.dataForm.startDate +
          "&endTime=" +
          this.dataForm.endDate,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          //   return;
          Message.warning(res.msg);
        }
        //console.log(JSON.parse(res.data).deviceFeatureInfo);
        this.data = JSON.parse(res.data);
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
