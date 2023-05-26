<template >
  <div class="detail_page">
    <div class="center">
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-question"></i>
          <span>敏感人群</span>
        </div>
        <el-table :data="alertDeviceList" style="width: 100%">
            <el-table-column show-overflow-tooltip align="center" prop="devKey" label="Key">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="devicePhone" label="手机号">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="deviceMac" label="Mac">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="deviceImsi" label="Imsi">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="deviceImei" label="Imei">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="alertType" label="预警类型" :formatter="typechange">
            </el-table-column>
        </el-table>
      </div>
      <div class="item1 item">
        <div class="tit">
          <i class="el-icon-warning"></i>
          <span>重点人群</span>
        </div>
        <el-table :data="keyDeviceList" style="width: 100%">
            <el-table-column show-overflow-tooltip align="center" prop="devId" label="Id">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="devicePhone" label="手机号">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="deviceMac" label="Mac">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="deviceImsi" label="Imsi">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="deviceImei" label="Imei">
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" prop="alertType" label="预警类型" :formatter="typechange">
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {},
  data() {
    return {
        wifiMac: "",
        alertDeviceList: [],
        keyDeviceList: [],
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
    // 获取详情信息
    getInfo(item) {
      this.wifiMac = item.wifiMac;
      this.$http({
        url: "/system/ssidwarning/selDev?wifiMac=" + this.wifiMac,
        method: "get",
      }).then(({ data: res }) => {
        this.alertDeviceList = res.data.alertDeviceList
        this.keyDeviceList = res.data.keyDeviceList
      });
    },
    typechange: function (row) {
        let date = row.alertType;
        date = date.split(',')
        const newDate = date.map(function(item){
            if(item === "1"){
                item = '涉政'
                return item
            }
            else if(item === "2"){
                item = '涉恐'
                return item
            }
            else if(item === "3"){
                item = '涉毒'
                return item
            }
            else if(item === "4"){
                item = '宗教'
                return item
            }
            else if(item === "5"){
                item = '涉黄'
                return item
            }
            else if(item === "6"){
                item = '涉赌'
                return item
            }
            else if(item === "7"){
                item = '涉诈'
                return item
            }
        })
        date = newDate.toString()
        return date
    },
  },
}; 
</script>
<style lang="scss" scoped>
.detail_page {
  background: #fff;
  padding: 40px;
  .center {
    width: 100%;
    margin: 0 auto;
    .title {
      text-align: center;
      h1 {
        font-size: 30px;
        font-weight: bold;
        margin-top: 20px;
      }
    }
    .item {
      .tit {
        border-bottom: 2px solid #333;
        margin-top: 40px;
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        margin-bottom: 30px;
        i {
          color: #333;
          font-size: 30px;
        }
        span {
          font-size: 20px;
          font-weight: bold;
          line-height: 1;
        }
      }
      .list {
        padding: 0 30px;
      }
    }
    .item1 {
      .list {
        .grid-content {
          font-size: 16px;
          line-height: 30px;
          span {
            color: #333;
            font-weight: bold;
          }
          i {
            color: #666;
          }
        }
      }
    }
  }
}
.allecharts {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .echarts {
    width: 50%;
    height: 300px;
  }
}
</style>
