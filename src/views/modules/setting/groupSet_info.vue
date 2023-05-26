<template>
  <div style="padding:20px;">
    <h5
        style="
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        "
      >
        {{ JSON.parse(modelName) }}分析结果
      </h5>
    <!-- <el-tabs>
      <el-tab-pane
        v-for="item in groupList"
        :key="item.groupId"
        :label="item.groupId"
      >
        
      </el-tab-pane>
    </el-tabs> -->

    <el-table :data="groupList" style="width: 100%">
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <!-- <el-table-column
            label="设备Key"
            prop="devInfo.devKey"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column> -->
          <el-table-column
            label="设备号码"
            prop="devPhone"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备IMEI"
            prop="devImei"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备IMSI"
            prop="devImsi"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            label="设备MAC"
            prop="devMac"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            label="阈值"
            prop="value"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
              prop="date"
              label="上报时间"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
          <el-table-column
            label="详情"
            prop="value"
            show-overflow-tooltip
            align="center"
          >
          <template slot-scope="scope">
              <div>
                <el-button
                  type="text"
                  @click="
                    detail = true;
                    getRule(scope);
                  "
                  >查看</el-button
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

    <el-dialog title="详情" :visible.sync="detail" width="60%">
      <el-table
        :data="
          trajectory.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <!-- <el-table-column
          show-overflow-tooltip
          align="center"
          prop="devKey"
          label="设备key"
        >
        </el-table-column> -->
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="commonCoordinateNum"
          label="公共坐标数量"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="commonIpNum"
          label="公共IP数量"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="commonWifiNum"
          label="公共热点数量"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="trajectory.length"
        :page-size="pageSize"
        @current-change="currentChange"
        @size-change="handleSizeChange"
        :page-sizes="[6]"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelId: "",
      groupList: [],
       detail: false,
      trajectory: [],
      pageSize: 6,
      currentPage: 1,

      page: 1, // 当前页码
      limit: 10, // 每页数
      total: 0, // 总条数
    };
  },
  created() {
    this.getInfo(this.$route.query);
  },
  mounted() {
    this.getInfo(this.$route.query);
  },
  activated() {
    this.getInfo(this.$route.query);
  },
  methods: {
    currentChange(e) {
      this.currentPage = e;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
     // 分页, 当前页
    pageCurrentChangeHandle(val) {
      this.page = val;

     this.getInfo(this.$route.query);
    },
    //获取列表数据
    getInfo(item) {
      this.modelId = item.item;
      this.modelName = item.itemName;
      this.$http({
        url: "/system/groupAnalytic/model?modelId=" + item.item+
          "&limit=" +
          this.limit +
          "&page=" +
          this.page,
        method: "get",
      }).then(({ data: res }) => {
        this.groupList = res.data.list;
        this.total = res.data.total;
        // console.log(JSON.parse(this.groupList[0].jsonData))
      });
    },

     getRule(item) {
      this.trajectory = JSON.parse(item.row.reason);
    },
  },
};
</script>

<style lang="scss">
body .aui-content .el-tabs .el-tabs__header {
  box-shadow: none !important;
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__item {
    color: #333;
    font-size: 20px;
    padding: 0 20px;
    &.is-active {
      background: #2a3f54;
      border-radius: 3px;
      color: #fff;
    }
  }
}
</style>