<template>
  <el-card>
    <!-- table区域 -->
    <div>
      <el-table :data="list" style="width: 100%">
        <el-table-column
          prop="devPhone"
          label="手机号"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devImei" 
          label="IMEI"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devImsi"
          label="IMSI"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devMac"
          label="Mac"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="recordDate"
          label="时间"
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
      list: [],
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
    //获取列表数据
    getList() {
      this.$http({ url: "system/vespertine", method: "get" }).then((res) => {
        if (res.data.code == 0) {
          this.list = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    w(scope) {
      this.$http({
        url: "/system/crowddevice",
        params: {
          crowdId: scope.row.crowdId,
          type: 1,
        },
      }).then((res) => {
        this.flow = res.data.data.list;
        this.dialogVisible2 = true;
      });
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