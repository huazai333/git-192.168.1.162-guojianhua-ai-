<template>
  <el-card>
    <!-- 查询区域 -->
    <div>
      <el-form :inline="true" :model="queryParameter" class="demo-form-inline">
        <el-form-item label="设备号码:">
          <el-input
            v-model="queryParameter.devicePhone"
            placeholder="设备号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备imei:">
          <el-input
            v-model="queryParameter.deviceImei"
            placeholder="设备imei"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备imsi:">
          <el-input
            v-model="queryParameter.deviceImsi"
            placeholder="设备imsi"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchQuery()">查询</el-button>
          <el-button type="warning" @click="resetForms()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table区域 -->
    <div>
      <el-table :data="dataSource" style="width: 100%">
        <el-table-column
          prop="devPhone"
          label="设备号码"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devImei"
          label="设备imei"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devImsi"
          label="设备imsi"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devMac"
          label="设备mac"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="wifiMac"
          label="热点mac"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="connectNum"
          label="连接次数"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="dayProportion"
          label="白天频率"
          show-overflow-tooltip
          align="center"
        >
        <template slot-scope="scope">
            <div>
                <span>{{scope.row.dayProportion*100}}%</span>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="nightProportion"
          label="夜间频率"
          show-overflow-tooltip
          align="center"
        >
        <template slot-scope="scope">
            <div>
                <span>{{scope.row.nightProportion*100}}%</span>
            </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="lng"
          label="经度"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
         <el-table-column
          prop="lat"
          label="纬度"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[5, 8, 10]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [], //表格数据
      queryParameter: {
        devicePhone: null,
        deviceImei: null,
        deviceImsi: null,
      }, //查询参数
      total: 0, //总页数
      queryInfo: {
        page: 1,
        limit: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http({
        url: "/system/keyfoothold",
        params: {
          ...this.queryInfo,
        },
      }).then((res) => {
        // if(res.code == 0){
        this.dataSource = res.data.data.list;
        this.total = res.data.data.total;
        // }
      });
    },
    async searchQuery() {
      let params = {
        devicePhone: this.queryParameter.devicePhone,
        deviceImei: this.queryParameter.deviceImei,
        deviceImsi: this.queryParameter.deviceImsi,
        size: this.queryInfo.page,
        limit: this.queryInfo.limit,
      };
      const { data: res } = await this.$http("/system/devicewarning/sel", {
        params: params,
      });
      this.dataSource = res.data.list;
    },
    resetForms() {
      (this.queryParameter = {}), this.getList();
    },
    handleSizeChange(size) {
      this.queryInfo.page = 1;
      this.queryInfo.limit = size;
      this.getList();
    },
    handleCurrentChange(num) {
      this.queryInfo.page = num;
      this.getList();
    },
  },
};
</script>