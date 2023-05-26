<template >
  <div class="detail_page">
    <div class="title">
      <h1>
        <template v-if="info.searchPhone">
          设备号码:{{ info.searchPhone }}
        </template>
        <template v-else-if="info.searchImei">
          设备IMEI:{{ info.searchImei }}
        </template>
        <template v-else-if="info.searchMac">
          设备MAC:{{ info.searchMac }}
        </template>
        <template v-else-if="info.searchImsi">
          设备IMSI:{{ info.searchImsi }}
        </template>

        <template v-else>
          {{ info.brandNew }}-{{ info.model }}
        </template>
        档案信息
        <i style="font-size: 14px"> ({{ today }}) </i>
      </h1>

      <div class="qrcode">
        <el-image style="height: 80px" :src="qrcode" fit="contain"></el-image>
      </div>
    </div>
    <div class="center">
      <div class="item1 item">
        <div class="list">
          <div class="table">
            <ul>
              <li>
                <i>设备品牌</i>
                <span>{{ info.brandNew }}</span>
              </li>
              <li>
                <i>设备型号</i>
                <span>{{ info.model }}</span>
              </li>
              <li>
                <i>手机号码</i>
                <span>{{ info.phone }}</span>
              </li>
              <li>
                <i>IMEI</i>
                <span>{{ info.imei }}</span>
              </li>
              <li>
                <i>IMSI</i>
                <span>{{ info.imsi }}</span>
              </li>
              <li>
                <i>MAC</i>
                <span>{{ info.mac }}</span>
              </li>
              <li>
                <i>系统版本</i>
                <span>{{ info.osVersion }}</span>
              </li>
              <li>
                <i>设备平台</i>
                <span v-if="info.platform === 'A'"> 安卓 </span>
                <span v-else-if="info.platform === 'I'"> IOS </span>
              </li>
              <li>
                <i>设备语言</i>
                <span>{{ info.lang }}</span>
              </li>
              <li>
                <i>系统时区</i>
                <span>{{ info.timeZone }}</span>
              </li>
            </ul>
          </div>

          <div class="pic">
            <el-image style="height: 100px" :src="url" fit="contain"></el-image>
          </div>
        </div>
      </div>
      <div class="item3 item">
        <div class="tit">
          <span>设备标签</span>
        </div>
        <ul>
          <li v-for="(item, index) in tagList" :key="index">
            <template v-if="item.tagGrade == 1">
              <a href="##" style="background: #409eff">
                {{ item.tagName }}
              </a>
            </template>
            <template v-else-if="item.tagGrade == 2">
              <a href="##" style="background: #67c23a">
                {{ item.tagName }}
              </a>
            </template>
            <template v-else-if="item.tagGrade == 3">
              <a href="##" style="background: #e6a23c">
                {{ item.tagName }}
              </a>
            </template>
            <template v-if="item.tagGrade == 4">
              <a href="##" style="background: #b81c22">
                {{ item.tagName }}
              </a>
            </template>
          </li>
        </ul>
      </div>
      <div class="item2 item">
        <div class="tit">
          <span>换机换卡</span>
        </div>
        <div class="list" v-if="info.phone">
          <ul>
            <li v-for="(item, index) in deviceChange" :key="index">
              <span>
                {{ index + 1 }}. {{ item.device.brandNew
                }}{{ item.device.model }} 使用过的手机号码
                <i v-for="(items, index) in item.phones" :key="index">
                  {{ items }}、
                </i>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="item2 item">
        <div class="tit" style="border-bottom: none">
          <span>常驻地址(最近三个月)</span>
          <el-button type="primary" size="small" @click="searchAddress()">查询最新</el-button>
        </div>
        <div class="list">
            <ul>
          <li v-for="(item, index) in habitat" :key="index">
              {{ index + 1 }}.
<!--              <span>{{ item.time }}</span>
              出现在-->
              <span>{{ item.address }}</span>
          <!--    附近-->
              <!-- <i
                class="el-icon-location-information"
                @click="showMap(item)"
                style="cursor: pointer"
              ></i> -->
            </li>
        </ul>
        </div>
      </div>
      <div class="item2 item">
        <div class="tit">
          <span>位置信息</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item, index) in area" :key="index">
              {{ index + 1 }}.
              <span>{{ item.time }}</span>
              出现在
              <span>{{ item.address }}</span>
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
      <div class="item5 item4 item">
        <div class="tit">
          <span>在装APP信息</span>
        </div>
        <ul>
          <li v-for="(item, index) in updataApp" :key="index">
            <el-tooltip placement="top">
                <div slot="content">
                    首次安装:{{item.firstReportTimeTruly}}
                    <br/>
                    最近安装:{{item.firstReportTime}}
                </div>
            <a href="##">
              <el-image :src="app1" fit="contain"></el-image>
              <span>{{ item.name }}</span>
            </a>
            </el-tooltip>
          </li>
        </ul>
      </div>
      <div class="item6 item5 item4 item">
        <div class="tit">
          <span>已卸载APP信息</span>
        </div>
        <ul>
          <li v-for="(item, index) in delApp" :key="index">
             <el-tooltip placement="top">
                <div slot="content">
                    首次安装:{{item.firstReportTimeTruly}}
                    <br/>
                    最近安装:{{item.firstReportTime}}
                    <br/>
                    卸载日期:{{item.lastReportTime}}
                </div>
            <a href="##">
              <el-image :src="app1" fit="contain"></el-image>
              <span>{{ item.name }}</span>
            </a>
            </el-tooltip>
          </li>
        </ul>
      </div>
      <div class="item2 item item_wifi">
        <div class="tit">
          <span>常连热点信息</span>
        </div>
        <div class="list">
          <ul>
            <li
              v-for="(item, index) in wifi"
              :key="index"
              @click="jumpWifi(item.wifi)"
            >
              <span> {{ item.count }}次 </span>
              <p>{{ item.ssid }}</p>
              <p>{{ item.wifi }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="item2 item item_wifi">
        <div class="tit">
          <span>常连基站信息</span>
        </div>
        <div class="list">
          <ul>
            <li
              v-for="(item, index) in cellId"
              :key="index"
              @click="jumpCell(item.cellId)"
            >
              <span> {{ item.count }}次 </span>
              <p>基站ID</p>
              <p>{{ item.cellId }}</p>
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
      url: require("../../../assets/img/phone.jpg"),
      qrcode: require("../../../assets/img/qrcode.jpg"),

      app1: require("../../../assets/img/app1.png"),

      appList: [],
      cellId: [],
      wifi: [],
      area: [],
      tagList: [],
      deviceChange: [],
      habitat:[],
      info: {
        brandNew: "",
        lang: "",
        langCountry: "",
        language: "",
        model: "",
        osVersion: "",
        platform: "",
        timeZone: "",
        imei: "",
        imsi: "",
        phone: "",
        mac: "",
        searchPhone: "",
        searchImei: "",
        searchMac: "",
        searchImsi: "",
      },
      detail: false,
      marker: {
        lng: null,
        lat: null,
      },
      today: "",
    };
  },
  computed: {
    updataApp: function () {
      return this.appList.filter((item) => {
        return item.status === "1";
      });
    },
    delApp: function () {
      return this.appList.filter((item) => {
        return item.status === "0";
      });
    },
  },
  mounted() {
    this.getDeviceInfo(this.$route.query);
    this.getToday();
  },
  activated() {
    // 获取数据
    //this.getDeviceInfo(this.$route.query);
    // this.getToday();
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
    // 返回
    back() {
      window.history.go(-1);
    },
    getDeviceInfo(item) {
        // console.log(item)

        if(item.key){
            this.key = item.key
        }
        else{
            this.key = item.devKey
        }


    //   this.info.brandNew = item.brandNew;
    //   this.info.lang = item.lang;
    //   this.info.langCountry = item.langCountry;
    //   this.info.language = item.language;
    //   this.info.model = item.model;
    //   this.info.osVersion = item.osVersion;
    //   this.info.platform = item.platform;
    //   this.info.timeZone = item.timeZone;

    //   this.info.imei = item.imei;
    //   this.info.imsi = item.imsi;
    //   this.info.mac = item.mac;
    //   this.info.phone = item.phone;

      this.info.searchPhone = item.searchPhone;
      this.info.searchImei = item.searchImei;
      this.info.searchMac = item.searchMac;
      this.info.searchImsi = item.searchImsi;

      if (this.info.platform === "A") {
        this.url = require("../../../assets/img/andriod.jpg");
      }

      this.$http({
        url: "/system/archive/device/" + this.key,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          return;
        }

        this.info = res.data.archiveListVOS[0]

        this.appList = res.data.app.slice(0, 20);

        this.cellId = res.data.cell.slice(0, 5);

        this.wifi = res.data.wifi.slice(0, 5);

        this.area = res.data.area.slice(0, 10);

        this.tagList = res.data.tag;

        this.deviceChange = res.data.deviceChange;

        this.habitat = res.data.habitat.slice(0, 5)
      });
    },
    showMap(item) {
      this.detail = true;

      this.marker.lng = item.location.lon;
      this.marker.lat = item.location.lat;
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

    // 查询地址
    searchAddress(){
        var dsd = {
            devKey: this.key,
          };
          var params = {
            device: JSON.parse(JSON.stringify(dsd)),
            taskName: this.key+"常驻地分析",
          };

          let data = JSON.parse(JSON.stringify(params));
          this.$http
            .post("/hadoop/task/habitat", data)
            .then(({ data: res }) => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "查询成功",
                });

              } else {
                this.$message({
                  type: "warning",
                  message: "查询失败",
                });
              }
            })
    }
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
    // padding: 0 5px;
    .item {
      min-height: 100px;
      .tit {
        border-top: 2px solid #333;
        display: flex;
        align-items: center;
        // padding-left: 30px;
        margin-bottom: 10px;
        margin-top: 0px;
        i {
          color: #333;
          font-size: 30px;
        }
        span {
          font-size: 20px;
          font-weight: bold;
          line-height: 1.5;
          margin: 5px;
        }
      }
      .list {
        padding: 0 30px;
        margin-bottom: 10px;
      }
      .el-pagination {
        text-align: right;
        margin-top: 5px;
        display: none;
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
            height: 150px;
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
              line-height: 40px;
              border-bottom: 1px solid #333;
              &:nth-child(9),
              &:nth-child(10) {
                border-bottom: 0 solid #000;
              }

              &:nth-child(1),
              &:nth-child(3),
              &:nth-child(5),
              &:nth-child(7),
              &:nth-child(9) {
                i {
                  border-left: 0 solid #000;
                }
              }
              i {
                width: 30%;
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
          justify-content: flex-start;
          li {
            width: 16%;
            text-align: center;
            border: 1px solid #333;
            margin-right: 10px;
            cursor: pointer;
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
    .item4 {
      height: auto;
      ul {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        li {
          padding-bottom: 10px;
        //   width: 50%;
          &:last-child {
            border-right: 0;
          }
          padding: 0 5px;
          .tit {
            border-top: 0 solid #000;
          }
          a {
            display: flex;
            align-items: center;
            font-size: 16px;
            color: #333;
            line-height: 24px;
            img {
            }
            span {
              display: inline-block;
              padding: 0 8px;
              font-size: 14px;
              color: #333;
              //   background: #2a3f54;
              margin-right: 5px;
              border-radius: 5px;
              margin-bottom: 5px;
              margin-left: 5px;
            }
            i {
              font-size: 14px;
            }
          }
        }
      }
    }
    .item5 {
      ul {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        border-top: 0 solid #000;
        li {
          width: 10%;
          border-right: 0;
          margin-bottom: 10px;
          a {
            flex-direction: column;
            span {
              display: block;
              width: 100%;
              text-align: center;
              white-space: break-spaces;
            }
          }
        }
      }
    }
    .item6 {
      margin-top: 20px;
      .tit {
        border-top: 0 solid #000;
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
