<template >
  <div class="detail_page">
    <div class="title">
      <h1>坐标位置:{{ info.lon + "," + info.lat }}档案信息<i style="font-size: 14px"> ({{ today }}) </i></h1>
      <div class="qrcode">
        <el-image style="height: 70px" :src="qrcode" fit="contain"></el-image>
      </div>
    </div>
    <div class="center">
      <div class="item1 item">
        <div class="list">
          <div class="table">
            <ul>
              <li style="width: 100%">
                <i>经纬度</i>
                <span>{{ info.lon + "," + info.lat }}</span>
              </li>
              <li style="width: 100%">
                <i>地理位置</i>
                <span>{{ info.address }}附近</span>
              </li>
            </ul>
          </div>
          <div class="pic">
            <el-image style="height: 100px" :src="url" fit="contain"></el-image>
          </div>
        </div>
      </div>
      <!-- <div class="item2 item">
        <div class="tit">
          <span>附近设备信息</span>
        </div>
        <div class="list">
         <ul>
            <li v-for="(item, index) in dev" :key="index">
              {{ index + 1 }}.
              <span>{{ item.time }}</span>
              出现在
              <span>{{ item.address }}</span>
              附近
            </li>
          </ul>
        </div>
      </div> -->
      <div class="item2 item" v-loading="loading">
        <div class="tit">
          <span>附近热点信息</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item, index) in wifi" :key="index" @click="jumpWifi(item.wifi)">
              {{ index + 1 }}.

              <span>{{ dataFormat(item.itime) }}</span>
              热点:{{ item.ssid }}({{ item.wifi }}) 出现在
              <span
                >{{
                  item.country +
                  item.province +
                  item.city +
                  item.area +
                  item.district +
                  item.town +
                  item.village +
                  item.road
                }}
              </span>
              附近
              <i
                class="el-icon-location-information"
                @click="showMap(item)"
                style="cursor: pointer"
              ></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="item2 item" v-loading="loading">
        <div class="tit">
          <span>附近IP信息</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item, index) in ip" :key="index" @click="jumpIp(item.ip)">
              {{ index + 1 }}.
              <span>{{ dataFormat(item.itime) }}</span>
              IP:{{ item.ip }}
              出现在
              <span
                >{{
                  item.country +
                  item.province +
                  item.city +
                  item.area +
                  item.district +
                  item.town +
                  item.village +
                  item.road
                }}
              </span>
              附近
              <i
                class="el-icon-location-information"
                @click="showMap(item)"
                style="cursor: pointer"
              ></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="item2 item" v-loading="loading">
        <div class="tit">
          <span>附近基站信息</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item, index) in cellId" :key="index" @click="jumpCell(item.cellId)">
              {{ index + 1 }}.
              <span>{{ dataFormat(item.itime) }}</span>
              基站:{{ item.cellId }}
              出现在
              <span
                >{{
                  item.country +
                  item.province +
                  item.city +
                  item.area +
                  item.district +
                  item.town +
                  item.village +
                  item.road
                }}
              </span>
              附近
              <i
                class="el-icon-location-information"
                @click="showMap(item)"
                style="cursor: pointer"
              ></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="item_button">
      <el-button type="primary">关联分析</el-button>
      <el-button type="primary">下载</el-button>
      <el-button type="primary">查询更多</el-button>
      <el-button type="warning" @click="back()">返回</el-button>
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
        :zoom="8"
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
      url: require("../../../assets/img/weizhi.jpg"),
      qrcode: require("../../../assets/img/qrcode.jpg"),
      cellId: [],
      ip: [],
      wifi: [],
      dev: [],
      detail: false,
      loading: true,
      marker: {
        lng: null,
        lat: null,
      },
      info: {
        address: "",
        lon: "",
        lat: "",
      },
      today: "",
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getDeviceInfo(this.$route.query);
    this.getToday();
  },
  activated() {
    // 获取数据
    this.getDeviceInfo(this.$route.query);
    this.getToday();
  },
  methods: {
    getToday() {
      let time = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
        .toJSON()
        .split("T")
        .join(" ")
        .substr(0, 10);
      this.today = time;
    },
    back() {
      window.history.go(-1);
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
      let date = row;
      // console.log(date);
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
    location: function (row) {
      let location = row.location;
      location = JSON.parse(location);
      return location.lon + "," + location.lat;
    },
    getDeviceInfo(item) {
      this.loading = true;
      this.cellId = [];
      this.ip = [];
      this.wifi = [];
      this.info.address = "";

      console.log(item);
      this.key = item.key;

      this.info.lon = item.lon;
      this.info.lat = item.lat;

      this.$http({
        url:
          "/system/es/area?start=" +
          item.start +
          "&end=" +
          item.end +
          "&lon=" +
          item.lon +
          "&lat=" +
          item.lat,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          return;
        }
        this.loading = false;
        this.cellId = res.data.cellId.slice(0, 10);
        this.ip = res.data.ip.slice(0, 10);
        this.wifi = res.data.wifi.slice(0, 10);
        this.dev = res.data.dev.slice(0, 10);

        this.info.address =
          res.data.info[0].country +
          res.data.info[0].province +
          res.data.info[0].city +
          res.data.info[0].area +
          res.data.info[0].district +
          res.data.info[0].town +
          res.data.info[0].village +
          res.data.info[0].road;
      });
    },
    showMap(item) {
      this.detail = true;

      this.marker.lng = JSON.parse(item.location).lon;
      this.marker.lat = JSON.parse(item.location).lat;
    },

     // 跳转WiFi
    jumpWifi(item) {
      this.$router.push({
        name: "wifi-index-info",
        query: { wifi: item },
      });
    },
    // 跳转基站
    jumpCell(item) {
      this.$router.push({
        name: "base-station-info",
        query: { cellId: item },
      });
    },
     // 跳转IP
    jumpIp(item) {
      this.$router.push({
        name: "ip-index-info",
        query: { ip: item },
      });
    },

  },
};
</script>
<style lang="scss" scoped>
.detail_page {
  background: #fff;
  padding: 40px;

  .title {
    text-align: center;
    position: relative;
    width: 60%;
    margin: 0 auto;
    h1 {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    .qrcode {
      position: absolute;
      right: 0;
      top: -50%;
    }
  }
  .center {
    width: 60%;
    margin: 0 auto;
    border: 2px solid #333;
    border-top: 0 solid #000;
    .item {
      border-top: 2px solid #333;
      min-height: 150px;
      .tit {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        margin-top: 0px;
        i {
          color: #333;
          font-size: 30px;
        }
        span {
          font-size: 20px;
          font-weight: bold;
          line-height: 1;
          margin: 5px;
        }
      }
      .list {
        padding: 0 30px;
        margin-bottom: 10px;
      }
    }
    .item1 {
      height: auto;
      .list {
        display: flex;
        margin-bottom: 0;
        padding: 0px;
        .pic {
          width: 240px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 70px;
          }
        }
        .table {
          flex: 1;
          ul {
            display: flex;
            flex-wrap: wrap;
            border: 1px solid #333;
            border-bottom: 0 solid #000;
            border-top: 0 solid #000;
            border-left: 0 solid #dedede;
            li {
              width: 50%;
              display: flex;
              line-height: 75px;
              border-bottom: 1px solid #333;
              &:nth-last-child(1) {
                border-bottom: 0 solid #000;
                i {
                  border-left: 0 solid #000;
                }
              }

              &:nth-child(odd) {
                i {
                  border-left: 0 solid #000;
                }
              }
              i {
                width: 200px;
                display: block;
                text-align: center;
                border-right: 1px solid #333;
                border-left: 1px solid #333;
                font-size: 16px;
                font-weight: bold;
              }
              span {
                flex: 1;
                display: block;
                text-align: center;
                font-size: 16px;
                word-break: break-all;
              }
            }
          }
        }
      }
    }
    .item2 {
      .list {
        ul {
          li {
            &:hover{
                
            text-decoration: underline;
            }
            cursor: pointer;
            margin-bottom: 5px;
            font-size: 16px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              color: #333;
            }
          }
        }
      }
    }
    .item_wifi {
      .list {
        ul {
          display: flex;
          justify-content: space-around;
          li {
            width: 16%;
            text-align: center;
            border: 1px solid #333;
            span {
              display: inline-block;
              padding: 0 8px;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #333;
              margin-right: 5px;
              border-radius: 5px;
            }
            p {
              font-size: 14px;
              color: #333;
              line-height: 24px;
            }
          }
        }
      }
    }
    .item3 {
      height: auto;
      ul {
        overflow: hidden;
        li {
          float: left;
          a {
            display: block;
            float: left;
            padding: 0 8px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #fff;
            background: #a1721d;
            margin-left: 5px;
            margin-bottom: 5px;
            border-radius: 5px;
            pointer-events: none;
          }
        }
      }
    }
  }
  .item_button {
    margin-top: 20px;
    text-align: center;
  }
}
.map {
  width: 100%;
  height: 600px;
}
</style>