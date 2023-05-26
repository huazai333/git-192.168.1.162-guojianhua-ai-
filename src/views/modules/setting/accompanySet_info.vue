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
        label="设备号码"
        prop="devPhone"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="设备MAC"
        prop="devMac"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="同时空伴随数量"
        prop="spaceTimeNum"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="同热点伴随数量"
        prop="wifiNum"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="分析时间"
        prop="parsingTime"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="上报时间"
        prop="reportTime"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
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

    <el-dialog title="详情" :visible.sync="dialogTableVisible" width="85%">
      <el-tabs>
        <el-tab-pane label="同时空伴随">
          <el-table
            :data="
              spaceTimeResult.slice(
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
              label="设备MAC"
              prop="device_info.devMac"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="伴随次数"
              prop="accompany_num"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="所占比例"
              prop="proportion"
              show-overflow-tooltip
              align="center"
            >
             <template slot-scope="scope">
                  {{ scope.row.proportion * 100 + "%" }}
                </template>
            </el-table-column>
            <el-table-column
                prop="trajectory"
                label="伴随详情" 
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      @click="
                        detail = true;
                        getDetail(scope);
                      "
                      >查看</el-button
                    >
                  </div>
                </template>
              </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="spaceTimeResult.length"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :page-sizes="[6]"
            :current-page="currentPage"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="同热点伴随">
          <el-table
            :data="
              wifiResult.slice(
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
              label="设备MAC"
              prop="device_info.devMac"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="伴随次数"
              prop="accompany_num"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="所占比例"
              prop="proportion"
              show-overflow-tooltip
              align="center"
            >
             <template slot-scope="scope">
                  {{ scope.row.proportion * 100 + "%" }}
                </template>
            </el-table-column>

            <el-table-column
                prop="trajectory"
                label="伴随详情" 
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      @click="
                        detail = true;
                        getDetail(scope);
                      "
                      >查看</el-button
                    >
                  </div>
                </template>
              </el-table-column>
          </el-table>

          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="wifiResult.length"
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


    <el-dialog title="伴随详情" :visible.sync="detail" width="85%">
      <el-table :data="trajectory" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        
        
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="itime"
          label="伴随时间"
          sortable
          :formatter="dataFormat"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="伴随位置(经纬度)"
        >
          <template slot-scope="scope">
            {{ scope.row.lng + "," + scope.row.lat }}
          </template>
        </el-table-column>
        
         <el-table-column
          show-overflow-tooltip
          align="center"
          prop="target_itime"
          label="目标时间"
          sortable
          :formatter="dataFormat"
        >
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="wifimac"
          label="伴随热点"
        >
        <template slot-scope="scope" v-if="scope.row.wifimac">
            {{ scope.row.wifimac }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="目标位置(经纬度)"
        >
          <template slot-scope="scope" v-if="scope.row.target_lng">
            {{ scope.row.target_lng + "," + scope.row.target_lat }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      modelId: "",
      dataList: [],

      dialogTableVisible: false,
      spaceTimeResult: [],
      wifiResult: [],
      pageSize: 6,
      currentPage: 1,

      detail: false,
      trajectory: [],
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
        url: "/system/accompany/model?modelId=" + item.item,
        method: "get",
      }).then(({ data: res }) => {
        console.log(res);
        this.dataList = res.data.list;
      });
    },

    getRule(scope) {
      console.log(scope);
      this.spaceTimeResult = JSON.parse(scope.row.spaceTimeResult);
      this.wifiResult = JSON.parse(scope.row.wifiResult);
      console.log(this.spaceTimeResult, this.wifiResult);
    },

    getDetail(item) {
      this.trajectory = item.row.trajectory;
    },
    // 时间戳转换时间
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
      let date = row.itime;
      if (date) {
        let time = new Date(date * 1000);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return (
          y +
          "-" +
          this.add0(m) +
          "-" +
          this.add0(d) +
          " " +
          this.add0(h) +
          ":" +
          this.add0(mm) +
          ":" +
          this.add0(s)
        );
      }
      return "";
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




