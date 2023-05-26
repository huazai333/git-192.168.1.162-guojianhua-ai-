 <template>
  <div>
    <div style="padding: 20px">
      <el-tabs @tab-click="handleClick">
        <ul class="filter">
          <li
            v-for="(item,index) in options"
            :key="index"
            @click="handleChange(item,index)"
            :class="active == index ? 'isActive' : ''"
          >
            <a>
              {{ item.tagName }}
            </a>
          </li>
        </ul>
        <!-- <el-select
          v-model="value"
          filterable
          placeholder="请选择"
          style="margin-bottom: 15px"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.tagName"
            :value="item.tagCode"
            @click.native="handleChange(item)"
          >
          </el-option> 
        </el-select>-->
        <el-tab-pane label="设备">
          <el-table :data="deviceList" style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="devPhone"
              label="设备手机号码"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="devImei"
              label="设备IMEI"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="devImsi"
              label="设备IMSI"
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
              prop="tagName"
              label="设备标签"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="warning" size="mini">
                  {{ scope.row.tagName }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="上报时间"
              show-overflow-tooltip
              align="center"
              sortable
            ></el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                <el-button type="text" @click="goDevice(scope.row)">
                    详情
                </el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="热点">
          <el-table :data="wifiList" style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="wifiMac"
              label="热点MAC"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="wifiName"
              label="热点名称"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="gps"
              label="热点位置(经纬度)"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="showMap(scope.row)">
                    查看地图
                </el-button>
                <!-- {{
                  JSON.parse(scope.row.gps).lon +
                  "," +
                  JSON.parse(scope.row.gps).lat
                }} -->
              </template>
            </el-table-column>
            <el-table-column
              prop="location"
              label="地理位置"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="tagName"
              label="热点标签"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="warning" size="mini">
                  {{ scope.row.tagName }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="connectNum"
              label="具体数量"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="time"
              label="上报时间"
              show-overflow-tooltip
              align="center"
              sortable
            ></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                <el-button type="text" @click="goWifi(scope.row)">
                    详情
                </el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="基站">
          <el-table :data="cellList" style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="cellId"
              label="基站ID"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="locationAreaCode"
              label="位置区码"
              width="150"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="mobileCountryCode"
              label="移动设备国家代码"
              width="150"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="mobileNetworkCode"
              label="移动网络号码"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="gps"
              label="基站位置(经纬度)"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="showMap(scope.row)">
                    查看地图
                </el-button>
                <!-- {{
                  JSON.parse(scope.row.gps).lon +
                  "," +
                  JSON.parse(scope.row.gps).lat
                }} -->
              </template>
            </el-table-column>
            <el-table-column
              prop="location"
              label="地理位置"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="tagName"
              label="基站标签"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="warning" size="mini">
                  {{ scope.row.tagName }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="上报时间"
              show-overflow-tooltip
              align="center"
              sortable
            ></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                <el-button type="text" @click="goCell(scope.row)">
                    详情
                </el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="IP">
          <el-table :data="ipList" style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="ip"
              label="IP地址"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="gps"
              label="IP位置(经纬度)"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="showMap(scope.row)">
                    查看地图
                </el-button>
                <!-- {{
                  JSON.parse(scope.row.gps).lon +
                  "," +
                  JSON.parse(scope.row.gps).lat
                }} -->
              </template>
            </el-table-column>
            <el-table-column
              prop="location"
              label="地理位置"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="tagName"
              label="IP标签"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="warning" size="mini">
                  {{ scope.row.tagName }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="上报时间"
              show-overflow-tooltip
              align="center"
              sortable
            ></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                <el-button type="text" @click="goIp(scope.row)">
                    详情
                </el-button>
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
        layout="total,  prev, pager, next, jumper"
        @current-change="pageCurrentChangeHandle"
      >
      </el-pagination>
    </div>

        <el-dialog
      title="位置详情"
      :visible.sync="detail"
      width="70%"
      v-if="detail"
    >
      <baidu-map
        class="map"
        :center="{ lng: this.marker.lng, lat: this.marker.lat }"
        :zoom="12"
        :scroll-wheel-zoom="true"
      >
        <bm-marker :position="{ lng: marker.lng, lat: marker.lat }">
        </bm-marker>
      </baidu-map>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: -1,
      page: 1, // 当前页码
      limit: 10, // 每页数
      total: 0, // 总条数

      deviceList: [],
      wifiList: [],
      cellList: [],
      ipList: [],
      appList: [],

      value: "请选择",
      options: [],

      index: 0,
      tagCode: "",

      detail: false,
      marker: {
        lng: null,
        lat: null,
      },
    };
  },
  computed: {},
  created() {
    this.getData();
    this.getTag(1);
  },
  mounted() {
    this.getData();
    this.getTag(1);
  },
  activated() {
    this.getData();
    this.getTag(1);
  },
  methods: {
    // 分页, 当前页
    pageCurrentChangeHandle(val) {
      this.page = val;
      console.log(this.tagCode);

      if (this.index == 0) {
        this.getTag(1);
        this.$http({
          url:
            "/system/tagDevice/list?limit=" +
            this.limit +
            "&page=" +
            this.page +
            "&tagCode=" +
            this.tagCode,
          method: "get",
        }).then(({ data: res }) => {
          this.deviceList = res.data.list;
          this.total = res.data.total;
        });
      } else if (this.index == 1) {
        this.getTag(2);
        this.$http({
          url:
            "/system/tagWifi/list?limit=" +
            this.limit +
            "&page=" +
            this.page +
            "&tagCode=" +
            this.tagCode,
          method: "get",
        }).then(({ data: res }) => {
          this.wifiList = res.data.list;
          this.total = res.data.total;
        });
      } else if (this.index == 2) {
        this.getTag(3);
        this.$http({
          url:
            "/system/tagCell/list?limit=" +
            this.limit +
            "&page=" +
            this.page +
            "&tagCode=" +
            this.tagCode,
          method: "get",
        }).then(({ data: res }) => {
          this.cellList = res.data.list;
          this.total = res.data.total;
        });
      } else if (this.index == 3) {
        this.getTag(5);
        this.$http({
          url:
            "/system/tagIp/list?limit=" +
            this.limit +
            "&page=" +
            this.page +
            "&tagCode=" +
            this.tagCode,
          method: "get",
        }).then(({ data: res }) => {
          this.ipList = res.data.list;
          this.total = res.data.total;
        });
      }
    },
    getData() {
      this.$http({
        url:
          "/system/tagDevice/list?limit=" + this.limit + "&page=" + this.page,
        method: "get",
      }).then(({ data: res }) => {
        this.deviceList = res.data.list;
        this.total = res.data.total;
      });
    },
    handleClick(tab) {
      this.active = -1;
      this.value = "请选择";
      this.index = tab.index;

      this.page = 1; // 当前页码
      this.limit = 10; // 每页数
      this.tagCode = "";
      //   console.log(tab.index);
      if (tab.index == 0) {
        this.getTag(1);
        this.$http({
          url:
            "/system/tagDevice/list?limit=" + this.limit + "&page=" + this.page,
          method: "get",
        }).then(({ data: res }) => {
          this.deviceList = res.data.list;
          this.total = res.data.total;
        });
      } else if (tab.index == 1) {
        this.getTag(2);
        this.$http({
          url:
            "/system/tagWifi/list?limit=" + this.limit + "&page=" + this.page,
          method: "get",
        }).then(({ data: res }) => {
          this.wifiList = res.data.list;
          this.total = res.data.total;
        });
      } else if (tab.index == 2) {
        this.getTag(3);
        this.$http({
          url:
            "/system/tagCell/list?limit=" + this.limit + "&page=" + this.page,
          method: "get",
        }).then(({ data: res }) => {
          this.cellList = res.data.list;
          this.total = res.data.total;
        });
      } else if (tab.index == 3) {
        this.getTag(5);
        this.$http({
          url: "/system/tagIp/list?limit=" + this.limit + "&page=" + this.page,
          method: "get",
        }).then(({ data: res }) => {
          this.ipList = res.data.list;
          this.total = res.data.total;
        });
      }
    },
    getTag(item) {
      this.$http({
        url: "/system/tag/list?tagType=" + item,
        method: "get",
      }).then(({ data: res }) => {
        // console.log(res);
        // const arr = res.data.list.map((item) => item.tagName);
        this.options = res.data.list;
      });
    },
    handleChange(item, index) {
      this.active = index;
      // console.log(this.index)
      this.page = 1; // 当前页码
      this.limit = 10; // 每页数
      this.tagCode = item.tagCode;
      if (this.index == 0) {
        this.$http({
          url:
            "/system/tagDevice/list?tagCode=" +
            item.tagCode +
            "&page=" +
            this.page +
            "&limit=" +
            this.limit,
          method: "get",
        }).then(({ data: res }) => {
          this.deviceList = "";
          this.deviceList = res.data.list;
          this.total = res.data.total;
          //   console.log("device", this.deviceList);
        });
      } else if (this.index == 1) {
        this.$http({
          url:
            "/system/tagWifi/list?tagCode=" +
            item.tagCode +
            "&page=" +
            this.page +
            "&limit=" +
            this.limit,
          method: "get",
        }).then(({ data: res }) => {
          this.wifiList = "";
          this.wifiList = res.data.list;
          this.total = res.data.total;
          console.log("wifi", this.wifiList);
        });
      } else if (this.index == 2) {
        this.$http({
          url:
            "/system/tagCell/list?tagCode=" +
            item.tagCode +
            "&page=" +
            this.page +
            "&limit=" +
            this.limit,
          method: "get",
        }).then(({ data: res }) => {
          this.cellList = "";
          this.cellList = res.data.list;
          this.total = res.data.total;
          console.log("cell", this.cellList);
        });
      } else if (this.index == 3) {
        this.$http({
          url:
            "/system/tagIp/list?tagCode=" +
            item.tagCode +
            "&page=" +
            this.page +
            "&limit=" +
            this.limit,
          method: "get",
        }).then(({ data: res }) => {
          this.ipList = "";
          this.ipList = res.data.list;
          this.total = res.data.total;
          console.log("ip", this.ipList);
        });
      }
    },

    goDevice(item){
        // console.log(item)
        this.$router.push({ name: "equipment-info", query: item });
    },
    goWifi(item){
        // console.log(item)
        this.$router.push({ name: "wifi-index-info", query: item });
    },
    goCell(item){
        // console.log(item)
        this.$router.push({ name: "base-station-info", query: item });
    },
    goIp(item){
        // console.log(item)
        this.$router.push({ name: "ip-index-info", query: item });
    },

    showMap(item) {
      this.detail = true;

      this.marker.lng = JSON.parse(item.gps).lon;
      this.marker.lat = JSON.parse(item.gps).lat;
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
.filter {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 10%;
    margin-bottom: 5px;
    padding: 0 5px;
    &.isActive {
      a {
        border: none;
        background: #2a3f54;
        color: #fff;
      }
    }
    a {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      text-align: center;
      color: #333;
      border: 1px solid #dedede;
    }
  }
}.map {
  width: 100%;
  height: 600px;
}
</style>




