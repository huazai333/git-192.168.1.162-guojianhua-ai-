<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-table
      :data="data.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
    >
      <el-table-column prop="name" label="应⽤名称" width="150" align="center">
      </el-table-column>
      <el-table-column
        prop="packageName"
        label="应⽤包名"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="classOne" label="⼀级分类" align="center">
      </el-table-column>
      <el-table-column prop="classTwo" label="⼆级分类" align="center">
      </el-table-column>
      <el-table-column
        prop="packageUpperStatusDesc"
        label="上架状态"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="userCnt" label="安装设备数" align="center">
      </el-table-column>
      <el-table-column
        prop="lastReportTime"
        label="最后活跃时间"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="uninstallTimes" label="卸载次数" align="center">
      </el-table-column>
      <el-table-column prop="statusCname" label="安装状态" align="center">
      </el-table-column>
      <el-table-column
        prop="firstInstallTime"
        label="最早安装时间"
        width="200"
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
        name: "",
      },
      data: [],
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
      this.dataForm.name = item.name;
      this.$http({
        url: "/kepler/v2/application?name=" + this.dataForm.name,
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
