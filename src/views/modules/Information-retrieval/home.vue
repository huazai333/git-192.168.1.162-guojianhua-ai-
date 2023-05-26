<template>
  <div class="home_search">
    <div class="search_center">
      <el-tabs v-model="activeName">
        <el-tab-pane label="设备查询" name="first">
          <div class="center">
            <div class="tit">*(设备查询：设备查询)</div>
            <div style="display: flex">
              <div
                class="pic"
                style="width: 200px; text-align: center; padding: 0 30px"
              >
                <el-image
                  style="height: 200px"
                  :src="url"
                  fit="contain"
                ></el-image>
              </div>
              <el-form
                ref="ruleForm"
                :model="dataForm"
                label-width="130px"
                :rules="deviceRules"
              >
                <el-form-item label="手机号码(PHONE):">
                  <el-form-item prop="phone">
                    <el-input v-model="dataForm.phone" clearable></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="设备序列号(IMEI):">
                  <el-form-item prop="imei">
                    <el-input v-model="dataForm.imei" clearable></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="手机识别码(MAC):">
                  <el-form-item prop="mac">
                    <el-input v-model="dataForm.mac" clearable></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="SIM卡码(IMSI):">
                  <el-form-item prop="imsi">
                    <el-input v-model="dataForm.imsi" clearable></el-input>
                  </el-form-item>
                </el-form-item>
                <!-- <el-form-item label="OAID">
                <el-form-item prop="oaid">
                  <el-input v-model="dataForm.oaid" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="IDFA">
                <el-form-item prop="idfa">
                  <el-input v-model="dataForm.idfa" clearable></el-input>
                </el-form-item>
              </el-form-item> -->

                <el-form-item class="btn">
                  <!-- <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button> -->
                  <el-button @click="search(dataForm)" class="search"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="热点查询" name="second">
          <div class="center">
            <div class="tit">*(热点查询:热点查询)</div>
            <div style="display: flex">
              <div class="pic">
                <el-image
                  style="height: 200px"
                  :src="wifi"
                  fit="contain"
                ></el-image>
              </div>
              <el-form
                ref="wifiForm"
                :model="wifiData"
                :rules="wifiRules"
                label-width="50px"
                label-position="left"
              >
                <el-form-item label="MAC:" prop="mac">
                  <el-input
                    v-model="wifiData.mac"
                    placeholder=""
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="时间:" prop="date">
                  <el-date-picker
                    v-model="wifiData.date"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="warning" @click="resetForm('wifiForm')"
                    >重置</el-button
                  > -->
                  <el-button @click="wifiSearch(wifiData)" class="search"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="基站查询" name="third">
          <div class="center">
            <div class="tit">*(基站查询:基站查询)</div>
            <div style="display: flex">
              <div class="pic" style="width: 256px">
                <el-image
                  style="height: 180px"
                  :src="jizhan"
                  fit="contain"
                ></el-image>
              </div>

              <el-form
                ref="baseForm"
                :model="baseData"
                label-width="50px"
                label-position="left"
                :rules="baseRules"
              >
                <el-form-item label="基站ID:" prop="cellId">
                  <el-input
                    v-model="baseData.cellId"
                    placeholder=""
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="时间:" prop="date">
                  <el-date-picker
                    v-model="baseData.date"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="warning" @click="resetForm('baseForm')"
                    >重置</el-button
                  > -->
                  <el-button @click="baseSearch(baseData)" class="search"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="IP查询" name="fourth">
          <div class="center">
            <div class="tit">*(IP查询:IP查询)</div>
            <div style="display: flex">
              <div class="pic" style="width: 256px">
                <el-image
                  style="height: 150px"
                  :src="ip"
                  fit="contain"
                ></el-image>
              </div>
              <el-form
                ref="ipForm"
                :model="ipData"
                label-width="50px"
                label-position="left"
                :rules="ipRules"
              >
                <el-form-item label="IP:" prop="ip">
                  <el-input
                    v-model="ipData.ip"
                    placeholder=""
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="时间:" prop="date">
                  <el-date-picker
                    v-model="ipData.date"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="warning" @click="resetForm('ipForm')"
                  >重置</el-button
                > -->
                  <el-button @click="ipSearch(ipData)" class="search"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="应用查询" name="five">
          <div class="center">
            <div class="tit">*(应用查询:应用查询)</div>

            <div style="display: flex">
              <div class="pic" style="width: 256px">
                <el-image
                  style="height: 140px"
                  :src="app"
                  fit="contain"
                ></el-image>
              </div>
              <el-form
                ref="appForm"
                :model="appData"
                label-width="50px"
                label-position="left"
                :rules="appRules"
              >
                <el-form-item label="名称:" prop="name">
                  <el-input
                    v-model="appData.name"
                    placeholder=""
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="包名:" prop="packages">
                  <el-input
                    v-model="appData.packages"
                    placeholder=""
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="warning" @click="resetForm('appForm')"
                    >重置</el-button
                  > -->
                  <el-button @click="appSearch(appData)" class="search"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="位置查询" name="six">
          <div class="center">
            <div class="tit">*(位置查询:位置查询)</div>
            <div style="display: flex">
              <div class="pic" style="width: 256px">
                <el-image
                  style="height: 200px"
                  :src="weizhi"
                  fit="contain"
                ></el-image>
              </div>
              <el-form
                ref="gpsForm"
                :model="gpsData"
                label-width="50px"
                label-position="left"
                :rules="gpsRules"
              >
                <el-form-item label="经度:" prop="lon">
                  <el-input
                    v-model="gpsData.lon"
                    placeholder=""
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="纬度:" prop="lat">
                  <el-input
                    v-model="gpsData.lat"
                    placeholder=""
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="时间:" prop="date">
                  <el-date-picker
                    v-model="gpsData.date"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="warning" @click="resetForm('gpsForm')"
                    >重置</el-button
                  > -->
                  <el-button @click="gpsSearch(gpsData)" class="search"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      url: require("../../../assets/img/phone.jpg"),
      wifi: require("../../../assets/img/wifi.jpg"),
      jizhan: require("../../../assets/img/jizhan.jpg"),
      ip: require("../../../assets/img/ip.jpg"),
      app: require("../../../assets/img/app.jpg"),
      weizhi: require("../../../assets/img/weizhi.jpg"),
      //设备查询
      dataForm: {
        imei: "",
        mac: "",
        phone: "15026315266",
        imsi: "",
        oaid: "",
        idfa: "",
      },
      //热点查询
      wifiData: {
        date: [new Date(2022, 5, 1, 0, 0), new Date(2022, 6, 30, 0, 0)],
        mac: "",
        start: "",
        end: "",
      },
      //基站查询
      baseData: {
        date: [new Date(2022, 5, 1, 0, 0), new Date(2022, 6, 30, 0, 0)],
        cellId: "",
        start: "",
        end: "",
      },
      //IP查询
      ipData: {
        date: [new Date(2022, 5, 1, 0, 0), new Date(2022, 6, 30, 0, 0)],
        ip: "",
        start: "",
        end: "",
      },
      //APP查询
      appData: {
        packages: "",
        name: "微信",
      },
      //GPS查询
      gpsData: {
        date: [new Date(2021, 1, 1, 0, 0), new Date(2021, 2, 30, 0, 0)],
        lon: "75.989",
        lat: "39.414",
        start: "",
        end: "",
      },
      deviceRules: {
        phone: [
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        imei: [
          {
            pattern: /^[\d]{15}(?:[\d]{2})?$/,
            message: "请输入正确的IMEI号码",
            trigger: "blur",
          },
        ],
        mac: [
          {
            pattern: /^([0-9a-fA-F]{2})(([:][0-9a-fA-F]{2}){5})$/,
            message: "请输入正确的MAC号码",
            trigger: "blur",
          },
        ],
        imsi: [
          {
            pattern: /^4600[0,1,2,3,5,6,7]\d{10}$/g,
            message: "请输入正确的IMSI号码",
            trigger: "blur",
          },
        ],
      },
      wifiRules: {
        date: [{ required: true, message: "请输入", trigger: "blur" }],
        mac: [
          {
            pattern: /^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$/,
            message: "请输入正确的MAC号码",
            trigger: "blur",
          },
        ],
      },
      baseRules: {
        date: [{ required: true, message: "请输入", trigger: "blur" }],

        cellId: [
          {
            pattern: /^[^\u4e00-\u9fa5 ]{4,15}$/,
            message: "请输入正确的基站ID",
            trigger: "blur",
          },
        ],
      },
      ipRules: {
        date: [{ required: true, message: "请输入", trigger: "blur" }],
        ip: [
          {
            pattern:
              /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))).){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
            message: "请输入正确的IP号码",
            trigger: "blur",
          },
        ],
      },
      appRules: {
        name: [
          {
            pattern: /^\S*$/,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        packages: [
          {
            pattern: /^([a-zA-Z_][a-zA-Z0-9_]*)+([.][a-zA-Z_][a-zA-Z0-9_]*)+$/,
            message: "请输入正确的包名",
            trigger: "blur",
          },
        ],
      },
      gpsRules: {
        lon: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern:
              /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/,
            message: "请输入正确的经度",
            trigger: "blur",
          },
        ],
        lat: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/,
            message: "请输入正确的经纬度",
            trigger: "blur",
          },
        ],
        date: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    //表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 当存在 el-date-picker && （ type="daterange"||type="datetimerange"）时，将变量定义为daterange
      if (this.daterange) {
        this.daterange = null;
      }
      this.dataForm = {};
    },
    //设备查询
    search(dataForm) {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;

        if (
          dataForm.imei ||
          dataForm.mac ||
          dataForm.phone ||
          dataForm.imsi ||
          dataForm.oaid ||
          dataForm.idfa
        ) {
          // console.log(row)
          this.$router.push({ name: "equipment", query: dataForm });
        } else {
          this.$message({
            type: "warning",
            message: "请至少填入一项数据",
          });
          return;
        }
      });
    },
    // 热点查询
    wifiSearch(wifiData) {
      this.$refs.wifiForm.validate((valid) => {
        if (!valid) return;

        if (this.wifiData.date) {
          this.wifiData.start = this.wifiData.date[0] / 1000;
          this.wifiData.end = this.wifiData.date[1] / 1000;
        } else {
          this.wifiData.start = "";
          this.wifiData.end = "";
        }
        let dataForm = {
          mac: wifiData.mac,
          start: wifiData.start,
          end: wifiData.end,
          // page:0
        };
        this.$router.push({ name: "wifi-index", query: dataForm });
      });
    },
    // 基站查询
    baseSearch(baseData) {
      this.$refs.baseForm.validate((valid) => {
        if (!valid) return;

        if (this.baseData.date) {
          this.baseData.start = this.baseData.date[0] / 1000;
          this.baseData.end = this.baseData.date[1] / 1000;
        } else {
          this.baseData.start = "";
          this.baseData.end = "";
        }
        let dataForm = {
          cellId: baseData.cellId,
          start: baseData.start,
          end: baseData.end,
          // page:0
        };
        this.$router.push({ name: "base-station", query: dataForm });
      });
    },
    // IP查询
    ipSearch(ipData) {
      this.$refs.ipForm.validate((valid) => {
        if (!valid) return;

        if (this.ipData.date) {
          this.ipData.start = this.ipData.date[0] / 1000;
          this.ipData.end = this.ipData.date[1] / 1000;
        } else {
          this.ipData.start = "";
          this.ipData.end = "";
        }
        let dataForm = {
          ip: ipData.ip,
          start: ipData.start,
          end: ipData.end,
          // page:0
        };
        this.$router.push({ name: "IP-index", query: dataForm });
      });
    },
    // app查询
    appSearch(appData) {
      this.$refs.appForm.validate((valid) => {
        if (!valid) return;

        if (appData.packages || appData.name) {
          // console.log(row)
          let dataForm = {
            packages: appData.packages,
            name: appData.name,
            // page:0
          };
          this.$router.push({ name: "index", query: dataForm });
        } else {
          this.$message({
            type: "warning",
            message: "请至少填入一项数据",
          });
          return;
        }
      });
    },
    // GPS查询
    gpsSearch(gpsData) {
      this.$refs.gpsForm.validate((valid) => {
        if (!valid) return;

        if (this.gpsData.date) {
          this.gpsData.start = this.gpsData.date[0] / 1000;
          this.gpsData.end = this.gpsData.date[1] / 1000;
        } else {
          this.gpsData.start = "";
          this.gpsData.end = "";
        }
        let dataForm = {
          lon: gpsData.lon,
          lat: gpsData.lat,
          start: gpsData.start,
          end: gpsData.end,
          // page:0
        };
        this.$router.push({ name: "gps-index-info", query: dataForm });
      });
    },
  },
};
</script>
<style lang="scss" >
body {
  min-width: 1200px;
  .home_search {
    width: 100%;
    min-height: calc(100vh - 142px + 38px);
    background: #2a3f54;
    padding-top: 140px;
    .search_center {
      width: 50%;
      height: 500px;
      margin: 0 auto;
      background: #fff;
      border-radius: 15px;
      .el-tabs {
        .el-tabs__header {
          top: 0 !important;
          box-shadow: none !important;
          margin-bottom: 0 !important;
          background: none !important;
          .el-tabs__nav-wrap {
            &::after {
              display: none;
            }
            .el-tabs__nav-scroll {
              .el-tabs__nav {
                left: 50% !important;
                transform: translateX(-50%) !important;
                margin: 50px 0 10px;
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
            }
          }
        }
        .el-tabs__content {
          .el-tab-pane {
            text-align: center;
            .center {
              display: inline-block;
              background: #fff;
              margin-top: 30px;
              .tit {
                margin-bottom: 55px;
                font-size: 16px;
                color: #333;
              }
              .el-image__error,
              .el-image__inner,
              .el-image__placeholder {
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 100%;
              }
              .el-date-editor--daterange.el-input,
              .el-date-editor--daterange.el-input__inner,
              .el-date-editor--timerange.el-input,
              .el-date-editor--timerange.el-input__inner {
                height: 33px;
                width: 300px;
              }
              .el-date-editor .el-range__icon {
                line-height: 22px;
              }
              .el-date-editor .el-range-separator {
                line-height: 22px;
              }
              .el-form {
                > .el-form-item {
                  margin-bottom: 18px;
                  .el-form-item__label {
                    text-align: left;
                    color: #333;
                    // width: 130px !important;
                    min-width: auto;
                  }
                  .el-input {
                    .el-input__inner {
                      width: 300px;
                      border: 1px solid #aaa;
                      height: 30px;
                      line-height: 30px;
                    }
                  }
                  > .el-form-item__content {
                    // margin-left: 130px !important;
                    text-align: left;
                    .el-date-editor {
                      border: 1px solid #aaa !important;
                    }
                    .el-button {
                      border: 1px solid #aaa;
                    }
                    .el-button--warning {
                      border: 1px solid #e6a23c;
                    }
                    .search {
                      background: #2a3f54;
                      border: 1px solid #2a3f54;
                      color: #fff;
                    }
                  }
                }
                .btn {
                  .el-form-item__content {
                    text-align: left;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>