<template >
  <div class="detail_page">
    <div class="title">
      <h1>基站：{{ info.cellId }}档案信息<i style="font-size: 14px"> ({{ today }}) </i></h1>
      <div class="qrcode">
        <el-image style="height: 70px" :src="qrcode" fit="contain"></el-image>
      </div>
    </div>
    <div class="center">
      <div class="item1 item">
        <div class="list">
          <div class="table">
            <ul>
              <li>
                <i>基站ID</i>
                <span>{{ info.cellId }}</span>
              </li>
              <li>
                <i>位置区码</i>
                <span>{{ info.locationAreaCode }}</span>
              </li>
              <li>
                <i>移动设备代码</i>
                <span>{{ info.mobileCountryCode }}</span>
              </li>
              <li>
                <i>移动网络号码</i>
                <span>{{ info.mobileNetworkCode }}</span>
              </li>
              <li style="width: 100%">
                <i>地理位置</i>
                <span>{{ info.address }}</span>
              </li>
              <li style="width: 100%">
                <i>经纬度</i>
                <span>{{ info.location.lon + "," + info.location.lat }}</span>
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
          <span>基站标签</span>
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
          <span>最近连接信息</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item, index) in devs" :key="index">
              {{ index + 1 }}.
              <span>{{ dataFormat(item.itime) }}</span>
              设备：{{ item.brandNew }}&nbsp;&nbsp;{{ item.model }}
              <!-- (PHONE:{{ item.phone }} IMEI:{{ item.imei }} IMSI:{{ item.imsi }} MAC:{{ item.mac }} ) -->
            </li>
          </ul>
        </div>
      </div>
      <div class="item2 item item_wifi">
        <div class="tit">
          <span>常连设备信息</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item, index) in wifi" :key="index" @click="jumpDevice(item)">
              <span> {{ item.count }}次 </span>
              <p>{{ item.brandNew }}</p>
              <p>{{ item.model }}</p>
              <p>{{ item.phone }}</p>
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
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      url: require("../../../assets/img/jizhan.jpg"),
      qrcode: require("../../../assets/img/qrcode.jpg"),
      wifi: [],
      tagList: [],
      devs: [],
      info: {
        cellId: "",
        locationAreaCode: "",
        mobileCountryCode: "",
        mobileNetworkCode: "",
        address: "",
        location: "",
      },
      today: "",
    };
  },
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
    // 返回
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
    getDeviceInfo(item) {
      console.log(item);
      this.$http({
        url: "/system/es/cellFile?cellId=" + item.cellId,
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          return;
        }
        this.info = res.data.cell;
        this.tagList = res.data.tag;
        this.wifi = res.data.deviceVoList;
        this.devs = res.data.devs;
      });
    },
     // 跳转设备
    jumpDevice(item) {
      this.$router.push({
        name: "equipment-info",
        query: item
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
              line-height: 50px;
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
            margin-right: 10px;
            width: 16%;
            text-align: center;
            border: 1px solid #333;
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
