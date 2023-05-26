<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-table :data="dataList" v-loading="loading">
        <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50"
      ></el-table-column>
      <!-- <el-table-column
        prop="deviceKey"
        label="关联Key"
        align="center"
        width="210"
      ></el-table-column> -->
      <el-table-column
        prop="platform"
        label="上报平台"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.platform === 'A'" size="small" type="warning"
            >安卓</el-tag
          >
          <el-tag v-else-if="scope.row.platform === 'I'" size="small" type="success"
            >IOS</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="model"
        label="上报机型"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="brandNew"
        label="设备品牌"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="osVersion"
        label="操作系统版本"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="timeZone"
        label="系统时区"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="language"
        label="系统语言码"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="lang"
        label="语言"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="langCountry"
        label="系统地区简称"
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
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      imei: "",
      mac: "",
      phone: "",
      imsi: "",
      oaid: "",
      idfa: "",
      dataList: [],
      loading: true,
    };
  },
  mounted() {
    this.getDeviceInfo(this.$route.query);
    
  },
  activated() {
    // 获取数据
    this.getDeviceInfo(this.$route.query);
    
  },
  methods: {
    // 获取列表
    getDeviceInfo(item) {
      this.imei = item.imei;
      this.mac = item.mac;
      this.phone = item.phone;
      this.imsi = item.imsi;
      this.oaid = item.oaid;
      this.idfa = item.idfa;
      this.loading = true;
      let data = [
        {
          type: 1,
          name: this.imei,
        },
        {
          type: 2,
          name: this.mac,
        },
        {
          type: 3,
          name: this.phone,
        },
        {
          type: 4,
          name: this.imsi,
        },
        {
          type: 5,
          name: this.oaid,
        },
        {
          type: 6,
          name: this.idfa,
        },
      ];
      
      


    this.$http({
        url: "/system/archive/device?mac="+this.mac+"&phone="+this.phone+"&imei="+this.imei+"&imsi="+this.imsi,
        method: "get",
      }).then(({ data: res }) => {
       if (res.code == 0) {
          this.dataList = res.data;
          this.loading = false;
          
          

        } else {
          this.$message({
            type: "warning",
            message: "暂无数据",
          });
        }
      })



    },
    // 跳转详情
    viewHandle(row) {
        let obj =row
        obj['searchPhone'] = this.phone;
        obj['searchImei'] = this.imei;
        obj['searchMac'] = this.mac;
        obj['searchImsi'] = this.imsi;
        
      this.$router.push({ name: "equipment-info", query: obj });
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
