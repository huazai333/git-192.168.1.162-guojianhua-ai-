<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
      <el-form-item label="MAC：" prop="mac">
        <el-input
          v-model="dataForm.mac"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="IMEI：" prop="imei">
        <el-input
          v-model="dataForm.imei"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="IMSI：" prop="imsi">
        <el-input
          v-model="dataForm.imsi"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">查询</el-button>
        <el-button type="warning" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="dataList">
      <el-table-column
        prop="devicePhone"
        label="手机号码"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="devKey"
        label="KEY"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="devImei"
        label="IMEI"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="devImsi"
        label="IMSI"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="devMac"
        label="MAC"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="score"
        label="阈值"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
<!--      <el-table-column
        prop="type"
        label="类型"
        show-overflow-tooltip
        align="center"
        :formatter="typechange"
      >
      </el-table-column>-->
      <el-table-column
        prop="date"
        label="预警时间"
        show-overflow-tooltip
        align="center"
      ></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="viewHandle(scope.row)">
              详情
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[6, 10, 20, 50, 100, 500]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"
    >
    </el-pagination>

    <el-dialog title="详情" :visible.sync="dialogTableVisible" width="85%">
      <el-table :data="devList" style="width: 100%">
        <el-table-column label="重点设备" align="center">
          <el-table-column
            prop="devPhone"
            label="手机号"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="devImei"
            label="IMEI"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="devImsi"
            label="IMSI"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="devMac"
            label="MAC"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="commonWifiNum"
            label="连接次数"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="devType"
            label="类型"
            show-overflow-tooltip
            align="center"
            :formatter="typechange1"
          >
          </el-table-column>
        </el-table-column>
      </el-table>

      <el-table :data="appList" style="width: 100%; margin-top: 10px">
        <el-table-column label="重点APP" align="center">
        <el-table-column
            prop="appId"
            label="APP ID"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="appName"
            label="APP名称"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="appPackage"
            label="APP包名"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="appType"
            label="类型"
            show-overflow-tooltip
            align="center"
            :formatter="typechange2"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="wifiList" style="width: 100%; margin-top: 10px">
        <el-table-column label="重点热点" align="center">
            <el-table-column
            prop="wifiId"
            label="WIFI ID"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="wifiName"
            label="WIFI名称"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="wifiMac"
            label="WIFI MAC"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="connectFrequency"
            label="次数"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="wifiType"
            label="类型"
            show-overflow-tooltip
            align="center"
            :formatter="typechange3"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";

import { getDictLabel } from "@/utils";
export default {
  mixinViewModuleOptions: {
    createdIsNeed: true, // 此页面是否在创建时，调用查询数据列表接口？
    activatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
  },
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: "/system/keydevicewarning",
        getDataListIsPage: true,
        activatedIsNeed: false,
      },
      limit: 6,
      dataForm: {
        mac: "",
        imei: "",
        imsi: "",
        type: "6",
      },
      dataList: [],
      dialogTableVisible: false,
      devList: [],
      appList: [],
      wifiList: [],
    };
  },
  computed: {},
  methods: {
    // 字符串多个类型返回值
    typechange: function (row) {
      let date = row.type;
      date = date.split(",");
      const newDate = date.map(function (item) {
        if (item === "1") {
          item = "涉政";
          return item;
        } else if (item === "2") {
          item = "涉恐";
          return item;
        } else if (item === "3") {
          item = "涉毒";
          return item;
        } else if (item === "4") {
          item = "宗教";
          return item;
        } else if (item === "5") {
          item = "涉黄";
          return item;
        } else if (item === "6") {
          item = "涉赌";
          return item;
        } else if (item === "7") {
          item = "涉诈";
          return item;
        }
      });
      date = newDate.toString();
      return date;
    },
    typechange1: function (row) {
      let date = row.devType;
      date = date.split(",");
      const newDate = date.map(function (item) {
        if (item === "1") {
          item = "涉政";
          return item;
        } else if (item === "2") {
          item = "涉恐";
          return item;
        } else if (item === "3") {
          item = "涉毒";
          return item;
        } else if (item === "4") {
          item = "宗教";
          return item;
        } else if (item === "5") {
          item = "涉黄";
          return item;
        } else if (item === "6") {
          item = "涉赌";
          return item;
        } else if (item === "7") {
          item = "涉诈";
          return item;
        }
      });
      date = newDate.toString();
      return date;
    },
    typechange2: function (row) {
      let date = row.appType;
      date = date.split(",");
      const newDate = date.map(function (item) {
        if (item === "1") {
          item = "涉政";
          return item;
        } else if (item === "2") {
          item = "涉恐";
          return item;
        } else if (item === "3") {
          item = "涉毒";
          return item;
        } else if (item === "4") {
          item = "宗教";
          return item;
        } else if (item === "5") {
          item = "涉黄";
          return item;
        } else if (item === "6") {
          item = "涉赌";
          return item;
        } else if (item === "7") {
          item = "涉诈";
          return item;
        }
      });
      date = newDate.toString();
      return date;
    },
    typechange3: function (row) {
      let date = row.wifiType;
      date = date.split(",");
      const newDate = date.map(function (item) {
        if (item === "1") {
          item = "涉政";
          return item;
        } else if (item === "2") {
          item = "涉恐";
          return item;
        } else if (item === "3") {
          item = "涉毒";
          return item;
        } else if (item === "4") {
          item = "宗教";
          return item;
        } else if (item === "5") {
          item = "涉黄";
          return item;
        } else if (item === "6") {
          item = "涉赌";
          return item;
        } else if (item === "7") {
          item = "涉诈";
          return item;
        }
      });
      date = newDate.toString();
      return date;
    },
    search() {
      this.page = 1;
      this.dataForm.type = 6
      this.query();
    },
    resetQuery() {
      this.page = 1;
      this.dataForm = {
        type: 6
      };
      this.query();
    },
    viewHandle(row) {
      this.dialogTableVisible = true;
      this.$http({
        url: "/system/keydevicewarning/sel?devKey=" + row.devKey ,
        method: "get",
      }).then(({ data: res }) => {
        this.devList = res.data.devList;
        this.appList = res.data.appList;
        this.wifiList = res.data.wifiList;
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
