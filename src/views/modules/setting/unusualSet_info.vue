<template>
  <el-card shadow="never" class="aui-card--fill">
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
    <el-table :data="dataList">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="wifiName"
        label="wifi名称"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="wifiMac"
        label="wifiMac"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <!-- <el-table-column
        prop="type"
        label="热点类型"
        show-overflow-tooltip
        align="center"
        :formatter="typechange"
      >
      </el-table-column> -->
      <el-table-column
        prop="value"
        label="阈值"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="预警时间"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="viewHandle(scope.row)"
              >详情</el-button
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
      layout="total,prev, pager, next"
      @current-change="pageCurrentChangeHandle"
    >
    </el-pagination>

    <el-dialog title="详情" :visible.sync="dialogTableVisible" width="85%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="重点设备" name="first">
          <el-table
            :data="
              devList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
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
              label="MAC"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="devType"
              label="类型"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ typeSizeFn(scope) }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total,  prev, pager, next"
            :total="devList.length"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :page-sizes="[6]"
            :current-page="currentPage"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="重点APP" name="second">
          <el-table
            :data="
              appList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="appName"
              label="APP名称"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="appPackage"
              label="APP包名"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="appType"
              label="类型"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ typeSizeFn1(scope) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="appFrequency"
              label="次数"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
          </el-table>

          <el-pagination
            background
            layout="total,  prev, pager, next"
            :total="appList.length"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :page-sizes="[6]"
            :current-page="currentPage"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      modelId: "",

      dialogTableVisible: false,
      dataList: [],
      appList: [],
      devList: [],
      pageSize: 6,
      currentPage: 1,

       page: 1, // 当前页码
      limit: 10, // 每页数
      total: 0, // 总条数
    };
  },
  computed: {},
  created() {
    this.getInfo(this.$route.query);

    // this.getList();
  },
  mounted() {
    this.getInfo(this.$route.query);
    // this.getList();
  },
  activated() {
    this.getInfo(this.$route.query);
    // this.getList();
  },
  methods: {
     // 分页, 当前页
    pageCurrentChangeHandle(val) {
      this.page = val;
      this.getInfo(this.$route.query);
    },
    currentChange(e) {
      this.currentPage = e;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    typeSizeFn(scope) {
      scope = scope.row.devType;
      return scope == 1
        ? "涉政"
        : scope == 2
        ? "涉恐"
        : scope == 3
        ? "涉毒"
        : scope == 4
        ? "宗教"
        : scope == 5
        ? "涉黄"
        : scope == 6
        ? "涉赌"
        : scope == 7
        ? "涉诈"
        : "其他";
    },
    typeSizeFn1(scope) {
      scope = scope.row.appType;
      return scope == 1
        ? "涉政"
        : scope == 2
        ? "涉恐"
        : scope == 3
        ? "涉毒"
        : scope == 4
        ? "宗教"
        : scope == 5
        ? "涉黄"
        : scope == 6
        ? "涉赌"
        : scope == 7
        ? "涉诈"
        : "其他";
    },
    typechange: function (row) {
      let date = row.type;
      date = date.split(",");
      const newDate = date.map(function (item) {
        if (item === "1") {
          item = "涉政";
          return item;
        } else if (item === "2") {
          item = "涉恐";
          return item;
        } else if (item === "3") {
          item = "涉毒";
          return item;
        } else if (item === "4") {
          item = "宗教";
          return item;
        } else if (item === "5") {
          item = "涉黄";
          return item;
        } else if (item === "6") {
          item = "涉赌";
          return item;
        } else if (item === "7") {
          item = "涉诈";
          return item;
        }
      });
      date = newDate.toString();
      return date;
    },
    getInfo(item) {
      this.modelId = item.item;
      this.modelName = item.itemName;
      this.$http({
        url: "/system/keywifiwarning/model?modelId=" + item.item+ "&limit=" +
          this.limit +
          "&page=" +
          this.page,
        method: "get",
      }).then(({ data: res }) => {
        this.dataList = res.data.list;
         this.total = res.data.total;
      });
    },
    viewHandle(row) {
      this.dialogTableVisible = true;
      this.activeName = "first";
        this.$http({
          url:
            "/system/keywifiwarning/modelAll?wifiMac=" +
            row.wifiMac +
            "&modelId=" +
            this.modelId,
          method: "get",
        }).then(({ data: res }) => {
          this.devList = res.data.devList;
          this.appList = res.data.appList;
        });
    },
  },
};
</script>
<style lang="scss" >
.el-table {
  .student-img {
    vertical-align: top;
    width: 53px;
    height: 70px;
  }
}
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
