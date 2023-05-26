<template>
  <el-card>
    <!-- 查询区域 -->
    <div>
      <el-form
        :inline="true"
        :model="queryParameter"
        class="demo-form-inline"
        :rules="formAddRules"
      >
        <el-form-item label="热点名称:">
          <el-input
            v-model="queryParameter.ssid"
            placeholder="热点名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="热点mac:" prop="mac">
          <el-input
            v-model="queryParameter.mac"
            placeholder="热点mac"
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
          prop="ssid"
          label="热点名称"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="mac"
          label="热点mac"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="ssidType"
          label="预警类型"
          align="center"
          width="210"
        >
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.ssidType === 1">扫描连接报警</span>
              <span v-else>异常设备报警</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="controlReason"
          label="布控原因"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="date"
          label="预警时间"
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
        ssid: null,
        mac: null,
      }, 
      //查询参数
      total: 0, //总页数
      queryInfo: {
        page: 1,
        limit: 10,
      },
      formAddRules: {
        mac: [
          {
            pattern: /^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$/,
            message: "请输入正确的MAC号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http({
        url: "/system/wifiWarning/sel",
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
        ssid: this.queryParameter.ssid,
        mac: this.queryParameter.mac,
        size: this.queryInfo.page,
        limit: this.queryInfo.limit,
      };
      const { data: res } = await this.$http("/system/wifiWarning/sel", {
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