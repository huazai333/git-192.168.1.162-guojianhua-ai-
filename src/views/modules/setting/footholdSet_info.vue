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
        prop="device_info.devPhone"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="设备IMEI"
        prop="device_info.devImei"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="设备IMSI"
        prop="device_info.devImsi"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="设备MAC"
        prop="device_info.devMac"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>

      <el-table-column label="落脚点详情" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="
              detail = true;
              getDetail(scope.row);
            "
            >详情</el-button
          >
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

    <el-dialog
      title="落脚点详情"
      :visible.sync="detail"
      width="70%"
      v-if="detail"
    >
      <baidu-map
        class="map"
        :center="{ lng: 75.989963, lat: 39.475211 }"
        :zoom="8"
        :scroll-wheel-zoom="true"
      >
        <div v-for="(marker, index) in markers" :key="index">
          <bm-marker
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="lookDetail(marker)"
          >
            <bm-info-window
              :show="marker.showFlag"
              @close="infoWindowClose(marker)"
              :position="{ lng: infoWindowInfo.lng, lat: infoWindowInfo.lat }"
              @open="infoWindowOpen(marker)"
            >
              <!-- <h5>开始时间:{{ marker.start_time }}</h5>
              <h5>结束时间:{{ marker.end_time }}</h5> -->
              <h5>wifimac:{{ marker.wifimac }}</h5>
              <!-- <h5>出现次数:{{ marker.trajectory_num }}</h5> -->
              <!-- <h5>连接次数:{{ marker.connect_num }}</h5> -->
              <!-- <h5>
                连接占比:{{
                  parseInt((marker.connect_num / marker.trajectory_num) * 100)
                }}%
              </h5> -->
              <h5>出现占比:{{ parseInt(marker.proportion * 100) }}%</h5>
              <!-- <h5>晚上占比:{{ marker.night_proportion * 100 }}%</h5> -->
            </bm-info-window>
          </bm-marker>
        </div>
      </baidu-map>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      detail: false,
      dataList: [],
      markers: [],
      infoWindowInfo: {},
      modelId: "",

      page: 1, // 当前页码
      limit: 10, // 每页数
      total: 0, // 总条数

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
    // 分页, 当前页
    pageCurrentChangeHandle(val) {
      this.page = val;

      this.getInfo(this.$route.query);
    },
    // 点击点坐标赋值
    lookDetail(marker) {
      marker.showFlag = true;
      this.infoWindowInfo = marker;
    },
    // 关闭弹窗
    infoWindowClose(marker) {
      marker.showFlag = false;
      this.infoWindowInfo = {}
    },
    // 打开弹窗
    infoWindowOpen(marker) {
      this.infoWindowInfo = marker
      marker.showFlag = true;
    },
    // 获取分析详情
    getDetail(row) {
      this.markers = [];
    //   this.markers = row.foothold;

      let array = [];
      row.foothold.map((item, index) => {
        array.push(Object.assign(item, { showFlag: false }));
      });
      this.markers = array
    },

    //获取列表数据
    getInfo(item) {
      this.modelId = item.item;
      this.modelName = item.itemName;
      this.$http({
        url: "/system/keyfoothold/model?modelId=" + item.item+ "&limit=" +
          this.limit +
          "&page=" +
          this.page,
        method: "get",
      }).then(({ data: res }) => {
        const arr = res.data.list.map((item) => JSON.parse(item.data));

        this.dataList = arr;
        this.total = res.data.total;
        console.log(this.dataList);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 600px;
}
</style>




