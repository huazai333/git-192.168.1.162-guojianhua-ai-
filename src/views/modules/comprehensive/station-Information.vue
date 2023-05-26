<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
      <el-form-item label="运营商 MCC" prop="name">
        <el-input
          v-model="dataForm.yys"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="国家码 MNC" prop="name">
        <el-input
          v-model="dataForm.gjm"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="⼤区号 LAC" prop="name">
        <el-input
          v-model="dataForm.dqh"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="⼩区号 CI" prop="name">
        <el-input
          v-model="dataForm.xqh"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="选择时间" prop="date">
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

      <el-form-item>
        <el-button @click="search">查询</el-button>
        <el-button type="warning" @click="resetForm('ruleForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%">
      <el-table-column label="基站信息">
        <el-table-column
          prop="baseStationId"
          width="200"
          label="基站ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="coordinate"
          label="基站经纬度"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="country" label="国家" align="center">
        </el-table-column>
        <el-table-column prop="province" label="省份" align="center">
        </el-table-column>
        <el-table-column prop="city" label="城市" align="center">
        </el-table-column>

        <el-table-column prop="district" label="地区" align="center">
        </el-table-column>
        <el-table-column prop="town" label="镇" align="center">
        </el-table-column>
        <el-table-column
          prop="village"
          label="村"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column prop="road" label="路" align="center">
        </el-table-column>
        <el-table-column
          prop="poi"
          label="poi"
          show-overflow-tooltip
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="poiType" label="poiType" align="center">
        </el-table-column>
        <el-table-column prop="operatorName" label="运营商名称" align="center">
        </el-table-column>
      </el-table-column>
    </el-table>

    <el-table :data="deviceList" style="width: 100%">
      <el-table-column label="基站下设备">
        <el-table-column prop="imei" label="imei" align="center">
        </el-table-column>
        <el-table-column
          prop="latestCoordinate"
          label="最后坐标"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="latestConnectTime"
          label="最后连接时间"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="connectTimes" label="连接次数" align="center">
        </el-table-column>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
import { Message } from "element-ui";
export default {
  mixinViewModuleOptions: {
    createdIsNeed: false, // 此页面是否在创建时，调用查询数据列表接口？
    activatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
  },
  components: {},
  data() {
    return {
      dataForm: {
        yys: "460",
        gjm: "0",
        dqh: "3581",
        xqh: "203",
        kssj: "",
        jssj: "",
        date: [],
      },
      data: [],
      deviceList: [],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 当存在 el-date-picker && （ type="daterange"||type="datetimerange"）时，将变量定义为daterange
      if (this.daterange) {
        this.daterange = null;
      }
      this.dataForm = {};
    },
    search() {
      this.getDeviceInfo();
    },
    getDeviceInfo() {
      this.$http({
        url:
          "/kepler/v2/station?mobileCountryCode=" +
          this.dataForm.yys +
          "&mobileNetworkCode=" +
          this.dataForm.gjm +
          "&locationAreaCode=" +
          this.dataForm.dqh +
          "&cellId=" +
          this.dataForm.xqh +
          "&startTime=" +
          this.dataForm.date[0] +
          "&endTime=" +
          this.dataForm.date[1],
        method: "get",
      }).then(({ data: res }) => {
        if (res.code !== 0) {
          //   return;
          Message.warning(res.msg);
        }
        //console.log(JSON.parse(res.data).deviceFeatureInfo);
        this.data.push(JSON.parse(res.data));
        console.log(this.data);
        this.deviceList = JSON.parse(res.data).deviceList;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-table {
  .student-img {
    vertical-align: top;
    width: 53px;
    height: 70px;
  }
}
</style>
