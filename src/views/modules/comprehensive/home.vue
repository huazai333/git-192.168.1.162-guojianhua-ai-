<template>
  <div class="all_search">
    <div class="search_center">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息查询" name="first">
          <div class="center">
            <div class="tit">*(基本信息查询)</div>
            <el-form
              ref="dataForm"
              :model="dataForm"
              :rules="dataRules"
              label-width="80px"
            >
              <el-form-item label="设备序列号(IMEI)">
                <el-form-item prop="imei">
                  <el-input v-model="dataForm.imei" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="MAC:">
                <el-form-item prop="mac">
                  <el-input v-model="dataForm.mac" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="手机号码(PHONE)">
                <el-form-item prop="phone">
                  <el-input v-model="dataForm.phone" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="设备识别码(IMSI)">
                <el-form-item prop="imsi">
                  <el-input v-model="dataForm.imsi" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="OAID">
                <el-form-item prop="oaid">
                  <el-input v-model="dataForm.oaid" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="时间:" prop="date">
                <el-date-picker
                  v-model="dataForm.date"
                  type="datetimerange"
                  range-separator="至"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item class="btn"
                ><el-button type="warning" @click="resetForm('dataForm')"
                  >重置</el-button
                >
                <el-button @click="search(dataForm)" class="search"
                  >查询</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="WIFI查询" name="second">
          <div class="center">
            <div class="tit">*(WIFI查询)</div>
            <el-form
              ref="wifiForm"
              :model="wifiData"
              :rules="wifiRules"
              label-width="80px"
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
                  type="datetimerange"
                  range-separator="至"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                ><el-button type="warning" @click="resetForm('wifiForm')"
                  >重置</el-button
                >
                <el-button @click="wifiSearch(wifiData)" class="search"
                  >查询</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="IP查询" name="three">
          <div class="center">
            <div class="tit">*(IP查询:IP查询)</div>
            <el-form
              ref="ipForm"
              :model="ipData"
              label-width="80px"
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
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                ><el-button type="warning" @click="resetForm('ipForm')"
                  >重置</el-button
                >
                <el-button @click="ipSearch(ipData)" class="search"
                  >查询</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="应用查询" name="four">
          <div class="center">
            <div class="tit">*(应用查询:应用查询)</div>
            <el-form
              ref="appForm"
              :model="appData"
              label-width="80px"
              label-position="left"
              :rules="appRules"
            >
              <el-form-item label="包名:" prop="name">
                <el-input
                  v-model="appData.name"
                  placeholder=""
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item
                ><el-button type="warning" @click="resetForm('appForm')"
                  >重置</el-button
                >
                <el-button @click="appSearch(appData)" class="search"
                  >查询</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="经纬度查询" name="five">
          <div class="center">
            <div class="tit">*(经纬度查询:经纬度查询)</div>
            <el-form
              ref="gpsForm"
              :model="gpsData"
              label-width="80px"
              label-position="left"
              :rules="gpsRules"
            >
              <el-form-item label="经度:" prop="lng">
                <el-input v-model="gpsData.lng" clearable></el-input>
              </el-form-item>
              <el-form-item label="纬度:" prop="lat">
                <el-input v-model="gpsData.lat" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-form-item
                  ><el-button type="warning" @click="resetForm('gpsForm')"
                    >重置</el-button
                  >
                  <el-button @click="gpsSearch(gpsData)" class="search"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="基站查询" name="six">
          <div class="center">
            <div class="tit">*(基站查询:基站查询)</div>
            <el-form ref="ruleForm" :model="dataForm" label-width="100px">
              <el-form-item label="运营商 MCC:">
                <el-form-item prop="name">
                  <el-input v-model="dataForm.name" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="国家码 MNC:">
                <el-form-item prop="name">
                  <el-input v-model="dataForm.name" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="⼤区号 LAC:">
                <el-form-item prop="name">
                  <el-input v-model="dataForm.name" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="⼩区号 CI:">
                <el-form-item prop="name">
                  <el-input v-model="dataForm.name" clearable></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="时间:" prop="date">
                <el-date-picker
                  v-model="date"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button @click="search">查询</el-button>
                <el-button type="warning" @click="resetForm('ruleForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>
<script>
    import Base64 from 'base-64'
export default {
  data() {
    return {
      activeName: "first",
      //基本信息查询
      dataForm: {
        imei: "",
        mac: "",
        phone: "18520882984",
        imsi: "",
        oaid: "",
        date: [new Date(2020, 8, 1), new Date(2020, 9, 30)],
      },
      //热点查询
      wifiData: {
        date: ['2022-02-13 00:00:00','2022-02-14 00:00:00'],
        mac: "58:41:20:E7:32:C8",
        start: "",
        end: "",
      },
      //IP查询
      ipData: {
        date: ['2021-03-10 00:00:00','2021-03-14 00:00:00'],
        ip: "113.77.173.112",
        start: "",
        end: "",
      },
      //APP查询
      appData: {
        name: "微信",
      },
      //GPS查询
      gpsData: {
        lng: "114.024453",
        lat: "22.724430",
      },
      dataRules: {
        date: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      wifiRules: {
          mac: [{ required: true, message: "请输入", trigger: "blur" }],
        date: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      ipRules: {
          ip: [{ required: true, message: "请输入", trigger: "blur" }],
        date: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      appRules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      gpsRules: {
        lng: [{ required: true, message: "请输入", trigger: "blur" }],
        lat: [{ required: true, message: "请输入", trigger: "blur" }],
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
      this.$refs.dataForm.validate((valid) => {
        if (!valid) return;
        if (
          dataForm.imei ||
          dataForm.mac ||
          dataForm.phone ||
          dataForm.imsi ||
          dataForm.oaid
        ) {
          // console.log(row)
          var dsd = [
            {
              type: 1,
              key: dataForm.imei,
            },
            {
              type: 2,
              key: dataForm.mac,
            },
            {
              type: 3,
              key: dataForm.phone,
            },
            {
              type: 4,
              key: dataForm.imsi,
            },
            {
              type: 5,
              key: dataForm.oaid,
            },
          ];

          var params = {
            device: dsd,
            start: dataForm.date[0],
            end: dataForm.date[1],
          };
            let paramsStr = JSON.stringify(params);
            let paramsBase64 =  Base64.encode(paramsStr)
          this.$router.push({ name: "device-list", query: {params:paramsBase64} });
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
          this.wifiData.start = this.wifiData.date[0];
          this.wifiData.end = this.wifiData.date[1];
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
        this.$router.push({ name: "wifi-Information", query: dataForm });
      });
    },
    // IP查询
    ipSearch(ipData) {
      this.$refs.ipForm.validate((valid) => {
        if (!valid) return;

        if (this.ipData.date) {
          this.ipData.start = this.ipData.date[0];
          this.ipData.end = this.ipData.date[1];
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
        this.$router.push({ name: "ip-Information", query: dataForm });
      });
    },
    // app查询
    appSearch(appData) {
      if (appData.name) {
        // console.log(row)
        let dataForm = {
          name: appData.name,
        };
        this.$router.push({ name: "application-Information", query: dataForm });
      } else {
        this.$message({
          type: "warning",
          message: "请至少填入一项数据",
        });
        return;
      }
    },
    // GPS查询
    gpsSearch(gpsData) {
      this.$refs.gpsForm.validate((valid) => {
        if (!valid) return;

        let dataForm = {
          lng: gpsData.lng,
          lat: gpsData.lat,
        };
        this.$router.push({ name: "geo-Information", query: dataForm });
      });
    },
  },
};
</script>
<style lang="scss">
body {
  .all_search {
    width: 100%;
    min-height: calc(100vh - 142px + 38px);
    background: #2a3f54;
    padding-top: 100px;
    .search_center {
      width: 60%;
      height: 650px;
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
              .tit {
                margin-bottom: 20px;
                font-size: 16px;
                color: #333;
              }
              .el-form {
                > .el-form-item {
                  .el-form-item__label {
                    text-align: left;
                    color: #333;
                    width: 130px !important;
                  }
                  .el-input {
                    .el-input__inner {
                      width: 400px;
                      border: 1px solid #aaa;
                    }
                  }
                  > .el-form-item__content {
                    margin-left: 130px !important;
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
                    text-align: right;
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
