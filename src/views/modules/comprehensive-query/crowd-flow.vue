<template>
  <el-card>
    
    <!-- table区域 -->
    <div>
      <el-table :data="dataSource" style="width: 100%">
        <el-table-column prop="aresName" label="预警区域名称" width="180" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column label="流出区域设备" show-overflow-tooltip align="center">
          <template slot-scope="scope">
              <el-link type="primary" @click="Inflow(scope)">{{ scope.row.crowdInflowCount }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="流入区域设备" show-overflow-tooltip align="center">
          <template slot-scope="scope">
             <el-link type="primary" @click="floww(scope)">{{ scope.row.crowdOutflowCount }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="startDate" label="统计开始时间" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="endDate" label="统计结束时间" show-overflow-tooltip align="center"> </el-table-column>
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
      <!-- 流出弹框 -->
      <el-dialog
        title="流出区域设备"
        :visible.sync="dialogVisible"
        width="80%"
      >
        <el-table :data="InflowList" style="width: 100%">
          <el-table-column prop="imei" label="imei"> </el-table-column>
          <el-table-column label="imsi" prop="imsi"> </el-table-column>
          <el-table-column label="系统" prop="platform"> </el-table-column>
          <el-table-column label="型号" prop="model"> </el-table-column>
          <el-table-column label="系统版本" prop="osVersion"> </el-table-column>
          <el-table-column label="时区" prop="timeZone"> </el-table-column>
          <el-table-column label="手机号码" prop="phone"> </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 流入弹框 -->
      <el-dialog
        title="流入区域设备"
        :visible.sync="dialogVisible2"
        width="80%"
      >
        <el-table :data="flow" style="width: 100%">
          <el-table-column prop="imei" label="imei"> </el-table-column>
          <el-table-column label="imsi" prop="imsi"> </el-table-column>
          <el-table-column label="系统" prop="platform"> </el-table-column>
          <el-table-column label="型号" prop="model"> </el-table-column>
          <el-table-column label="系统版本" prop="osVersion"> </el-table-column>
          <el-table-column label="时区" prop="timeZone"> </el-table-column>
          <el-table-column label="手机号码" prop="phone"> </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible2 = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [], //表格数据
      queryParameter: {}, //查询参数
      total: 0, //总页数
      queryInfo: {
        page: 1,
        limit: 10,
      },
      dialogVisible: false,
      dialogVisible2: false,
      InflowList: [], //流出详情
      flow: [], //流入详情
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取列表数据
    getList() {
      this.$http({ url: "system/crowdwarning", method: "get",params:{...this.queryInfo} }).then((res) => {
        if (res.data.code == 0) {
          this.dataSource = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    //流出详情
    Inflow(scope) {
      this.$http({
        url: "/system/crowddevice",
        params: {
          crowdId: scope.row.crowdId,
          type: 2,
        },
      }).then((res) => {
        this.InflowList = res.data.data.list;
        this.dialogVisible = true;
      });
    },
    //流入详情
    floww(scope) {
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
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then((_) => {
    //       done();
    //     })
    //     .catch((_) => {});
    // },
  },
};
</script>