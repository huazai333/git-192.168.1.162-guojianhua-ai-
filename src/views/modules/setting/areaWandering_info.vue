 <template>
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
    <el-tabs>
      <el-tab-pane
        v-for="item in dataList"
        :key="item.areaName"
        :label="item.areaName"
      >
        <el-table
          :data="
            JSON.parse(item.info).slice(
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
          show-overflow-tooltip
          align="center"
          prop="mac"
          label="设备MAC"
        >
        </el-table-column>
          <el-table-column
          show-overflow-tooltip
          align="center"
          prop="imei"
          label="设备IMEI"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="imsi"
          label="设备IMSI"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="num"
          label="出现次数"
          sortable
        >
        </el-table-column>
         <el-table-column
            prop="itime"
            label="最近一次出现时间"
            show-overflow-tooltip
            align="center"
            :formatter="dataFormat"
            sortable
          >
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="JSON.parse(item.info).length"
          :page-size="pageSize"
          @current-change="currentChange"
          @size-change="handleSizeChange"
          :page-sizes="[6]"
          :current-page="currentPage"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelId: "",
      dataList: [],
      pageSize: 6,
      currentPage: 1,
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
        url: "/system/areaHover/model?modelId=" + item.item,
        method: "get",
      }).then(({ data: res }) => {
        console.log(res);
        this.dataList = res.data.list;
        console.log(JSON.parse(this.dataList[0].info))
      });
    },

    // 时间戳转换时间
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
      let date = Math.max.apply(null, row.itime);
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




