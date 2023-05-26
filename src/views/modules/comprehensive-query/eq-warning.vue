<template>
  <el-card>
    <!-- 查询区域 -->
    <div>
      <el-form :inline="true" :model="queryParameter" class="demo-form-inline"  :rules="formAddRules">
        <el-form-item label="预警设备号码:" prop="devicePhone">
          <el-input
            v-model="queryParameter.devicePhone"
            placeholder="预警设备号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="预警设备imei:" prop="deviceImei">
          <el-input
            v-model="queryParameter.deviceImei"
            placeholder="预警设备imei"
          ></el-input>
        </el-form-item>
        <el-form-item label="预警设备imsi:" prop="deviceImsi">
          <el-input
            v-model="queryParameter.deviceImsi"
            placeholder="预警设备imsi"
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
          prop="devicePhone"
          label="预警设备号码"
          width="180"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="deviceImei"
          label="预警设备imei"
          width="180"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="deviceImsi"
          label="预警设备imsi"
          width="180"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="deviceMac"
          label="预警设备mac"
          width="180"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devDescribe"
          label="布控设备描述"
          width="180"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="controlReason"
          label="布控原因"
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
      formAddRules: {
        devicePhone: [
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        deviceImei: [
          {
            pattern: /^[\d]{15}(?:[\d]{2})?$/,
            message: "请输入正确的IMEI号码",
            trigger: "blur",
          },
        ],
        deviceImsi: [
          {
            pattern: /^4600[0,1,2,3,5,6,7]\d{10}$/g,
            message: "请输入正确的IMSI号码",
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
        url: "/system/devicewarning/sel",
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