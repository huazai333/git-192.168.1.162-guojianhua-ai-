 <template>
  <div>
    <div style="padding: 20px">
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
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="同热点异常聚集">
          <el-table :data="wifiList" style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              label="热点MAC"
              prop="wifiMac"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="connectNum"
              label="连接次数"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="type"
              label="异常时间段"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <div>
                  <span v-if="scope.row.type === 1">全天</span>
                  <span v-if="scope.row.type === 2">晚上</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="startHour"
              label="开始时刻"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.startHour }}点</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="endHour"
              label="结束时刻"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.endHour }}点</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="parsingTime"
              label="分析时间"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reportTime"
              label="上报时间"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column label="详情" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="text"
                    @click="
                      dialogTableVisible = true;
                      getRule(scope);
                    "
                    >查看</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="同时空异常聚集">
          <el-table :data="spacetimeList" style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>

            <el-table-column
              label="开始聚集"
              show-overflow-tooltip
              align="center"
              prop="startTime"
            >
            </el-table-column>
            <el-table-column
              label="结束聚集"
              show-overflow-tooltip
              align="center"
              prop="endTime"
            >
            </el-table-column>
            <el-table-column
              label="聚集地点(经纬度)"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.lng + "，" + scope.row.lat }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="aggregationNum"
              label="聚集数量"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="parsingTime"
              label="分析时间"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reportTime"
              label="上报时间"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column label="详情" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="text"
                    @click="
                      dialogTableVisible = true;
                      getRule(scope);
                    "
                    >查看</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        background
        :current-page="page"
        :page-size="limit"
        :total="total"
        layout="total,  prev, pager, next"
        @current-change="pageCurrentChangeHandle"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="详情"
      v-if="dialogTableVisible"
      :visible.sync="dialogTableVisible"
      width="85%"
    >
      <el-tabs>
        <el-tab-pane label="敏感人群">
          <el-table
            :data="
              alert_device_list.slice(
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
              prop="devImei"
              label="设备IMEI"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="devMac"
              label="设备MAC"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="alert_type"
              label="设备类型"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="alert_device_list.length"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :page-sizes="[6]"
            :current-page="currentPage"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="重点人群">
          <el-table
            :data="
              key_device_list.slice(
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
              prop="devImei"
              label="设备IMEI"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="devMac"
              label="设备MAC"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="devType"
              label="设备类型"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
          </el-table>

          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="key_device_list.length"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1, // 当前页码
      limit: 10, // 每页数
      total: 0, // 总条数

      modelId: "",
      spacetimeList: [],
      wifiList: [],
      dialogTableVisible: false,
      alert_device_list: [],
      key_device_list: [],
      pageSize: 6,
      currentPage: 1,

      index: 0,
    };
  },
  computed: {},
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
    handleClick(tab) {
      this.index = tab.index;
      if (this.index == 0) {
        this.getInfo(this.$route.query);
      } else {
        this.getInfo2(this.$route.query);
      }
    },
    // 分页, 当前页
    pageCurrentChangeHandle(val) {
      this.page = val;

      if (this.index == 0) {
        this.getInfo(this.$route.query);
      } else {
        this.getInfo2(this.$route.query);
      }
    },
    currentChange(e) {
      this.currentPage = e;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    //获取列表数据
    getInfo(item) {
      this.modelId = item.item;
      this.modelName = item.itemName;
      this.$http({
        url:
          "/system/ssidwarning/modelWifi?modelId=" +
          item.item +
          "&limit=" +
          this.limit +
          "&page=" +
          this.page,
        method: "get",
      }).then(({ data: res }) => {
        this.wifiList = res.data.list;
        this.total = res.data.total;
      });
    },
    getInfo2(item) {
      this.modelId = item.item;
      this.modelName = item.itemName;
      this.$http({
        url:
          "/system/ssidwarning/modelSpacetime?modelId=" +
          item.item +
          "&limit=" +
          this.limit +
          "&page=" +
          this.page,
        method: "get",
      }).then(({ data: res }) => {
        this.spacetimeList = res.data.list;
        this.total = res.data.total;
      });
    },
    getRule(scope) {
      console.log(scope);
      this.alert_device_list = JSON.parse(scope.row.alertDeviceList);
      this.key_device_list = JSON.parse(scope.row.keyDeviceList);
      console.log(this.alert_device_list, this.key_device_list);
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




